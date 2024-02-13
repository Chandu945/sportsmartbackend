const express = require("express");
const router = express.Router();
const { upload, uploadToCloudinary } = require("../Middlewares/uploadimages");
const Product = require("../models/productModel");


router.post("/addProduct", upload.array("images", 6), async (req, res) => {
  try {
    let imageUrls = [];
    console.log(req.files);
    for(let i = 0 ; i < req.files.length ; i++){
        let result = await uploadToCloudinary(req.files[i].path);
        imageUrls.push(result.url)
    }
    const {
      title,
      description,
      price,
      discountPercentage,
      discountedPrice,
      brand,
      category,
    } = req.body;
    const product = new Product({
      title,
      description,
      price,
      discountPercentage,
      discountedPrice,
      brand,
      category,
      images: imageUrls,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// Get all products
router.get('/getproducts', async (req, res) => {
  try {
    const { page } = req.query;
    const itemsPerPage = 1; // Adjust as needed
    const products = await Product.find().skip(itemsPerPage * (page - 1)).limit(itemsPerPage)
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get a single product by ID
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

router.patch("/product/:id", upload.array("images", 6), async (req, res) => {
  try {
    const updates = req.body;

    // Optional: Handle image updates, similar to adding new products
    if (req.files.length) {
      let imageUrls = [];
      for (let i = 0; i < req.files.length; i++) {
        let result = await uploadToCloudinary(req.files[i].path);
        imageUrls.push(result.url);
      }
      updates.images = imageUrls;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
});


router.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({ message: "Product successfully deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});



module.exports = router;
