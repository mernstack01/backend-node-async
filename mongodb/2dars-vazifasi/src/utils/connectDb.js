const mongoose = require("mongoose");

const connectDb = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error("MONGO_URI .env faylda berilmagan");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB ga muvaffaqiyatli ulandi");
};

module.exports = connectDb;
