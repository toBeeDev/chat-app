export function formatMessageTime(date) {
  return new Date(date).toLocaleDateString("ko", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
