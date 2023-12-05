import mongoose from "mongoose";

const BXHSingerModel = new mongoose.Schema({
  time: {
    type: String,
    default: "",
  },
  BXHSinger: [],
});

export default mongoose.model("BHXSinger", BXHSingerModel);
