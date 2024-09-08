import express from 'express'
import signale from 'signale';

import { eventoController } from '../controllers/eventoController.js';
export const eventoRouter = express.Router();

eventoRouter.get("/", eventoController.getAllProducts);
eventoRouter.get("/:id", eventoController.getOneProduct);
eventoRouter.post("/", eventoController.createNewProduct);
eventoRouter.put("/:id",eventoController.updateOneProduct);
eventoRouter.delete("/:id",eventoController.deleteOneProduct);