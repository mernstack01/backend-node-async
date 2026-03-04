const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fullName majburiy"],
    minlength: [3, "fullName kamida 3 ta belgidan iborat bo'lishi kerak"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email majburiy"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "email formati noto'g'ri"],
  },
  age: {
    type: Number,
    min: [6, "age 6 dan kichik bo'lmasligi kerak"],
  },
  role: {
    type: String,
    default: "student",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
