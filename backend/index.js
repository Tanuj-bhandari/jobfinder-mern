import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Add this

// Correct __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // ✅ Correct way

// Routes
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";
import otherRoute from "./routes/other.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
import cors from "cors";

// Add this in place of your existing cors middleware
app.use(cors({
  origin: "https://jobfinder-mern.onrender.com",  // ✅ Bas ye frontend ka origin hai
  credentials: true
}));


// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/admin", adminRoute); 
app.use("/api/v1/owner", otherRoute); 

// Serve Frontend (Vite)
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get(/^\/(?!api).*/, (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
