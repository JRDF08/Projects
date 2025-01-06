import Upload from "../models/uploadModel.js";

const CardController = {
  list: async (req, res) => {
    try {
      const { color, role, number, set, added } = req.query;
      let query = {};

      if (color) {
        if (color === "Multicolor") {
          query.cardColor = { $regex: /.+\/.+/ };
        } else {
          query.cardColor = { $regex: new RegExp(`\\b${color}\\b`, "i") };
        }
      }

      if (role) {
        query.cardRole = role;
      }

      if (number) {
        query.cardNumber = number;
      }

      if (set) {
        query.cardSet = set;
      }

      if (added === "Yes") {
        query.cardAdded = added;
      }

      const cards = await Upload.find(query);

      res.send(cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).send({ error: "Failed to fetch cards" });
    }
  },

  updateIsAdded: async (req, res) => {
    try {
      const { cardNumber } = req.params;
      console.log("Received cardNumber:", cardNumber);

      const card = await Upload.findOne({ cardNumber });

      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (card.isAdded === "Yes") {
        return res.status(400).json({ message: "Card is already added" });
      }

      const updatedCard = await Upload.findOneAndUpdate(
        { cardNumber },
        { $set: { isAdded: "Yes" } },
        { new: true }
      );

      res.json(updatedCard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default CardController;
