const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: [true, "customer majburiy"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["paid", "pending", "canceled"],
        message: "status faqat paid | pending | canceled bo'lishi kerak",
      },
      required: [true, "status majburiy"],
    },
    total: {
      type: Number,
      required: [true, "total majburiy"],
      min: [0, "total manfiy bo'lmasligi kerak"],
    },
    itemsCount: {
      type: Number,
      required: [true, "itemsCount majburiy"],
      min: [1, "itemsCount kamida 1 bo'lishi kerak"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
