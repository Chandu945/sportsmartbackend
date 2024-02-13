const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  discountedPrice: Number,
  brand: String,
  category: String,
  images: [String], // URLs of images uploaded to Cloudinary
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product