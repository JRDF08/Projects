import Upload from "../models/trackModel.js";

const MusicController = {
  list: async (req, res) => {
    try {
      const tracks = await Upload.find();
      res.send(tracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      res.status(500).send({ error: "Failed to fetch tracks" });
    }
  },

  listAll: async (req, res) => {
    try {
      const { includeDeleted } = req.query;
      const filter = includeDeleted === "true" ? {} : { isDeleted: false };

      const tracks = await Upload.find(filter);
      res.send(tracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      res.status(500).send({ error: "Failed to fetch tracks" });
    }
  },
};

export default MusicController;
