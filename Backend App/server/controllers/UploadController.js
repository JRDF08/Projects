import cloudinary from "../utils/cloudinary.js";
import Upload from "../models/trackModel.js";
import { toTitleCase } from "../utils/validation.js";

const UploadController = {
  upload: async (req, res) => {
    try {
      const { title, artist } = req.body;

      const formattedTitle = toTitleCase(title);
      const formattedArtist = toTitleCase(artist);

      const existingSong = await Upload.findOne({ title: formattedTitle });
      if (existingSong) {
        return res
          .status(400)
          .send({ message: "Song with this title already exists!" });
      }

      const audioUpload = await cloudinary.uploader.upload(
        req.files.track[0].path,
        {
          folder: "SoundScape-Songs",
          resource_type: "auto",
        }
      );

      const imageUpload = await cloudinary.uploader.upload(
        req.files.image[0].path,
        {
          folder: "SoundScape-Images",
          resource_type: "image",
        }
      );

      const newUpload = new Upload({
        title: formattedTitle,
        artist: formattedArtist,
        audioId: audioUpload.public_id,
        audioUrl: audioUpload.url,
        imageId: imageUpload.public_id,
        imageUrl: imageUpload.url,
      });

      await newUpload.save();

      res.send({
        message: "Upload successful",
        audio: audioUpload,
        image: imageUpload,
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Failed to upload files", details: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { title } = req.params;
      const upload = await Upload.findOne({ title });

      if (!upload) {
        return res.status(404).send({ error: "Track not found" });
      }

      await cloudinary.uploader.destroy(upload.audioId, {
        resource_type: "video",
      });
      await cloudinary.uploader.destroy(upload.imageId, {
        resource_type: "image",
      });

      await Upload.findByIdAndDelete(upload._id);

      res.send({ message: `Track "${title}" successfully deleted` });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Failed to delete track", details: error.message });
    }
  },

  softDelete: async (req, res) => {
    try {
      const { title } = req.params;
      const upload = await Upload.findOne({ title });

      if (!upload) {
        return res.status(404).send({ error: "Track not found" });
      }

      upload.isDeleted = true;
      await upload.save();

      res.send({ message: `Track "${title}" successfully soft deleted.` });
    } catch (error) {
      res.status(500).send({
        error: "Failed to soft delete track",
        details: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { title } = req.params;
      const { newTitle, newArtist } = req.body;

      const record = await Upload.findOne({ title });

      if (!record) {
        return res.status(404).send({ error: "Track not found" });
      }

      record.title = newTitle || record.title;
      record.artist = newArtist || record.artist;

      await record.save();

      res.send({
        message: `Track "${title}" successfully updated`,
        updatedSong: record,
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: "Failed to update track", details: error.message });
    }
  },
};

export default UploadController;
