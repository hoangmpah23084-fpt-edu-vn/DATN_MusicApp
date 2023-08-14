import messModel from "../Models/messModel.js";
import userModel from "../Models/model_user.js";
import roomChatModel from "../Models/roomChatModel.js";

export const createMessage = async (req, res) => {
  try {
    const { idChat, textMessage } = req.body;
    const newMessage = {
      id_room: idChat,
      id_sender: req.user._id,
      textMessage: textMessage,
    };
    let message = await messModel.create(newMessage);
    message = await message.populate("id_room");
    message = await message.populate("id_sender", "fullName");
    console.log(message);
    message = await userModel.populate(message, {
      path: "id_room.memberGroup",
      select: "fullName email",
    });
    console.log(message);
    await roomChatModel.findByIdAndUpdate(
      idChat,
      {
        $addToSet: { listMessages: message },
      },
      { new: true }
    );
    return res.status(200).json({
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getMessage = async (req, res) => {
  try {
    const message = await messModel
      .find({ id_room: req.params.idChat })
      .populate("id_room")
      .populate("id_sender", "fullName email");
    if (!message) {
      return res.status(404).json({
        message: "Khong tim thay tin nhan",
      });
    }
    return res.status(200).json({
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { idChat, idMess } = req.body;
    const messChat = await roomChatModel
      .findByIdAndUpdate(
        idChat,
        {
          $pull: { listMessages: idMess },
        },
        { new: true }
      )
      .populate("memberGroup", "-password")
      .populate("listMessages")
      .populate("isAdminGroup", "-password");

    return res.status(200).json({
      message: "Xóa tin nhắn thành công",
      data: messChat,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
