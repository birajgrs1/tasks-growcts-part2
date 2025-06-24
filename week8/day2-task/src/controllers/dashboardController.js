import User from "../models/User.js";
import Payroll from "../models/Payroll.js";

export const renderDashboard = async (req, res) => {
  const highEarners = await User.find({ salary: { $gt: 100000 } });
  const roleCount = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);
  const lastLogins = await User.find({}, 'name lastLogin').sort({ lastLogin: -1 });

  res.render("dashboard", {
    highEarners,
    roleCount,
    lastLogins
  });
};