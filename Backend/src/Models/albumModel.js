import mongoose from "mongoose";

const Album = new mongoose.Schema(
  {
    album_name: {
      type: String,
      required: true,
    },
    list_song: [],
    id_artist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artists",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Album", Album, "Album");
