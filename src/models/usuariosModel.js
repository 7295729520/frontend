class UsuariosModel {
    #orientDB;

    constructor() {
        Object.preventExtensions(this);
    }

    defineModel = async (orientDB) => {
        this.#orientDB = await orientDB;
    }

    // Fetch all users
    fetchUsersAll = async () => {
        let session = await this.#orientDB.pool.acquire();
        let data = await session.select().from('anime').all(); // Cambiado a 'anime'
        session.close();
        return data;
    }

    createUsers = async (object) => {
        let session = await this.#orientDB.pool.acquire();
        let idRecord = await session.create('Vertex', 'anime').set(object).one(); // Cambiado a 'anime'
        return idRecord;
    }

    // Update a user by ID
    updateUsers = async (id_anime, object) => {
        let session = await this.#orientDB.pool.acquire();
        try {
            // Realizamos la actualización del usuario con el campo id_anime
            let result = await session.update('anime') // Cambiado a 'anime'
                .set(object)
                .where({ 'id_anime': id_anime }) // Cambiado a 'id_anime'
                .return('AFTER')
                .one();

            return result;
        } catch (error) {
            throw new Error('Error actualizando el anime'); // Mensaje actualizado
        } finally {
            session.close(); // Cierra la sesión de OrientDB
        }
    };

    // Delete a user by ID
    deleteUser = async(id_anime) => {
        let session = await this.#orientDB.pool.acquire();
        let deletedCount = await session.delete('Vertex', 'anime').where({ id_anime }).one(); // Cambiado a 'anime'
        return deletedCount; 
    }
}

module.exports = new UsuariosModel();
