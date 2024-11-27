import { create } from "zustand";
import { axios } from "../lib/axios";

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
}));
