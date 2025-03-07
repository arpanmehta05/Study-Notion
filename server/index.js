const express = require("express");
const app = express();
require("dotenv").config();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const UserRouter = require("./routes/UserRouter");
const CourseRouter = require("./routes/CourseRouter");
const ContactRouter = require("./routes/ContactRouter");
const PaymentRouter = require("./routes/PaymentRouter");
const ProfileRouter = require("./routes/ProfileRouter");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

database.connect();
cloudinaryConnect();

app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/profile", ProfileRouter);
app.use("/api/v1/course", CourseRouter);
app.use("/api/v1/payment", PaymentRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the E-Learning API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
