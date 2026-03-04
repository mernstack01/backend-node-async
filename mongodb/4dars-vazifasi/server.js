const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./src/utils/connectDb");
const categoryRoutes = require("./src/routes/category.routes");
const productRoutes = require("./src/routes/product.routes");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server ishlayapti" });
});

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint topilmadi" });
});

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({
      message: `${duplicateField} qiymati unikal bo'lishi kerak`,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((item) => item.message);
    return res.status(400).json({ message: "Validation xatoligi", errors });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Server xatoligi",
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await connectDb(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.error("Serverni ishga tushirishda xatolik:", error.message);
    process.exit(1);
  }
};

startServer();
