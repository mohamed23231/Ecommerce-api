const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productsController");

router
  .route("/products")
  .get(productController.getAllProduct)
  .post(productController.postProduct);

router
  .route("/product/favourite")
  .get(productController.aliasTopProduct,productController.getAllProduct)
  router.route("/products-stats").get(productController.productStats);

router
  .route("/product/:productId")
  .get(productController.getOneProduct)
  .patch(productController.editeProduct)
  .delete(productController.deleteProduct);



module.exports = router;
