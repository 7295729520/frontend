const UsuariosModel = require("../models/UsuariosModel");

class UsuariosControllers {

    constructor() {
        Object.preventExtensions(this);
    }

    // Fetch all users
    fetchUsers = async (req, resp) => {
        let data = await UsuariosModel.fetchUsersAll();
        resp.status(200).json(data);
    }

    // Create a new user
    createUsers = async (req, resp) => {
        // Lógica para crear usuarios
        let record = await UsuariosModel.createUsers(req.body);
        resp.status(200).json(record);
    }

    // Update a user
    updateUsers = async (req, resp) => {
        try {
            // Lógica para actualizar usuarios
            let record = await UsuariosModel.updateUsers(req.params.id_anime, req.body);
            if (record) {
                resp.status(200).json({ message: 'Transporte actualizado', record });
            } else {
                resp.status(404).json({ message: 'Transporte no encontrado' });
            }
        } catch (error) {
            resp.status(500).json({ message: 'Error actualizando Transporte', error: error.message });
        }
    }

    // Delete a user
    deleteUsers = async (req, resp) => {
        try {
            const deletedCount = await UsuariosModel.deleteUser(req.params.id_anime); // Cambiado a req.params.id_anime
            resp.status(200).json({
                message: `Cliente con ID ${req.params.id_anime} se eliminó`,  // Cambiado aquí también
                deletedCount
            });
        } catch (error) {
            resp.status(500).json({ message: 'Error al eliminar el cliente', error });
        }
    }
    
}

module.exports = UsuariosControllers;
