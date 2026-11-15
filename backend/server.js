// Split & Sip: the API (Lab 9)
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import planRoutes from "./routes/planRoutes.js";

const app = express();

// ========== MIDDLEWARE ==========
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());
// Let our React app, on another port, read our answers
app.use(cors());

// ========== ROUTES ==========
app.get("/", (req, res) => {
  res.send("Welcome to Split & Sip");
});
// Is the API up? Every project has this route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/auth", authRoutes); // Habiba
app.use("/api/groups", groupRoutes); // Hana H
app.use("/api/expenses", expenseRoutes); // Farida
app.use("/api/payments", paymentRoutes); // Hana Y
app.use("/api/goals", goalRoutes); // Sara
app.use("/api/plans", planRoutes); // Haneen

// ========== START ==========
await connectDB();
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
