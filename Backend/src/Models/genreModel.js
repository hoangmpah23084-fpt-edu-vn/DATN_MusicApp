import mongoose from "mongoose";

const Genre = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    list_songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Genre", Genre, "Genre");
