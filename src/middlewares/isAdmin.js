const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ status: "fail", data: { message: "Admins only" } });
  }
  next();
};

module.exports = isAdmin;
