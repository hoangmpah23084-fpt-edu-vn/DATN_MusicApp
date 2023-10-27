import messModel from "../Models/messModel.js";
import userModel from "../Models/model_user.js";
import roomChatModel from "../Models/roomChatModel.js";

export const createMessage = async (req, res) => {
  try {
    const { textMessage , id_room , id_sender } = req.body;
    const newMessage = {
      id_room: id_room,
      id_sender: id_sender,
      textMessage: textMessage,
    };
    const message = await messModel.create(newMessage);
    await roomChatModel.findByIdAndUpdate(
      {_id: id_room},
      {
        $addToSet: { listMessages: message._id },
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

// export const deleteMessage = async (req, res) => {
//   try {
//     const { idChat, idMess } = req.body;
//     const messChat = await roomChatModel
//       .findByIdAndUpdate(
//         idChat,
//         {
//           $pull: { listMessages: idMess },
//         },
//         { new: true }
//       )
//       .populate("memberGroup", "-password")
//       .populate("listMessages")
//       .populate("isAdminGroup", "-password");

//     return res.status(200).json({
//       message: "Xóa tin nhắn thành công",
//       data: messChat,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const deleteMessage = async (req, res) => {
    try {
      const idChat = req.params.idChat
      const message = await messModel.findById(idChat)
      if(message) {
        const {id_room} = message
        const resp =  await messModel.findByIdAndUpdate(idChat, {
          textMessage: "Tin nhắn đã được thu hồi."
        })
        return res.status(200).json({
          message: "Thu hồi tin nhắn thành công",
          data: resp,
        });
      }
     else { 
      return res.status(200).json({
      message: "Xóa tin nhắn thất bại."
    });

     }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
