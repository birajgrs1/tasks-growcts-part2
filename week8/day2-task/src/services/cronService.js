import User from "../models/User.js";
import Payroll from "../models/Payroll.js";
import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/cron.log' })
  ]
});

export const notifyHRUnverifiedUsers = async () => {
  const unverified = await User.find({ verified: false });
  logger.info(`Unverified users: ${unverified.length}`);
};

export const logStaleUsers = async () => {
  const threshold = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  const stale = await User.find({ updatedAt: { $lt: threshold } });
  logger.info(`Stale users: ${stale.length}`);
};

export const generatePayrollReport = async () => {
  const users = await User.find({});
  for (const user of users) {
    await Payroll.create({ userId: user._id, amount: user.salary });
  }
  logger.info("Payroll report generated.");
};