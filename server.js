//this file to make server Up Code on one file
const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
const Product = require("./module/ProductModule");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DATABASE;
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    dbName: "Shop",
  })
  .then(() => console.log("DB connection successful!"));
// const testProduct = new Product({
//   name: "Laptop",
//   description: "Powerful laptop for work and entertainment",
//   price: 999,
//   category: "Electronics",
//   brand: "ExampleBrand",
//   imageUrl: "https://example.com/laptop.jpg",
// });
// testProduct
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`welcome from server on port ${port}`);
});
