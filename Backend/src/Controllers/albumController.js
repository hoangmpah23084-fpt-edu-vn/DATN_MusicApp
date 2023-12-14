import { albumValidate } from "../Schemas/albumSchema.js";
import Album from "../Models/albumModel.js";
import Singer from "../Models/singer.js";
import SongSchame from "../Models/songModel.js";

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
    await Singer.findByIdAndUpdate(
      data.id_singer,
      {
        $addToSet: { album: data._id },
      },
      { new: true }
    );
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
    const data = await Album.find().populate("id_singer");
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
    const data = await Album.findById(req.params.id).populate("id_singer").populate("list_song");
    
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
    await Singer.findByIdAndUpdate(album.id_singer, {
      $pull: album._id,
    });
    await Singer.findByIdAndUpdate(album.id_singer, {
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


export const addSongToAlbum = async (req, res) => {
  try {
    const { id_song } = req.body;
    if (!id_song) {
      return res.status(400).json({
        message: "Bài hát không hợp lệ",
      });
    }

    const isMatch = await Album.findOne({
      _id: req.params.id,
      list_song: { $in: id_song },
    });

    if (isMatch) {
      return res.json({
        message: "Bài hát đã có trong album",
      });
    }
    const data = await Album.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        list_song: id_song,
      },
    });

    return res.status(200).json({
      message: "Thêm bài hát thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeSongToAlbum = async (req, res) => {
  try {
    const { id_song } = req.body;
    if (!id_song) {
      return res.json({
        message: "Bài hát không hợp lệ",
      });
    }

    const isMatch = await Album.findOne({
      _id: req.params.id,
      list_song: { $in: id_song },
    });

    if (!isMatch) {
      return res.json({
        message: "Bài hát không trong playlist",
      });
    }

    const data = await Album.findByIdAndUpdate(req.params.id, {
      $pull: {
        list_song: id_song,
      },
    });

    return res.status(200).json({
      message: "Xóa bài hát thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
