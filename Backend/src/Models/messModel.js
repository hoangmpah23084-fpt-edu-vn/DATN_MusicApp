import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    id_room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    id_sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    textMessage: String,
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Message", messageModel);
