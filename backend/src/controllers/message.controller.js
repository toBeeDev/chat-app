import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(
      "사이드바를 위한 유저 데이터 요청에 실패했습니다.",
      error.message
    );
    res.status(500).json("서버 에러");
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      //내가 보내거나 받은 모든 메시지
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("유저 메시지 조회에 실패했습니다.", error.message);
    res.status(500).json("서버 에러");
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      //이미지 base64로 cloudinary에 업로드
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //TODO: 실시간 반영 w.socket.io
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("메시지 전송에 실패했습니다.", error.message);
    res.status(500).json("서버 에러");
  }
};
