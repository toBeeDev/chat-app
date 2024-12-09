import { create } from "zustand";
import toast from "react-hot-toast";
import { axios } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = axios.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
