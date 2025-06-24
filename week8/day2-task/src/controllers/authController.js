import bcrypt from "bcrypt";
import User from "../models/User.js";

export const showLogin = (req, res) => res.render("login");
export const showRegister = (req, res) => res.render("register");

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash, role });
  res.redirect("/login");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("Invalid credentials");
  }
  req.session.userId = user._id;
  user.lastLogin = new Date();
  await user.save();
  res.redirect("/dashboard");
};

export const logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};

