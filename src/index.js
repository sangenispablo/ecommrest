require("dotenv").config();

const cors = require("cors");
const express = require("express");

// Conexion a MongoDB Atlas
const { dbConnection } = require("./database/configMongo");

const ProductoRouter = require("./routes/productoRoutes");
const CarritoRouter = require("./routes/carritoRoutes");

// instancia de Express
const app = express();

// variables de entorno
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());

// mis rutas
app.use("/api/productos", ProductoRouter);
app.use("/api/carritos", CarritoRouter);

// conecto a Mongo
dbConnection();

app.listen(PORT, () => {
  console.log(`API esta escuchando el puerto: ${PORT}`);
});
