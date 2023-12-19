import { signinSchema, signupSchema } from "../Schemas/auth.js";
import bcrypt from "bcryptjs";
import User from "../Models/model_user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer"
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
      expiresIn: "30m",
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

const refreshToken = async (req, res) => {
  const { _id } = req.body;
  const token = await jwt.sign({ id: _id }, SECRETKEY, {
    expiresIn: "30m",
  });
  return res.json({
    message: "Làm mới thành công",
    accessToken: token,
  });
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


const updateUser = async (req, res) => {
  const id_user = req.user._id;
  try {
    const data = await User.findByIdAndUpdate(id_user, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res
        .status(404)
        .send({ message: "fail", error: "Lỗi không thể chỉnh sửa ảnh" });
    }
    return res.status(200).send({ message: "Chỉnh sửa cá nhân thành công", data: data });
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
}


const ChangePassword =async (req, res) => {
  const id_user = req.user._id;
  const {password , passwordUpgrade} =req.body;
  
  try {
    const user = await User.findOne({ _id:id_user });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
        message: "Mật khẩu cũ không đúng^^",
      });
    }
    const hashedPassword = await bcrypt.hash(passwordUpgrade, 5);
      const data = await User.findByIdAndUpdate(id_user, {password:hashedPassword}, {
        new: true,
        runValidators: true,
      });
      if (!data) {
        return res
          .status(404)
          .send({ message: "fail", error: "Đổi mật khẩu không thành công" });
      }
      return res.status(200).send({ message: "Đổi mật khẩu thành công", data: data });

  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
}


const VeryPass = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await User.findOne({ email:email });
    if (!data) {
      return res.status(400).send({ message: "Email không đúng" });
    }
    if (data) {
        const verificationCodee = Math.floor(100000 + Math.random() * 900000).toString();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hoangmaph23084@fpt.edu.vn',
                pass: 'injteevybwiugzax'
            }
        });
        // Thiết lập nội dung email
        const mailOptions = {
            from: 'hoangmaph23084@fpt.edu.vn',
            to: email,
            subject: 'Mã xác thực đăng nhập',
            text: `Mã xác thực của bạn là: ${verificationCodee}`,
        };
        // Gửi email
        transporter.sendMail(mailOptions, async (error) => {
            if (error) {
                return res.status(400).json({
                    message: error,
                });
            } else {
                await User.findOneAndUpdate(
                    { email },
                    { verificationCode: verificationCodee },
                    { upsert: true, new: true }
                );
            }
        });
        return res.status(200).json({
            message: "Đã gửi mã xác thực thành công",
        });
    }
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
}

const sendPass =async (req, res) => {
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }
  try {
    const { email ,code} = req.body;
    const data = await User.findOne({ email:email });
    if (data.email !==email) {
      return res.status(400).send({ message: "Email không đúng" });
  }
  if (data.verificationCode !== code) {
    return res.status(400).send({ message: "Mã xác thực không đúng" });
}

const passNew = generateRandomString(8)
const hashedPassword = await bcrypt.hash(passNew, 5);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hoangmaph23084@fpt.edu.vn',
        pass: 'injteevybwiugzax'
    }
});
// Thiết lập nội dung email
const mailOptions = {
    from: 'hoangmaph23084@fpt.edu.vn',
    to: email,
    subject: 'Mật khẩu mới',
    text: `Mật khẩu mới của bạn là: ${passNew}`,
};
// Gửi email
transporter.sendMail(mailOptions, async (error) => {
    if (error) {
        return res.status(400).json({
            message: error,
        });
    } else {
    await User.findOneAndUpdate(
            { email },
            { password:hashedPassword},
            { upsert: true, new: true }
        );
    }
});
return res.status(200).json({
    message: "Lấy lại mật khẩu thành công , vui lòng check mail",
    data: passNew 
});
  } catch (error) {
    return res.status(500).send({ message: "fail", error: error });
  }
}




export { signin, signup, getAllMembers, getOneUser, refreshToken ,updateUser ,ChangePassword ,VeryPass,sendPass};
