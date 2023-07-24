import { signinSchema, signupSchema } from "../Schemas/auth";
import bcrypt from "bcryptjs";
import User from "../Models/model_user";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const { SECRETKEY } = process.env;

// Sign up
const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    // console.log(fullName, email, password);
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      //   console.log(errors);
      return res.status(400).json({
        message: errors,
      });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email đã được đăng ký",
      });
    }
    /* Hashing the password: mã hóa mật khẩu*/
    const hashedPassword = await bcrypt.hash(password, 5);
    // console.log('password',hashedPassword);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return res.json({
      message: "Tạo thành công người dùng mới ^^",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// Sign in
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status.json({
        message: errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `Email: '${email}' không tồn tại ^^`,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        message: "Không đúng mật khẩu ^^",
      });
    }
    const token = await jwt.sign({ id: user._id }, SECRETKEY, {
      expiresIn: "1h",
    });
    return res.json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await User.find();
    if (members.length === 0) {
      return res.json({
        message: "Không có bất kỳ tài khoản nào!",
      });
    }
    return res.json({
      message: "Get All Member",
      members,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.json({
        message: "Không tồn tại người dùng ^^",
      });
    }
    return res.json({
      message: "Get One Member",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
export { signin, signup, getAllMembers, getOneUser };
