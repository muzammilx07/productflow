const { db } = require("../middleware/firebaseAuth"); 
const generatePDF = require("../utils/pdfGenerator");

exports.createProduct = async (req, res) => {
  try {
    const { name, sku, category, price, description, tags } = req.body;
    const submittedBy = req.user.uid;

    const product = {
      name,
      sku,
      category,
      price,
      description,
      tags,
      submittedBy,
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection("products").add(product);
    const savedProduct = { id: docRef.id, ...product };

    generatePDF(savedProduct); // Optional
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
