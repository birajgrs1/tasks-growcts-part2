import express from "express";
import env from "dotenv";
import cron from "node-cron";
import connectDB from "./src/config/dbConnector.js";

const app = express();
env.config();

connectDB();

app.use(express.json());
app.set("views", "./src/views");
app.set("view engine", "ejs");

function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}
// Schedule the cron job to run every minute
cron.schedule("* * * * *", () => {
  logMessage();
});

app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
