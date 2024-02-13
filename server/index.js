const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/UserModel.js");
const fetchUser = require("./Middlewares/fetchUser.js");

const app = express();

//allowing cross origin resource sharing
app.use(cors());

//middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//to parse json data
app.use(express.json());
//to parse url encoded data;
app.use(express.urlencoded({ extended: true }));

// configuring environmental variables
dotenv.config();

const userRoutes = require("./Routes/User.js");
app.use("/user", userRoutes);

const cartRoutes = require("./Routes/Cart.js");
app.use("/cart", cartRoutes);

const WishRoutes = require("./Routes/Wishlist.js");
app.use("/wishlist", WishRoutes);

const productRoutes = require("./Routes/Product.js");
app.use("/product", productRoutes);

const addressRoutes = require("./Routes/Address.js")
app.use("/address" , addressRoutes)

const port = 8080;
const db_url = process.env.DATABASE_URL;

mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"));

app.listen(port, () => console.log(`Server is running on port: ${port}......`));
