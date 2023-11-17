import mongoose from "mongoose";
// Định nghĩa một schema cho model.
//Schema xác định cấu trúc của các documents trong collection và các thuộc tính của chúng.

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: [
      {
        url: { type: String}, 
        publicId: { type: String}
      },
    ],
    role: {
      type: String,
      default: "member",
    },
    accessToken: String,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
