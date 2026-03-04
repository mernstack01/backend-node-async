const express = require("express");
const {
  createCategory,
  getCategories,
  getProductsByCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id/products", getProductsByCategory);

module.exports = router;
