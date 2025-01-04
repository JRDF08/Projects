import Upload from "../models/uploadModel.js";

const CardController = {
  list: async (req, res) => {
    try {
      const { color, role, number } = req.query;
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

      const cards = await Upload.find(query);

      res.send(cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).send({ error: "Failed to fetch cards" });
    }
  },
};

export default CardController;
