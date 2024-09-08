import {db} from '../../database/mysql.js'

export const eventoService = {
    getAllProducts : async () => {
        const sql = "SELECT * FROM eventos";
        try {
            const [data] = await db.query(sql, []);
            return data;
        } catch (error) {
            return null;
        }
    },    
    
    getOneProduct : async (id) => {
        const sql = "SELECT * FROM eventos WHERE id=?";
        const params = [id];
        try {
            const [result] = await db.query(sql, params);
            return result[0];
        } catch (error) {
            console.log("E")
            return null;
        }
    },
     
    createNewProduct : async (product) => {
        const sql = "INSERT INTO eventos (ClienteID , FechaEvento, TipoEvento, EstadoEvento) VALUES (?, ?, ?, ?)";
        const params = [product.ClienteID, product.FechaEvento, product.TipoEvento, product.EstadoEvento];
        try {
            const [result] = await db.query(sql, params);
            return {ClienteID: product.ClienteID, FechaEvento: product.FechaEvento, TipoEvento: product.TipoEvento,
                 EstadoEvento: product.EstadoEvento, EventoID: result.insertId}
        } catch (error) {
            return null;
        }
    },

    updateOneProduct: async (id, updatedProduct) => {
        const sql = "UPDATE producto SET nombreproduct = ?, cantidad = ?, costo = ?, descripcion = ? WHERE id = ?";
        const params = [updatedProduct.nombreproduct, updatedProduct.cantidad, updatedProduct.costo, updatedProduct.descripcion, id];
        try {
            const [result] = await db.query(sql, params);
            return result.affectedRows > 0 ? { id, ...updatedProduct } : null;
        } catch (error) {
            return null;
        }
    },
    
    deleteOneProduct : async (id) => {
        const sql = 'DELETE FROM producto WHERE id = ?';
        const params = [id];
        try {
            const result = await db.query(sql, params);
            return result;
        } catch (error) {
            return null;
        }
    }
}