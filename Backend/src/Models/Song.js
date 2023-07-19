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
    song_lyric: String,
    song_musian: String,
    song_dowload: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Song", SongSchame);
