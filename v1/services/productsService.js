import {db} from '../../database/mysql.js'

export const productsService = {
    getAllProducts : async () => {
        const sql = "SELECT * FROM productos";
        try {
            const [data] = await db.query(sql, []);
            return data;
        } catch (error) {
            return null;
        }
    },    
    
    getOneProduct : async (id) => {
        const sql = "SELECT * FROM productos WHERE ProductoID=?";
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
        const sql = "INSERT INTO productos (Nombre, Descripcion, Precio, CantidadEnStock, Categoria, FechaUltimaActualizacion) VALUES (?, ?, ?, ?, ?, ?)";
        const params = [product.Nombre, product.Descripcion, product.Precio, product.CantidadEnStock, product.Categoria, product.FechaUltimaActualizacion];
        try {
            const [result] = await db.query(sql, params);
            return {Nombre: product.Nombre, Descripcion: product.Descripcion, Precio: product.Precio, CantidadEnStock: product.CantidadEnStock, Categoria: product.Categoria, FechaUltimaActualizacion: product.FechaUltimaActualizacion ,ProductoID: result.insertId}
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