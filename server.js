const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const connectToDB = require("./db/db");
const Post = require("./models/Post.model");
const router = require("./routes/PostRoute");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: [
    "https://qlip.vercel.app",
    "http://localhost:8000",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use cors middleware before other middleware
app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/quotes", router);

app.get("/", (req, res) => {
  res.send("Welcome to our API");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

// Connect to database
connectToDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
