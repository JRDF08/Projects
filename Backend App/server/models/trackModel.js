import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    audioId: String,
    audioUrl: String,
    imageId: String,
    imageUrl: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Upload = mongoose.model("Track", schema);

export default Upload;
