import model_user from "../Models/model_user.js";
import roomModel from "../Models/roomChatModel.js";
import { roomSchame } from "../Schemas/roomSchame.js";

export const createRoom = async (req, res) => {
  try {
    const { nameGroup, password } = req.body;
    const { error } = roomSchame.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
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
    await roomModel
      .findById(req.params.idChat)
      .populate("memberGroup", "-password")
      .populate("isAdminGroup", "-password")
      .populate("listMessages", "-password -id_room")
      .then(async (result) => {
        result = await model_user.populate(result, {
          path: "listMessages.id_sender",
          select: "fullName",
        });
        // email
        res.status(200).json({
          message: "Lấy phòng thành công",
          data: result,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const getRooms = await roomModel.find();
    if (!getRooms) {
      return res.status(404).json({
        message: "Không tìm thấy phòng",
      });
    }
    return res.status(200).json({
      message: "Lấy phòng thành công",
      data: getRooms,
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
        joinChat,
      });
    }

    return res.status(200).json({
      message: "Tham gia phòng thành công",
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
    return res.status(400).json({
      message: error,
    });
  }
};
