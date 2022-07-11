const productoService = require("../services/productoService");

const getAllProductos = async (req, res) => {
  try {
    const allProductos = await productoService.getAllProductos();
    res.send({ status: "OK", data: allProductos });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const getOneProducto = async (req, res) => {
  const { productoId } = req.params;
  try {
    const producto = await productoService.getOneProducto(productoId);
    res.send({ status: "OK", data: producto });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewProducto = async (req, res) => {
  const { body } = req;
  // aca deberia hacer algun tipo de validación o usar un middleware
  // una duda, si tengo que validar lo hago acá o en el service ??
  const newProducto = {
    nombre: body.nombre,
    descripcion: body.descripcion,
    codigo: body.codigo,
    foto: body.foto,
    precio: body.precio,
    stock: body.stock,
  };
  try {
    const createdProducto = await productoService.createNewProducto(
      newProducto
    );
    res.status(201).send({ status: "OK", data: createdProducto });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const updateOneProducto = async (req, res) => {
  const { productoId } = req.params;
  const { body } = req;
  try {
    const updatedProducto = await productoService.updateOneProducto(productoId, body);
    res.send({ status: "OK", data: updatedProducto });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const deleteOneProducto = async (req, res) => {
  const { productoId } = req.params;
  try {
    const deletedProducto = await productoService.deleteOneProducto(productoId);
    res.send({ status: "OK", data: deletedProducto });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllProductos,
  getOneProducto,
  createNewProducto,
  updateOneProducto,
  deleteOneProducto,
};
