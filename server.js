const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./src/models/User");
const bcrypt = require("bcryptjs");

const createDefaultAdmin = async () => {
  const exists = await User.findOne({ role: "admin" });
  if (!exists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Default admin created ✅");
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await createDefaultAdmin();
  console.log(`Server running on port ${PORT} ✅`);
});
