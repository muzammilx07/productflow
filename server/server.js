require("dotenv").config(); // Load env first
const express = require("express");
const cors = require("cors");

const { admin } = require("./middleware/firebaseAuth"); 
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
