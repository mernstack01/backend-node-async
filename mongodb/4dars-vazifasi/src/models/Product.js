const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title majburiy"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price majburiy"],
      min: [0, "price manfiy bo'lmasligi kerak"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category majburiy"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
