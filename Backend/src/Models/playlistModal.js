import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    playlist_name: {
      type: String,
      required: true,
    },

    id_user: {
      type: String,
      required: true,
    },
    list_song: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Playlist", playlistSchema, "Playlist");
