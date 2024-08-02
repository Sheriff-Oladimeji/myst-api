const express = require("express")
const dotenv = require("dotenv")
const connectToDB = require("./db/db")
dotenv.config()


const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectToDB()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

