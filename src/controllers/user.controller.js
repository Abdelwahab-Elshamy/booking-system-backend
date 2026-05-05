const Booking = require("../models/Booking");

const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ===== GET MY PROFILE (user) =====
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({ status: "success", data: { user } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ===== UPDATE MY PROFILE (user) =====
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password");

    res.json({ status: "success", data: { user } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ===== GET ALL USERS (admin) =====
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      data: {
        users,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalCount: total,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ===== DELETE USER (admin) =====

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ status: "fail", data: { message: "User not found" } });

    await Booking.deleteMany({ userId: req.params.id });

    res.json({
      status: "success",
      data: { message: "User and their bookings deleted" },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
