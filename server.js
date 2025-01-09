const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
require("dotenv").config()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to db successfully")
  })
  .catch((err) => {
    console.log(err)
  })
app.use("/api", authRoutes)
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
