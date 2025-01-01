import express from "express";
import dotEnv from "dotenv";
import connectDB from "./configs/db.js";
import userRoute from "./routes/userRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import musicRoutes from "../server/routes/musicRoutes.js";
import cors from "cors";
import helmet from "helmet";

dotEnv.config();

const PORT = process.env.PORT ?? 3000;

//db
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://p4-soundscape.onrender.com",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//routes
app.use("/SoundScape/api/auth", userRoute);
app.use("/SoundScape/api/track", uploadRoutes);
app.use("/SoundScape/api/musicplayer", musicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
