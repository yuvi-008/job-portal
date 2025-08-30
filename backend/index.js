import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();

const _dirname = path.resolve();


// ✅ Apply CORS BEFORE anything else


// ✅ Then cookie parser and body parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin:'http://localhost:5173',
  credentials:true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;



// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
