const express = require("express");
const cors = require("cors");
require("dotenv").config();

const blogsRoutes = require("./routes/blogs");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");

const connectDB = require("./database/db");
const path = require("path");

connectDB();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/blogs", blogsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "..", "..", "frontend", "build", "index.html")
  )
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
