import express from "express";
import signale from "signale";
import { productsRouter } from "./v1/router/productsRouter.js";
import { registroRouter } from "./v1/router/registroRouter.js";
import { pedidosRouter } from "./v1/router/pedidosRouter.js";
import { fotosRouter } from "./v1/router/fotosRouter.js";
import { detalleRouter } from "./v1/router/detalleRouter.js";
import { eventoRouter } from "./v1/router/eventoRouter.js";

import cors from "./node_modules/cors/lib/index.js";

const app = express()

app.use(cors());
app.use(express.json())
app.use("/api/products",productsRouter);
app.use("/api/registro",registroRouter);
app.use("/api/pedidos",pedidosRouter);
app.use("/api/fotos",fotosRouter);
app.use("/api/detalles",detalleRouter);
app.use("/api/eventos",eventoRouter);

app.listen(3002, ()=> {
    signale.success("Server online in port 3002")
})