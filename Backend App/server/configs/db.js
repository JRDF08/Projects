import dotEnv from "dotenv";
import mongoose from "mongoose";

dotEnv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB Connected`);
  } catch (error) {
    console.log(`Error Connecting to DB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
