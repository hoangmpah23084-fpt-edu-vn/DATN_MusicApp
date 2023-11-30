import PlayList from "../Models/playlistModal.js";
import { playlistSchema } from "../Schemas/playlistSchema.js";

const getAllPlaylist = async (req, res) => {
  try {
    const playlists = await PlayList.find({id_user: req.user._id}).populate("id_user").populate("list_song");
    if (playlists.length == 0) {
      return res.json({
        message: "Không có playlist nào",
      });
    }
    return res.status(200).json({
      message: "Danh sách playlist",
     data: playlists,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getOnePlaylist = async (req, res) => {
  try {
    const data = await PlayList.findById(req.params.id).populate("list_song").populate("id_user")
    if (!data) {
      return res.json({
        message: "playlist không tồn tại",
      });
    }
    return res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { error } = playlistSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const params = {
      ...req.body,
      id_user: req.user._id
    }

    const data = await PlayList.create(params);
    if (!data) {
      return res.status(404).json({
        message: "Tạo playlist thất bại ",
      });
    }

    return res.status(200).json({
      message: "Tạo playlist thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { error } = playlistSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details,
      });
    }
    const id = req.params.id;
    const { playlist_name } = req.body;

    const data = await PlayList.findByIdAndUpdate(id, {
      playlist_name: playlist_name,
    });
    return res.status(200).json({
      message: "Cập nhập thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const removePlaylist = async (req, res) => {
  try {
    const data = await PlayList.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Xóa thất bại",
      });
    }
    return res.status(200).json({
      message: "Xóa thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const { id_song } = req.body;
    if (!id_song) {
      return res.status(400).json({
        message: "Bài hát không hợp lệ",
      });
    }

    const isMatch = await PlayList.findOne({
      _id: req.params.id,
      list_song: { $in: id_song },
    });

    if (isMatch) {
      return res.json({
        message: "Bài hát đã có trong playlist",
      });
    }

    console.log(
      req.params.id,id_song
    );

    const data = await PlayList.findByIdAndUpdate(req.params.id, {
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

const removeSongToPlaylist = async (req, res) => {
  try {
    const { id_song } = req.body;
    if (!id_song) {
      return res.json({
        message: "Bài hát không hợp lệ",
      });
    }

    const isMatch = await PlayList.findOne({
      _id: req.params.id,
      list_song: { $in: id_song },
    });

    if (!isMatch) {
      return res.json({
        message: "Bài hát không trong playlist",
      });
    }

    const data = await PlayList.findByIdAndUpdate(req.params.id, {
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

export {
  createPlaylist,
  removePlaylist,
  getAllPlaylist,
  getOnePlaylist,
  updatePlaylist,
  addSongToPlaylist,
  removeSongToPlaylist,
};
