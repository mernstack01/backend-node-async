import express from "express";
import uploadRoutes from "./routes/upload.routes.js";
import path from "path";

const app = express();

app.use(express.json());

// static file serve
app.use("/uploads", express.static("uploads/images"));

app.use("/api", uploadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
