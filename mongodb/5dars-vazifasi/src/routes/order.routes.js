const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderCountByStatus,
  getAvgTotalByStatus,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/stats/count-by-status", getOrderCountByStatus);
router.get("/stats/avg-total-by-status", getAvgTotalByStatus);

module.exports = router;
