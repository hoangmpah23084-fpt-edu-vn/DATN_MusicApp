import jwt from "jsonwebtoken";
import model_user from "../Models/model_user.js";

const authUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //todo decoded token id
      const decoded = jwt.verify(token, process.env.SECRETKEY);
      // console.log(decoded);
      req.user = await model_user.findById(decoded.id).select("-password");
      // console.log(req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
export default authUser;
