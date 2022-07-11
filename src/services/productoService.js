// Descomentar lo que corresponda

// Modelo de mongo
const modelProducto = require("../models/producto");
// aca creo el contenedor para Mongo de este Modelo
const producto = require("../database/_containerMongo")(modelProducto);

// // Modelo de Firebase
// const producto = require("../database/_containerFirebase")("productos");

const getAllProductos = async () => {
  try {
    const allProductos = await producto.find();
    return allProductos;
  } catch (error) {
    throw error;
  }
};

const createNewProducto = async (newProducto) => {
  try {
    const createdProducto = await producto.create(newProducto);
    return createdProducto;
  } catch (error) {
    throw error;
  }
};

const getOneProducto = async (productoId) => {
  try {
    const productoOne = await producto.findId(productoId);
    return productoOne;
  } catch (error) {
    throw error;
  }
};

const updateOneProducto = async (productoId, changes) => {
  try {
    const updatedProducto = await producto.update(productoId, changes);
    return updatedProducto;
  } catch (error) {
    throw error;
  }
};

const deleteOneProducto = async (productoId) => {
  try {
    const deletedProducto = await producto.remove(productoId);
    return deletedProducto;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProductos,
  createNewProducto,
  getOneProducto,
  updateOneProducto,
  deleteOneProducto,
};
