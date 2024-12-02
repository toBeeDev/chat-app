import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const handleImageUpload = async (e) => {};
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <h1 className="text-2xl font-semibold">프로필</h1>
          <p className="mt-2">내 프로필 정보</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={authUser.profilePic || "/avatar.png"}
              alt="프로필"
              className="size-32 rounded-full object-cover border-4"
            />
            <label
              htmlFor="avatar-upload"
              className={`
              absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all
              duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }
              `}
            >
              <Camera className="w-5 h-5 text-base-200" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
