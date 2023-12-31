import model_user from "../Models/model_user.js";
import roomModel from "../Models/roomChatModel.js";
import { roomSchame } from "../Schemas/roomSchame.js";
import songModel from "../Models/songModel.js";
import Singer from "../Models/singer.js";
import Genre from "../Models/genreModel.js";
import SongSchame from "../Models/songModel.js";

export const createRoom = async (req, res) => {
  try {
    const { nameGroup, password } = req.body;
    // const { error } = roomSchame.validate(req.body, { abortEarly: false });
    // if (error) {
    //   return res.status(400).json({
    //     message: error.details[0].message,
    //   });
    // }
    const exitRoom = await roomModel.findOne({ nameGroup });
    if (exitRoom) {
      return res.status(400).json({
        message: "Tên phòng đã tồn tại",
      });
    }
    // memberGroup.push(req.user);

    const createRoom = await roomModel.create({
      nameGroup,
      password,
      memberGroup: [req.user._id],
      isAdminGroup: req.user._id,
    });

    const roomChat = await roomModel
      .findOne({ _id: createRoom._id })
      .populate("memberGroup", "-password")
      .populate("isAdminGroup", "-password");
    console.log("tạo phòng nhạc", roomChat);

    return res.status(200).json({
      message: "Tạo phòng thành công",
      data: roomChat,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addSongInRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await roomModel.findById(id).populate("listSong");
    if (data.listSong.find((item) => item._id == req.body._id)) {
      return res.status(400).json({
        message: "Bài nhạc đã tồn tại",
      });
    }
    await roomModel
      .findByIdAndUpdate(id, {
        $addToSet: { listSong: [req.body, ...data.listSong] },
      })
      .populate("listSong");
    data.listSong = [req.body, ...data.listSong];
    const currentData = await roomModel.findById(id).populate("listSong");
    console.log(currentData);
    return res.status(200).json({
      message: "Thêm nhạc thành công",
      data: currentData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteSongInRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const data = await roomModel.findById(id).populate("listSong");
    if (data.listSong.length <= 1) {
      return ré.status(400).json({
        message: "Phòng chỉ có một bài hát không thể xóa",
      });
    }
    await roomModel.findByIdAndUpdate(data._id, {
      $pull: {
        listSong: formData._id,
      },
    });
    const currentData = await roomModel.findById(id).populate("listSong");
    return res.status(200).json({
      message: "Xóa bài hát thành công",
      data: currentData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRoomChat = async (req, res) => {
  try {
    const getRoom = await roomModel.findById(req.params.idChat);
    const updateRoom = await roomModel.findByIdAndUpdate(
      req.params.idChat,
      req.body,
      { new: true }
    );
    if (!updateRoom) {
      return res.status(404).json({
        message: "Không tìm thấy phòng",
      });
    }
    return res.status(200).json({
      message: "Update Phòng thành công",
      data: updateRoom,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getRoom = async (req, res) => {
  try {
    const result = await roomModel
      .findById(req.params.idChat)
      .populate("memberGroup", "-password")
      .populate("isAdminGroup", "-password")
      .populate("listMessages", "-password -id_room")
      .populate("listSong")
      .populate("currentSongInRoom");

    const backgrounds = [
      "https://i.redd.it/357yv737qmy71.png",
      // Thêm các đường dẫn ảnh khác vào đây
      // Ví dụ:
      "https://cdn.wallpapersafari.com/81/0/P2xqdv.jpg",
      "https://preview.redd.it/gentle-warmth-3840x2160-v0-cp4f7dncrgxb1.png?auto=webp&s=8653ef69a3b7edb23e4665dce8886d3b6dd8c069",
      "https://c.wallhere.com/photos/59/90/LofiGirl_LoFi_neon_LofiBoy_purple_blue-2234432.jpg!d",
    ];

    if (result) {
      await model_user.populate(result, {
        path: "listMessages.id_sender",
        select: "fullName",
      });
      if (result.listSong.length < 1) {
        const randomImage =
          backgrounds[Math.floor(Math.random() * backgrounds.length)];
        const song = (await songModel.find())
          .sort((a, b) => b.view_song - a.view_song)
          .slice(0, 6);
        const singerSongs = await SongSchame.populate(song, {
          path: "id_Singer",
          model: Singer,
          select: "name",
        });
        const genreSongs = await SongSchame.populate(singerSongs, {
          path: "id_Genre",
          model: Genre,
          select: "name",
        });
        await roomModel.findByIdAndUpdate(result._id, {
          $addToSet: {
            room_image: randomImage,
          },
        });

        await roomModel.findByIdAndUpdate(result._id, {
          $addToSet: { listSong: [...result.listSong, ...genreSongs] },
        });
        // .populate("listSong");
        result.listSong = [...result.listSong, ...genreSongs];
      }
      console.log(Object.keys(result.currentSongInRoom).length);
      if (Object.keys(result.currentSongInRoom).length === 0) {
        await roomModel.findByIdAndUpdate(
          result._id,
          {
            $addToSet: { currentSongInRoom: result.listSong[0]._id },
          },
          { new: true }
        );
      }
      roomModel.currentSongInRoom = result.listSong[0]._id;
      console.log(result);
      res.status(200).json({
        message: "Lấy phòng thành công",
        data: result,
      });
    } else {
      return res.status(400).json({
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getRooms = async (req, res) => {
  const { search } = req.query;
  try {
    let query = {};
    if (search) {
      query = {
        $or: [{ nameGroup: { $regex: search, $options: "i" } }],
      };
    }
    const options = {
      populate: ["isAdminGroup"],
    };
    const getRooms = await roomModel.paginate(query, options);
    if (!getRooms) {
      return res.status(404).json({
        message: "Không tìm thấy phòng",
      });
    }
    return res.status(200).json({
      message: "Lấy phòng thành công",
      data: getRooms.docs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { idChat } = req.params;
    const data = await roomModel.findByIdAndDelete({ _id: idChat });
    if (!data) {
      return res.status(404).json({
        message: "Khong tim thay phong chat",
      });
    }
    return res.status(200).json({
      message: "Xóa phòng thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { idChat, password } = req.body;
    const Chat = await roomModel.findOne({ _id: idChat });

    if (!Chat) {
      return res.status(400).json({
        message: "Phòng không tồn tại.",
      });
    }

    if (password != Chat.password) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }

    if (!Chat.memberGroup.includes(req.user._id)) {
      if (Chat.memberGroup.length >= 2) {
        return res.status(400).json({
          message: "Phòng đã đủ người",
        });
      }

      const joinChat = await roomModel
        .findByIdAndUpdate(
          idChat,
          {
            $push: {
              memberGroup: req.user._id,
            },
          },
          { new: true }
        )
        .populate("memberGroup", "-password")
        .populate("isAdminGroup", "-password");
      if (!joinChat) {
        return res.status(404).json({
          message: "Người dùng không tồn tại",
        });
      }
      return res.status(200).json({
        message: "Tham gia phòng thành công",
        data: joinChat,
      });
    }

    return res.status(200).json({
      message: "Tham gia phòng thành công",
      data: Chat,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteUserFromRoom = async (req, res) => {
  try {
    const { idChat, idUser } = req.body;
    const deleteUserRoom = await roomModel
      .findByIdAndUpdate(
        idChat,
        {
          $pull: {
            memberGroup: idUser,
          },
        },
        { new: true }
      )
      .populate("memberGroup", "-password")
      .populate("isAdminGroup", "-password");
    if (!deleteUserRoom) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }
    return res.status(200).json({
      message: "Xóa người dùng thành công",
      data: deleteUserRoom,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const leaveRoom = async (req, res) => {
  try {
    const Chat = await roomModel.findById(req.params.id);
    if (!Chat) {
      return res.status(400).json({
        message: "Phòng không còn tồn tại.",
      });
    }
    const idAdmin = Chat.isAdminGroup;
    const idUser = req.user._id;
    if (String(idAdmin) == String(idUser)) {
      await roomModel.findByIdAndDelete(Chat._id);
      return res.status(200).json({
        message: "Rời phòng thành công.",
      });
    } else {
      await roomModel.findByIdAndUpdate(Chat._id, {
        $pull: { memberGroup: idUser },
      });
    }

    return res.status(200).json({
      message: "Rời phòng thành công.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const handUpdateCurrentSongInRoom = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const room = await roomModel.findOne({ _id: id });
    // room.currentSongInRoom = req.body.id_song;
    await roomModel.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { currentSongInRoom: room.currentSongInRoom[0] },
      }
    );
    await roomModel.findByIdAndUpdate(
      { _id: id },
      {
        $addToSet: { currentSongInRoom: req.body._id },
      }
    );
    return res.status(200).json({
      message: "cập nhật current Song thành công",
      data: room,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
