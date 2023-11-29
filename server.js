const express = require("express");
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path: "./config/config.env"})
const cors = require("cors");
const auth = require("./routes/auth");
const users = require("./routes/user");
const products = require("./routes/product")
const orders = require("./routes/order")
const category = require("./routes/category")
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const xxs = require("xss-clean")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const errrorHandler = require("./middleware/error");
const connectDB = require("./config/db")
const { cloudinaryConfig } = require('./config/cloudinary');

connectDB()

const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// app.use(fileUpload())
app.use(mongoSanitize())
app.use(helmet())
app.use(xxs())
app.use('*', cloudinaryConfig);

const limiter = rateLimit({
    windowMs: 5*60*1000,
    max: 1000
})
app.use(limiter)
app.use(hpp())

app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/v1/auth", auth)
app.use("/api/v1/user", users)
app.use("/api/v1/products", products)
app.use("/api/v1/order", orders)
app.use("/api/v1/category", category)

app.use(errrorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`))
