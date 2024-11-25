import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "인증 실패 - 토큰없음" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "인증 실패 - 토큰유효하지않음" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("인증 미들웨어 에러 발생", error.message);
    res.status(500).json({ message: "서버 에러" });
  }
};
