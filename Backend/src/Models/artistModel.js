import mongoose from "mongoose";

const { Schema } = mongoose;

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: Object,
        required: true,
      },
    ],

    description: {
      type: String,
    },

    album: {
      type: mongoose.Types.ObjectId,
      ref: "Album",
    },

    songs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Artist = mongoose.model("Artists", artistSchema, "Artists");
export default Artist;
