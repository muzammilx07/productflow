const Product = require("../models/Product");
const generatePDF = require("../utils/pdfGenerator");

exports.createProduct = async (req, res) => {
  const { name, sku, category, price, description, tags, responses } = req.body;
  try {
    const product = new Product({
      name,
      sku,
      category,
      price,
      description,
      tags,
      responses,
      submittedBy: req.user.uid,
    });
    await product.save();
    generatePDF(product); // Optional
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ submittedBy: req.user.uid });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
