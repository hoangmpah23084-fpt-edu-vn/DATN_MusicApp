import PlayList from "../Models/Playlist";
import { playlistSchema } from "../Schemas/Playlist";

const getAllPlaylist = async (req, res) => {
  try {
    const playlists = await PlayList.find();
    if (playlists.length == 0) {
      return res.json({
        message: "Không có playlist nào",
      });
    }
    return res.json({
      message: "Danh sách playlist",
      playlists,
    });
  } catch (error) {}
};

const getOnePlaylist = async (req, res) => {
  try {
    const playlist = await PlayList.findById(req.params.id);
    if (!playlist) {
      return res.json({
        message: "playlist không tồn tại",
      });
    }
    return res.json({
      playlist,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { error } = await playlistSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.json({
        message: error.details,
      });
    }

    const playlist = await PlayList.create(req.body);
    if (!playlist) {
      return res.json({
        message: "Tạo playlist thất bại ",
      });
    }

    return res.json({
      message: "Tạo playlist thành công",
      playlist,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { error } = playlistSchema.validate(req.body);
    if (error) {
      return res.json({
        message: error.details,
      });
    }
    const id = req.params.id;
    const { playlist_name } = req.body;

    const playlist = await PlayList.findByIdAndUpdate(id, {
      playlist_name: playlist_name,
    });
    return res.json({
      message: "Cập nhập thành công",
      playlist,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const removePlaylist = async (req, res) => {
  try {
    const playlist = await PlayList.findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.json({
        message: "Xóa thất bại",
      });
    }
    return res.json({
      message: "Xóa thành công",
      playlist,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const addSongToPlaylist = async (req, res) => {
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

    if (isMatch) {
      return res.json({
        message: "Bài hát đã có trong playlist",
      });
    }

    const playlist = await PlayList.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        list_song: id_song,
      },
    });

    return res.json({
      message: "Thêm bài hát thành công",
      playlist,
    });
  } catch (error) {
    return res.json({
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

    const playlist = await PlayList.findByIdAndUpdate(req.params.id, {
      $pull: {
        list_song: id_song,
      },
    });

    return res.json({
      message: "Xóa bài hát thành công",
      playlist,
    });
  } catch (error) {
    return res.json({
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
