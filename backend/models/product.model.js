const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    vendor: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Product", productsSchema);

module.exports = Products;
