import { THEMES } from "../constants";

const PREVIEW_MESSAGES = [
  { id: 1, content: "안녕하세요! 즐거운 하루보내고 계신가요?", isSent: false },
  { id: 2, content: "난 지금 행복해!", isSent: true },
];
const SettingsPage = () => {
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">테마</h2>
          <p className="text-sm text-base-content/70">
            원하는 테마를 선택해주세요
          </p>
        </div>
        <div className="grid grid-col-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
