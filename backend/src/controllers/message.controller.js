import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    //protect route이기에 user_id에 접근가능
    const loggedInUserId = req.user_id;
    const filteredUsers = await User.find({
      _id: {
        //not equal 로그인 유저
        $ne: loggedInUserId,
      }.select("-password"),
    });

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(
      "사이드바를 위한 유저 데이터 요청에 실패했습니다.",
      error.message
    );
    res.status(500).json("서버 에러");
  }
};
