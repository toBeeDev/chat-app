import { create } from "zustand";
import { axios } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = axios.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("권한 확인중에 에러가 발생했습니다.", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("회원가입 완료");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ authUser: null });
      toast.success("로그아웃 완료");
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  },
}));
