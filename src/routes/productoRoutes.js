const { Router } = require("express");

// importo el controlador para producto
const productoController = require("../controllers/productoController");

// creo la instancia de Router
const router = Router();

// mis endpoints
router.get("/", productoController.getAllProductos);
router.get("/:productoId", productoController.getOneProducto);
router.post("/", productoController.createNewProducto);
router.put("/:productoId", productoController.updateOneProducto);
router.delete("/:productoId", productoController.deleteOneProducto);

module.exports = router;
