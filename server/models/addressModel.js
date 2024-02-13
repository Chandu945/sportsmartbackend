const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
  pincode: String,
  locality: String,
  address: String,
  city: String,
  state: String,
  landmark: String,
  User: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;

