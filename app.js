const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const bookingRoutes = require("./src/routes/booking.routes");
const userRoutes = require("./src/routes/user.routes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://booking-system-frontend-rust.vercel.app/login",
    ],
  }),
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json({ status: "fail", data: { message: "Route not found" } });
});

module.exports = app;
