import mongoose from "mongoose";

const Album = new mongoose.Schema(
  {
    album_name: {
      type: String,
      required: true,
    },
    list_song: [],
    id_singer:   {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Singer",
      },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Album", Album, "Album");
