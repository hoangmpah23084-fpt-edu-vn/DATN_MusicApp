import mongoose from "mongoose";

const roomModel = new mongoose.Schema({
  nameGroup: String,
  password: String,
  room_image: [
    {
      type: Object,
      required: true,
    },
  ],
  memberGroup: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  listMessages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  isAdminGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  listSong: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
});

export default mongoose.model("room", roomModel);
