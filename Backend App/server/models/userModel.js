import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("User", schema);

export default Model;
