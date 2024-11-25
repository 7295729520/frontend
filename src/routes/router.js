const express = require('express');

class Router {
    #router;
    #UsuariosControllers;
    #MangaControllers;

    constructor() {
        this.#router = express.Router();
        Object.preventExtensions(this);
    }

    attachControllers = async (oUsuariosControllers, oMangaControllers) => {
        this.#UsuariosControllers = oUsuariosControllers;
        this.#MangaControllers = oMangaControllers;
    }

    prepareRouting = async () => {
        // Rutas para anime
        this.#router.get('/usuarios', this.#UsuariosControllers.fetchUsers); // Obtener todos los usuarios
        this.#router.post('/usuarios', this.#UsuariosControllers.createUsers); // Crear un nuevo usuario
        this.#router.put('/usuarios/:id_anime', this.#UsuariosControllers.updateUsers); // Actualizar un usuario existente
        this.#router.delete('/usuarios/:id_anime', this.#UsuariosControllers.deleteUsers); // Eliminar un usuario

        // Rutas para Mangas
        this.#router.get('/manga', this.#MangaControllers.fetchMangas); // Obtener todos los mangas
        this.#router.post('/manga', this.#MangaControllers.createManga); // Crear un nuevo manga
        this.#router.put('/manga/:id_manga', this.#MangaControllers.updateManga); // Actualizar un manga existente
        this.#router.delete('/manga/:id_manga', this.#MangaControllers.deleteManga); // Eliminar un manga
    }

    getRouter = () => {
        return this.#router;
    }
}

module.exports = Router;
