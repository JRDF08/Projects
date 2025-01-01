import cloudinary from "../utils/cloudinaryUpload.js";
import Upload from "../models/uploadModel.js";
import { toTitleCase } from "../utils/validation.js";

const UploadCardController = {
  upload: async (req, res) => {
    try {
      const {
        cardName,
        cardClass,
        cardSeries,
        cardLife,
        cardCost,
        cardAttribute,
        cardPower,
        cardCounter,
        cardColor,
        cardType,
        cardEffect,
        cardSet,
      } = req.body;

      const formattedCardName = toTitleCase(cardName);

      const existingCardName = await Upload.findOne({
        cardName: formattedCardName,
      });
      if (existingCardName) {
        return res
          .status(400)
          .send({ message: "Card with this name already exists!" });
      }

      const cardUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "Card Collection",
        resource_type: "image",
      });

      const newUpload = new Upload({
        cardName: formattedCardName,
        cardClass,
        cardSeries,
        cardLife,
        cardCost,
        cardAttribute,
        cardPower,
        cardCounter,
        cardColor,
        cardType,
        cardEffect,
        cardSet,
        imageId: cardUpload.public_id,
        imageUrl: cardUpload.url,
      });

      await newUpload.save();

      res.send({
        message: "Upload Successful.",
        image: cardUpload,
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Failed to upload file", details: error.message });
    }
  },
};

export default UploadCardController;
