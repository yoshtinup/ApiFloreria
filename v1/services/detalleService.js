import {db} from '../../database/mysql.js'

export const detalleService = {
    getAllProducts : async () => {
        const sql = "SELECT * FROM detallespedido";
        try {
            const [data] = await db.query(sql, []);
            return data;
        } catch (error) {
            return null;
        }
    },    
    
    getOneProduct : async (id) => {
        const sql = "SELECT * FROM detallespedido WHERE id=?";
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
        const sql = "INSERT INTO detallespedido (PedidoID, ProductoID, Cantidad, PrecioUnitario) VALUES (?, ?, ?, ?)";
        
        // Reemplaza `undefined` con `null`
        const params = [
            product.PedidoID ?? null,
            product.ProductoID ?? null,
            product.Cantidad ?? null,
            product.PrecioUnitario ?? null
        ];
        
        try {
            const [result] = await db.query(sql, params);
            // `result.insertId` provides the auto-generated DetalleID
            return {
                PedidoID: product.PedidoID,
                ProductoID: product.ProductoID,
                Cantidad: product.Cantidad,
                PrecioUnitario: product.PrecioUnitario,
                DetalleID: result.insertId  // Auto-generated ID from the database
            };
        } catch (error) {
            console.error('Error creating new product detail:', error);  // Improved error logging
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