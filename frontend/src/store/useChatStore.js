import { create } from "zustand";
import toast from "react-hot-toast";
import { axios } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
}));