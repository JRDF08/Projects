import mongoose from "mongoose";

const schema = mongoose.Schema({
  token: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Model = mongoose.model("Refresh Token", schema);

export default Model;
