import Upload from "../models/uploadModel.js";

const CardController = {
  list: async (req, res) => {
    try {
      const card = await Upload.find();
      res.send(card);
    } catch (error) {
      console.error("Error fetching card:", error);
      res.status(500).send({ error: "Failed to fetch card" });
    }
  },
};

export default CardController;
