import mongoose from "mongoose";

const { Schema } = mongoose;

const singerSchema = new Schema(
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
    // album: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Album",
    //   },
    // ],

    songs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Singer = mongoose.model("Singer", singerSchema, "Singer");
export default Singer;
