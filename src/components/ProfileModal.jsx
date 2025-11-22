import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { X, User, Heart, Lightbulb, LogOut } from "lucide-react";

//interface ProfileModalProps {
//  open: boolean;
//  onClose: () => void;
//  nickname: string;
//  onLogout: () => void;
//}

export function ProfileModal({ open, onClose, nickname, onLogout }) {
  const [editedNickname, setEditedNickname] = useState(nickname);
  const [timeOfDay, setTimeOfDay] = useState("pm");
  const [notificationHour, setNotificationHour] = useState("9");
  const [notificationMinute, setNotificationMinute] = useState("00");
  const [feedbackStyle, setFeedbackStyle] = useState("comfort");

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[350px] p-0 bg-transparent border-none shadow-none"
      >
        <DialogTitle className="sr-only">프로필 설정</DialogTitle>
        <DialogDescription className="sr-only">프로필과 설정을 관리하세요</DialogDescription>
        <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
          {/* Header */}
          <div className="bg-primary/10 p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-primary font-medium">프로필 설정</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-primary/10"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {/* Nickname Card */}
            <div className="space-y-2">
              <Label htmlFor="nickname" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" strokeWidth={2} />
                <span>닉네임</span>
              </Label>
              <Input
                id="nickname"
                value={editedNickname}
                onChange={(e) => setEditedNickname(e.target.value)}
                className="rounded-xl h-12"
              />
            </div>

            {/* Notification Time Card */}
            <div className="space-y-3">
              <Label>알림 시간</Label>
              
              {/* AM/PM Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeOfDay("am")}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                    timeOfDay === "am"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card"
                  }`}
                >
                  오전
                </button>
                <button
                  onClick={() => setTimeOfDay("pm")}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                    timeOfDay === "pm"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card"
                  }`}
                >
                  오후
                </button>
              </div>

              {/* Time Input */}
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={notificationHour}
                  onChange={(e) => setNotificationHour(e.target.value)}
                  className="flex-1 rounded-xl h-12 text-center"
                  placeholder="00"
                />
                <span className="text-lg">:</span>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={notificationMinute}
                  onChange={(e) => setNotificationMinute(e.target.value)}
                  className="flex-1 rounded-xl h-12 text-center"
                  placeholder="00"
                />
              </div>
            </div>

            {/* Feedback Style Card */}
            <div>
              <Label className="mb-3 block">AI 피드백 스타일</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFeedbackStyle("comfort")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    feedbackStyle === "comfort"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card"
                  }`}
                >
                  <Heart className="w-6 h-6 mx-auto mb-2 text-primary" strokeWidth={2} />
                  <p className="text-sm">위로</p>
                </button>
                <button
                  onClick={() => setFeedbackStyle("advice")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    feedbackStyle === "advice"
                      ? "border-secondary bg-secondary/10"
                      : "border-border bg-card"
                  }`}
                >
                  <Lightbulb className="w-6 h-6 mx-auto mb-2 text-secondary-foreground" strokeWidth={2} />
                  <p className="text-sm">조언</p>
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 pt-0 space-y-3">
            <Button 
              onClick={handleSave}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-soft"
            >
              저장하기
            </Button>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="w-full h-12 rounded-xl border-2 border-destructive/40 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5 mr-2" strokeWidth={2} />
              로그아웃
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}