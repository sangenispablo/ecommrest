// Modelo de mongo
const modelCarrito = require("../models/carrito");
const modelProducto = require("../models/producto");
// aca creo el contenedor para Mongo de este Modelo
const carrito = require("../database/_containerMongo")(modelCarrito);
const producto = require("../database/_containerMongo")(modelProducto);

// Si quiero cambiar para Firebase usar lo siguiente comentando lo de arriba
// const carrito = require("../database/_containerFirebase")('carrito');
// const producto = require("../database/_containerFirebase")('productos');


const getAllProductosCarrito = async (carritoId) => {
  try {
    const { productos } = await carrito.findId(carritoId);
    return productos;
  } catch (error) {
    throw error;
  }
};

const addNewProductoCarrito = async (carritoId, productoId) => {
  try {
    const carritoFull = await carrito.findId(carritoId);
    const productoFull = await producto.findId(productoId);
    carritoFull.productos.push(productoFull);
    const updatedCarrito = await carrito.update(carritoId, carritoFull);
    return updatedCarrito;
  } catch (error) {
    throw error;
  }
};

const createNewCarrito = async (newCarrito) => {
  try {
    const createdCarrito = await carrito.create(newCarrito);
    return createdCarrito;
  } catch (error) {
    throw error;
  }
};

const deleteOneCarrito = async (carritoId) => {
  try {
    const deletedCarrito = await carrito.remove(carritoId);
    return deletedCarrito;
  } catch (error) {
    throw error;
  }
};

const deleteOneProductoCarrito = async (carritoId, productoId) => {
  try {
    const carritoFull = await carrito.findId(carritoId);
    const productosAll = carritoFull.productos;
    carritoFull.productos = productosAll.filter(
      (producto) => producto._id.toString() !== productoId
    );
    const updatedCarrito = await carrito.update(carritoId, carritoFull);
    return updatedCarrito;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProductosCarrito,
  addNewProductoCarrito,
  createNewCarrito,
  deleteOneCarrito,
  deleteOneProductoCarrito,
};
