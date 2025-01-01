import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    cardName: { type: String, required: true },
    cardClass: { type: String, required: true },
    cardSeries: { type: String, required: true },
    cardLife: Number,
    cardCost: Number,
    cardAttribute: { type: String, required: true },
    cardPower: Number,
    cardCounter: { type: Number, required: true },
    cardColor: { type: String, required: true },
    cardType: { type: String, required: true },
    cardEffect: { type: String, required: true },
    cardSet: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Upload = mongoose.model("Card", schema);

export default Upload;
