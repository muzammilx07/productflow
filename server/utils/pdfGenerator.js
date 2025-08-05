const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function generatePDF(product) {
  const doc = new PDFDocument();
  const outputPath = path.join(
    __dirname,
    `../generated/${product.name || "product"}.pdf`
  );

  // Ensure the directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  const { name, sku, category, price, description, tags } = product;

  doc.fontSize(14).text(`Product Details`, { underline: true });
  doc.moveDown();

  doc.fontSize(12).text(`Name: ${name}`);
  doc.text(`SKU: ${sku}`);
  doc.text(`Category: ${category}`);
  doc.text(`Price: ${price}`);
  doc.text(`Description: ${description}`);
  doc.text(`Tags: ${tags}`);

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(outputPath));
    writeStream.on("error", reject);
  });
}

module.exports = generatePDF;
