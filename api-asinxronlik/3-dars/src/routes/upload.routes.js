import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

// SINGLE
router.post("/uploads/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.files);

  res.json({
    message: "Single file uploaded",
    file: `/uploads/${req.file.filename}`,
  });
});

// MULTIPLE
router.post(
  "/uploads/multiple",
  upload.array("images", 5),
  (req, res) => {
    const files = req.files.map((f) => `/uploads/${f.filename}`);

    res.json({
      message: "Multiple files uploaded",
      files,
    });
  }
);

export default router;
