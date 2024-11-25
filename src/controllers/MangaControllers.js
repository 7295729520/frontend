const MangaModel = require("../models/MangaModel");

class MangaControllers {

    constructor() {
        Object.preventExtensions(this);
    }

    // Obtener todos los mangas
    fetchMangas = async (req, resp) => {
        try {
            let data = await MangaModel.fetchMangasAll();
            resp.status(200).json(data);
        } catch (error) {
            resp.status(500).json({ message: 'Error al obtener los mangas', error: error.message });
        }
    }

    // Crear un nuevo manga
    createManga = async (req, resp) => {
        try {
            let record = await MangaModel.createManga(req.body);
            resp.status(201).json(record);
        } catch (error) {
            resp.status(500).json({ message: 'Error al crear el manga', error: error.message });
        }
    }

    // Actualizar un manga
    updateManga = async (req, resp) => {
        try {
            let record = await MangaModel.updateManga(req.params.id_manga, req.body);
            if (record) {
                resp.status(200).json({ message: 'Manga actualizado', record });
            } else {
                resp.status(404).json({ message: 'Manga no encontrado' });
            }
        } catch (error) {
            resp.status(500).json({ message: 'Error al actualizar el manga', error: error.message });
        }
    }

    // Eliminar un manga
    deleteManga = async (req, resp) => {
        try {
            const deletedCount = await MangaModel.deleteManga(req.params.id_manga);
            resp.status(200).json({
                message: `Manga con ID ${req.params.id_manga} se eliminó`,
                deletedCount
            });
        } catch (error) {
            resp.status(500).json({ message: 'Error al eliminar el manga', error: error.message });
        }
    }
}

module.exports = MangaControllers;
