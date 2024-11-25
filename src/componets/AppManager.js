// Dependencias
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Importaciones de los archivos
const conf = require('../config/configbd.json'); // Configuración BD
const DBManager = require('./DBManager'); // Administrador de BD

// Rutas
const Router = require('../routes/router');

// Estos son mis Modelos
const UsuariosModel = require('../models/UsuariosModel');
const MangaModel = require('../models/MangaModel'); // Modelo de mangas

// Estos son mis Controladores
const UsuariosControllers = require('../controllers/UsuariosControllers');
const MangaControllers = require('../controllers/MangaControllers'); // Controlador de mangas

class AppManager {
    #appExpress;
    #runningConfType;

    constructor() {
        this.#init();
        Object.preventExtensions(this);
    }

    #init = async () => {
        this.#runningConfType = conf.DevConfig;
        this.#appExpress = express();
    }

    prepareService = async () => {
        this.#appExpress.use(cors('origin:http://localhost:4200/'));
        this.#appExpress.use(express.json());
        this.#appExpress.use(bodyParser.json());
        this.#appExpress.use(bodyParser.urlencoded({ extended: true }));
        this.#appExpress.use(morgan('dev'));
        await this.#prepareDataBase(this.#runningConfType.db);
        await this.#prepareRouting();
    }

    #prepareDataBase = async (dbConfig) => {
        const oDBMan = new DBManager();
        await oDBMan.prepareDataBase(dbConfig);

        // Definir los modelos con la conexión
        await UsuariosModel.defineModel(oDBMan.getConnection());
        await MangaModel.defineModel(oDBMan.getConnection()); // Definir el modelo de mangas
    }

    #prepareRouting = async () => {
        const oRouter = new Router();

        const oUsuariosControllers = new UsuariosControllers();
        const oMangaControllers = new MangaControllers(); // Controlador de mangas

        // Adjuntar los controladores al enrutador
        oRouter.attachControllers(oUsuariosControllers, oMangaControllers);
        oRouter.prepareRouting();
        this.#appExpress.use('/api', oRouter.getRouter());
    }

    runService = async () => {
        const thisServicePort = this.#runningConfType.service.port;
        await this.#appExpress.listen(thisServicePort, () => {
            console.log(`Ya Jalo En El Puerto : ${thisServicePort}`);
        });
    }
}

module.exports = AppManager;
