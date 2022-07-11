const { Router } = require("express");

// importo el controlador para producto
const carritoController = require("../controllers/carritoController");

// creo la instancia de Router
const router = Router();

// mis endpoints
router.get("/:carritoId/productos", carritoController.getAllProductosCarrito);
router.post("/:carritoId/productos", carritoController.addNewProductoCarrito);
router.post("/", carritoController.createNewCarrito);
router.delete("/:carritoId", carritoController.deleteOneCarrito);
router.delete("/:carritoId/productos/:productoId", carritoController.deleteOneProductoCarrito);

module.exports = router;
