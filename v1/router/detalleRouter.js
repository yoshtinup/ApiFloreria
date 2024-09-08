import express from 'express'
import signale from 'signale';
import { detallesController } from '../controllers/detalleController.js';
export const detalleRouter = express.Router();

detalleRouter.get("/", detallesController.getAllProducts);
detalleRouter.get("/:id", detallesController.getOneProduct);
detalleRouter.post("/", detallesController.createNewProduct);
detalleRouter.put("/:id",detallesController.updateOneProduct);
detalleRouter.delete("/:id",detallesController.deleteOneProduct);