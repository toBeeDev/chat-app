import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {};
  const removeImage = () => {};
  const handleSendMessage = async (e) => {};

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative"></div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
