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
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("wish", userSchema);
module.exports = Wishlist;
