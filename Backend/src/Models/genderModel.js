import mongoose from "mongoose";

const Gender = new mongoose.Schema(
  {
    genre_name: {
      type: String,
      required: true,
    },
    list_song: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Genre", Gender, "Gender");
