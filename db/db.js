const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
      mongoose.connection.on("connected", () => {
        console.log("Connection to db successful");
      });
      mongoose.connection.on("error", (err) => {
        console.log("Connection to db failed");
        console.log(err);
      });
}

module.exports = connectToDB