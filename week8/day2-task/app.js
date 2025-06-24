import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/dbConnector.js";
// import nodeCron from "node-cron";
import session from "express-session";
import MongoStore from 'connect-mongo'

import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { requireAuth } from "./src/middleware/auth.js";
import "./src/jobs/cronJobs.js";

// dotenv.config();
// const app = express();

// connectDB();

// app.set("view engine", "ejs");
// app.set("views", "./src/views");
// app.use(express.urlencoded({ extended: true }));
// // app.use(express.static("public"));

// app.use(dashboardRoutes);
// app.use(authRoutes);
// app.use(requireAuth);

// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//     }),
//     cookie: { secure: false }
//   })
// );

// // function logMessage() {
// //   console.log("Cron job executed at:", new Date().toLocaleString());
// // }
// // // Schedule the cron job to run every minute
// // cron.schedule("* * * * *", () => {
// //   logMessage();
// // });

// // app.get("/", (req, res) => res.send("Hello World!"));
// ... other imports

dotenv.config();
const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { secure: false },
  })
);

app.use(authRoutes);          
app.use(requireAuth);     
app.use(dashboardRoutes);   

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);


