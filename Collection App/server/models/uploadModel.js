import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    cardName: { type: String, required: true },
    cardRarity: { type: String, required: true },
    cardRole: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cardLife: Number,
    cardCost: Number,
    cardAttribute: String,
    cardPower: Number,
    cardCounter: Number,
    cardColor: { type: String, required: true },
    cardType: { type: String, required: true },
    cardEffect: String,
    cardSet: { type: String, required: true },
    cardImage: {
      imageId: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Upload = mongoose.model("Card", schema);

export default Upload;
