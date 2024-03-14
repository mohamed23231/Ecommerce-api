const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productsController");

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.postProduct);

router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.editeProduct)
  .delete(productController.deleteProduct);

module.exports = router;
