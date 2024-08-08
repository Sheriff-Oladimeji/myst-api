const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const connectToDB = require("./db/db");
const Post = require("./models/Post.model");
const router = require("./routes/PostRoute");
const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(cors());

app.use("/api/v1/quotes", router);
app.get("/", (req, res) => {
  res.send("welcome to our api");
});


connectToDB();




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
