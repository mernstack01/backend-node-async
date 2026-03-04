const Order = require("../models/Order");

const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderCountByStatus = async (req, res, next) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

const getAvgTotalByStatus = async (req, res, next) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          avgTotal: { $avg: "$total" },
        },
      },
      {
        $project: {
          _id: 1,
          avgTotal: { $round: ["$avgTotal", 1] },
        },
      },
      {
        $sort: { avgTotal: -1 },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderCountByStatus,
  getAvgTotalByStatus,
};
