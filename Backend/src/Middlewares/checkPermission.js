import jwt from "jsonwebtoken";
import User from "../Models/model_user";

import dotenv from "dotenv";

dotenv.config();

const { SECRETKEY } = process.env;

export const checkPermission = async (req, res, next) => {
  try {
    // console.log(req.headers);
    if (!req.headers.authorization) {
      throw new Error("Bạn cần đăng nhập để thực hiện hành động này ^^");
    }
    // lấy token
    const token = await req.headers.authorization.split(" ")[1];
    const { id } = await jwt.verify(token, SECRETKEY);

    const user = await User.findById(id);
    req.user = user;
    if (user.role !== "admin") {
      throw new Error("Bạn không có quyền để thực hiện hành động này ^^");
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
