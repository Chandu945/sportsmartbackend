const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    User: {
      type: String,
      required: true,
    },
    Product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", userSchema);
module.exports = Cart;
