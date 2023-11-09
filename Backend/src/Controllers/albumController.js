import { albumValidate } from "../Schemas/albumSchema.js";
import Album from "../Models/albumModel.js";
import Artist from "../Models/artistModel.js";
import songModel from "../Models/songModel.js";

export const create_Album = async (req, res) => {
  try {
    const { error } = albumValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const data = await Album.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Create Album Failed" });
    }
    console.log(data);
    await Artist.findByIdAndUpdate(
      data.id_artist,
      {
        $addToSet: { album: data._id },
      },
      { new: true }
    );
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
    const data = await Album.find().populate("id_artist");
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
    const data = await Album.findById(req.params.id).populate("id_artist");
    const dataListSong = [];
    for (const item of data.id_artist[0].songs) {
      const findData = await songModel.findById(item);
      dataListSong.push(findData);
    }
    data.list_song = [...dataListSong];
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
    await Artist.findByIdAndUpdate(album.id_artist, {
      $pull: album._id,
    });
    await Artist.findByIdAndUpdate(album.id_artist, {
      $addToSet: album._id,
    });
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
