import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Album = new mongoose.Schema(
  {
    album_name: {
      type: String,
      required: true,
    },
    list_song: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Song",
      },
    ],
    id_singer:   {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Singer",
      },
  },
  { versionKey: false, timestamps: true }
);
Album.plugin(mongoosePaginate);
export default mongoose.model("Album", Album, "Album");
