const Booking = require("../models/Booking");

// ===== CREATE BOOKING (user) =====
exports.createBooking = async (req, res) => {
  try {
    const { date, details } = req.body;

    const booking = await Booking.create({
      userId: req.user.id,
      date,
      details,
    });

    res.status(201).json({ status: "success", data: { booking } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ===== GET MY BOOKINGS (user) =====
exports.getMyBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Booking.countDocuments({ userId: req.user.id });
    const bookings = await Booking.find({ userId: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      data: {
        bookings,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalCount: total,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ===== GET ALL BOOKINGS (admin) =====
exports.getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Booking.countDocuments();
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      data: {
        bookings,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalCount: total,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ===== UPDATE BOOKING STATUS (admin) =====
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!booking)
      return res
        .status(404)
        .json({ status: "fail", data: { message: "Booking not found" } });

    res.json({ status: "success", data: { booking } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ===== DELETE BOOKING (admin) =====
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking)
      return res
        .status(404)
        .json({ status: "fail", data: { message: "Booking not found" } });

    res.json({ status: "success", data: { message: "Booking deleted" } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
