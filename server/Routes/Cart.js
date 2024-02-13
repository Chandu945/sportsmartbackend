const router = require("express").Router();
const dotenv = require("dotenv");
const cart = require("../models/cartModel");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/AddToCart", async (req, res) => {
  try {
    let item = await cart.findOne({
      $and: [{ User: req.body.User }, { Product: req.body.ProductId }],
    });
    if (item) {
      res
        .send({
          status: "failure",
          message: "Already added to the cart",
        })
        .status(400);
    } else {
      user = await cart.create({
        User: req.body.User,
        Product: req.body.ProductId,
      });
      res.status(201).send({
        status: "success",
        message: "Item Added to cart",
      });
    }
  } catch (error) {
    return res
      .json({
        status: "failure",
        message: error.message,
      })
      .status(500);
  }
});

router.get("/getcartitems/:User", async (req, res) => {
  const { User } = req.params;
  const items = await cart.find({ User: User }).populate("Product");
  res.json(items);
});

router.delete("/deletecartitem/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await cart.findByIdAndDelete(id);
  //   console.log(deleted);
});

router.delete("/deleteallcartitem/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await cart.deleteMany({ id: id });
  console.log(deleted);
});

router.put("/updatecartitem/add/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await cart.findById(id);
    //console.log(item);
    const UpdatedQuantity = parseInt(item.quantity) + 1;
    const updatedProduct = await cart.findByIdAndUpdate(
      id,
      { $set: { quantity: UpdatedQuantity } },
      { new: true }
    );
    // console.log(updatedProduct);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/updatecartitem/minus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await cart.findById(id);
    //console.log(item);
    if (parseInt(item.quantity) <= 1) {
      const deleted = await cart.findByIdAndDelete(id);
    } else {
      const UpdatedQuantity = parseInt(item.quantity) - 1;
      const updatedProduct = await cart.findByIdAndUpdate(
        id,
        { $set: { quantity: UpdatedQuantity } },
        { new: true }
      );
      // console.log(updatedProduct);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
