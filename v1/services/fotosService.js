import {db} from '../../database/mysql.js'

export const fotoService = {
    getAllProducts : async () => {
        const sql = "SELECT * FROM fotos";
        try {
            const [data] = await db.query(sql, []);
            return data;
        } catch (error) {
            return null;
        }
    },    
    
    getOneProduct : async (id) => {
        const sql = "SELECT * FROM fotos WHERE id=?";
        const params = [id];
        try {
            const [result] = await db.query(sql, params);
            return result[0];
        } catch (error) {
            console.log("E")
            return null;
        }
    },
     
    createNewProduct: async (product) => {
        const sql = "INSERT INTO fotos (ProductoID, URLFoto, FechaPublicacion) VALUES (?, ?, ?)";
        const params = [product.ProductoID, product.URLFoto, product.FechaPublicacion];
        
        try {
            const [result] = await db.query(sql, params);
            // `result.insertId` provides the auto-generated FotoID
            return {
                ProductoID: product.ProductoID,
                URLFoto: product.URLFoto,
                FechaPublicacion: product.FechaPublicacion,
                FotoID: result.insertId
            };
        } catch (error) {
            console.error('Error creating new product:', error);  // Improved error logging
            return null;  // Optionally, you could return an error message or code
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