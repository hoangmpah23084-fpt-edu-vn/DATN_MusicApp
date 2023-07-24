import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  public_id: {
    type: String,
  },
});

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

    image: [imageSchema],

    description: {
      type: String,
    },

    album: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Album",
        },
      ],

    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Artist = mongoose.model("Artists", artistSchema, "Artists");
export default Artist;
