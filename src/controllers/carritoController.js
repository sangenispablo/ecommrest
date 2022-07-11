const carrito = require("../models/carrito");
const carritoService = require("../services/carritoService");

const getAllProductosCarrito = async (req, res) => {
  const { carritoId } = req.params;
  try {
    const allProductos = await carritoService.getAllProductosCarrito(carritoId);
    res.send({ status: "OK", data: allProductos });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const addNewProductoCarrito = async (req, res) => {
  const { carritoId } = req.params;
  const { productoId } = req.body;
  try {
    const carritoFull = await carritoService.addNewProductoCarrito(
      carritoId,
      productoId
    );
    res.send({ status: "OK", data: carritoFull });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const createNewCarrito = async (req, res) => {
  const newCarrito = {
    timestamp: new Date().toString(),
    productos: [],
  };
  try {
    const createdCarrito = await carritoService.createNewCarrito(newCarrito);
    res.status(201).send({ status: "OK", data: createdCarrito });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const deleteOneCarrito = async (req, res) => {
  const { carritoId } = req.params;
  try {
    const deletedCarrito = await carritoService.deleteOneCarrito(carritoId);
    res.send({ status: "OK", data: deletedCarrito });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const deleteOneProductoCarrito = async (req, res) => {
  const { carritoId, productoId } = req.params;
  try {
    const carritoFull = await carritoService.deleteOneProductoCarrito(
      carritoId,
      productoId
    );
    res.send({ status: "OK", data: carritoFull });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllProductosCarrito,
  addNewProductoCarrito,
  createNewCarrito,
  deleteOneCarrito,
  deleteOneProductoCarrito,
};
