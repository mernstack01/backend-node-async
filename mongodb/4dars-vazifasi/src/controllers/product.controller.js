const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createProduct = async (req, res, next) => {
  try {
    const { title, price } = req.body;
    const categoryId = req.body.categoryId || req.body.category;

    if (!categoryId) {
      return res.status(400).json({
        message: "categoryId majburiy",
      });
    }

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ message: "categoryId noto'g'ri formatda" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category topilmadi" });
    }

    const product = await Product.create({
      title,
      price,
      category: categoryId,
    });

    const populatedProduct = await Product.findById(product._id).populate("category");
    res.status(201).json(populatedProduct);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
};
