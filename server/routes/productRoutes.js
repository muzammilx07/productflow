const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { authenticate } = require("../middleware/firebaseAuth");


// Create Product
router.post("/create", authenticate, productController.createProduct);

// Get All Products
router.get("/", productController.getProducts);

module.exports = router;
