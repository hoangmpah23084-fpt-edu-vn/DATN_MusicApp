import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const roomModel = new mongoose.Schema({
  nameGroup: String,
  password: String,
  room_image: Array,
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
  currentSongInRoom: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
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
roomModel.plugin(mongoosePaginate);
export default mongoose.model("room", roomModel);
