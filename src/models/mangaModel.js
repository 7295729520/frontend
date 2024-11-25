class MangaModel {
    #orientDB;

    constructor() {
        Object.preventExtensions(this);
    }

    defineModel = async (orientDB) => {
        this.#orientDB = await orientDB;
    }

    // Obtener todos los mangas
    fetchMangasAll = async () => {
        let session = await this.#orientDB.pool.acquire();
        let data = await session.select().from('manga').all();
        session.close();
        return data;
    }

    // Crear un nuevo manga
    createManga = async (object) => {
        let session = await this.#orientDB.pool.acquire();
        let idRecord = await session.create('Vertex', 'manga').set(object).one();
        session.close();
        return idRecord;
    }

    // Actualizar un manga por ID
    updateManga = async (id_manga, object) => {
        let session = await this.#orientDB.pool.acquire();
        try {
            let result = await session.update('manga')
                .set(object)
                .where({ 'id_manga': id_manga })
                .return('AFTER')
                .one();

            return result;
        } catch (error) {
            throw new Error('Error actualizando el manga');
        } finally {
            session.close();
        }
    };

    // Eliminar un manga por ID
    deleteManga = async (id_manga) => {
        let session = await this.#orientDB.pool.acquire();
        let deletedCount = await session.delete('Vertex', 'manga').where({ id_manga }).one();
        session.close();
        return deletedCount;
    }
}

module.exports = new MangaModel();
