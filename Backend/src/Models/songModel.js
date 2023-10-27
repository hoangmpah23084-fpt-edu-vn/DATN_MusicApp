import mongoose from "mongoose";

const SongSchame = new mongoose.Schema(
  {
    song_name: String,
    song_title: String,
    song_link: String,
    song_image: [
      {
        type: Object,
        required: true,
      },
    ],
    song_singer: String,
    song_musian: String,
    song_lyric: String,
    is_dowload: {
      type: Boolean,
      default: true,
    },
    id_Genre: {
      type: mongoose.Types.ObjectId,
      ref: "Genre",
    },
    id_Artists: {
      type: mongoose.Types.ObjectId,
      ref: "Artists",
    },
    total_like:{
      type:Number,
      default: 0,
    }
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Song", SongSchame, "Song");



