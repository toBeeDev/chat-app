import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "누락된 필드가 존재합니다." });
    }
    //token 발급로직
    //hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "비밀번호는 최소 6자리여야 합니다." });
    }
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //jwt 토큰 생성
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "올바르지 않은 접근입니다." });
    }
  } catch (error) {
    console.log("회원가입 컨트롤러 오류", error.message);
    res.status(500).json({ message: "서버 에러" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "정보를 찾을 수 없습니다." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "정보를 찾을 수 없습니다." });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("로그인에 실패하였습니다.", error.message);
    res.status(500).json({ message: "서버 에러" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "로그아웃 성공" });
  } catch (error) {
    console.log("로그아웃에 실패하였습니다.", error.message);
    res.status(500).json({ message: "서버 에러" });
  }
};

export const updateProfile = async (req, res) => {};
