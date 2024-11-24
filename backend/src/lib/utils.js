import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const privateKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, privateKey, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    httpOnly: true, //XSS 공격 방어 cross-site scripting attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
