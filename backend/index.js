import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";
import otherRoute from "./routes/other.route.js";
import path from "path"

dotenv.config({});
const app = express();
const DIRNAME = path.resolve();


const allowedOrigins = [
  "http://localhost:5173",
  "https://jobfinder-mern.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));




const PORT = process.env.PORT || 3000;

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/admin", adminRoute); 
app.use("/api/v1/owner", otherRoute); 

// Static assets
app.use(express.static(path.join(DIRNAME, "../frontend/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "../frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
