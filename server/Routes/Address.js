const express = require("express");
const router = express.Router();
const Address = require("../models/addressModel");

// Create a new address
router.post("/createAddress", async (req, res) => {
  try {
    const Addres = await Address.create(req.body);
    res.status(201).json(Addres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all addresses
router.get("/getAddress/:User", async (req, res) => {
  try {
    const { User } = req.params;
    const addresses = await Address.find({ User: User });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an address
router.put("/update/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an address
router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Address" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
