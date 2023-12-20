import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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
Genre.plugin(mongoosePaginate);
export default mongoose.model("Genre", Genre, "Genre");
