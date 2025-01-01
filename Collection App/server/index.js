import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { connectDB } from "./configs/db.js";
import userRoute from "./routes/userRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import cardRoute from "./routes/cardRoute.js";

connectDB();
dotEnv.config();

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/user", userRoute);
app.use("/", uploadRoute);
app.use("/card", cardRoute);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
