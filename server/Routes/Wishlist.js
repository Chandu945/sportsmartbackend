const router = require("express").Router();
const dotenv = require("dotenv");
const Wish = require("../models/WishModel");

dotenv.config();

router.post("/MoveToWishlist", async (req, res) => {
  try {
    // console.log(req.body.itemdata);
    let item = await Wish.findOne({
      $and: [{ User: req.body.User }, { Product: req.body.Product }],
    });
    if (item) {
      res
        .send({
          status: "failure",
          message: "Already Moved to the Wishlist",
        })
        .status(400);
    } else {
      user = await Wish.create({
        User: req.body.User,
        Product: req.body.Product
      });
      //console.log(user);
      res.status(201).send({
        status: "success",
        message: "Item Moved to Wishlist",
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

router.get("/getWishlist/:User", async (req, res) => {
  const { User } = req.params;
  const items = await Wish.find({ User: User }).populate("Product");
  //console.log(items);
  res.json(items);
});

router.delete("/deletewishitem/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Wish.findByIdAndDelete(id);
  //   console.log(deleted);
});

module.exports = router;
