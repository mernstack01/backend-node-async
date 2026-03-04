const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID noto'g'ri formatda" });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category topilmadi" });
    }

    const products = await Product.find({ category: id })
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({ category, products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getProductsByCategory,
};
