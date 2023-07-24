import { albumValidate } from "../Schemas/albumSchema.js";
import Album from "../Models/albumModel.js"

export const create_Album = async (req, res) => {
  try {
    const { error } = albumValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
    }
    const data = await Album.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Create Album Failed" });
    }
    console.log(data);
    return res.status(200).json({
      message: "Create Album Success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAll_Album = async (req, res) => {
  try {
    const data = await Album.find();
    if (!data) {
      return res.status(400).json({ message: "Get All Album Failed" });
    }
    return res.status(200).json({
      message: "Get All Album Success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_AlbumById = async (req, res) => {
  try {
    const data = await Album.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Get Album By Id Failed" });
    }
    return res.status(200).json({
      message: "Get Album By Id Success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const update_Album = async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!album) {
      return res.status(404).json({
        message: "Get Album By Id Failed",
      });
    }
    return res.status(200).json({
      message: "Update Album Success",
      data: album,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const delete_Album = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Album Deleted",
      album,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
