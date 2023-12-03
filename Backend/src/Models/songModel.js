import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const SongSchame = new mongoose.Schema(
  {
    song_name: String,
    song_link: String,
    song_image: [
      {
        type: Object,
        required: true,
      },
    ],
    song_title: String,
    is_dowload: {
      type: Boolean,
      default: true,
    },
    id_Genre: {
      type: mongoose.Types.ObjectId,
      ref: "Genre",
    },
    id_Singer: {
      type: mongoose.Types.ObjectId,
      ref: "Singer",
    },
    month: {
      type: String,
      default:"{}"
    },
    total_like: {
      type: Number,
      default: 0,
    },
    view_song: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

SongSchame.plugin(mongoosePaginate);
export default mongoose.model("Song", SongSchame, "Song");
