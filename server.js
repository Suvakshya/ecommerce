const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "welcom 3) 4:40",
  });
});

app.listen(PORT, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE}  mode at port ${PORT}`.bgCyan
      .white
  );
});
