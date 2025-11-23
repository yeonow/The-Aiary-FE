import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import "../styles/globals.css";

// 감정 목록
const emotions = [
  { id: "happy", label: "행복", color: "#FFE6A7" },
  { id: "sad", label: "슬픔", color: "#A7C0FF" },
  { id: "angry", label: "화남", color: "#FFB3A7" },
  { id: "anxious", label: "불안", color: "#D4C4E5" },
  { id: "calm", label: "평온", color: "#C4E5D4" },
  { id: "excited", label: "설렘", color: "#FFE0A3" },
  { id: "tired", label: "피곤", color: "#CFCFCF" },
  { id: "lonely", label: "외로움", color: "#E0C1D6" },
];

export function EmotionRecordModal({ open, onClose }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [reason, setReason] = useState("");

  const toggleEmotion = (emotionId) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(selectedEmotions.filter((id) => id !== emotionId));
    } else {
      setSelectedEmotions([...selectedEmotions, emotionId]);
    }
  };

  const handleSubmit = () => {
    if (selectedEmotions.length > 0) {
      // TODO: 저장 로직 추가
      setSelectedEmotions([]);
      setReason("");
      onClose();
    }
  };

  const today = new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-0 bg-transparent border-none shadow-none">
        <DialogTitle className="sr-only">감정 기록하기</DialogTitle>
        <DialogDescription className="sr-only">
          오늘의 감정을 기록하세요
        </DialogDescription>

        <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
          {/* Header */}
          <div className="bg-primary/10 p-6 border-b relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full hover:bg-primary/10"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </Button>

            <h3 className="text-primary mb-1">감정 기록하기</h3>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Emotion Selection */}
            <div>
              <h4 className="mb-3 text-foreground">
                지금 느끼는 감정을 선택해주세요
              </h4>

              <div className="flex flex-wrap gap-2.5">
                {emotions.map((emotion) => {
                  const isSelected = selectedEmotions.includes(emotion.id);

                  return (
                    <button
                      key={emotion.id}
                      onClick={() => toggleEmotion(emotion.id)}
                      className={`px-5 py-3 rounded-full border-2 transition-all shadow-soft ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <span className="text-sm">{emotion.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reason Input */}
            <div>
              <h4 className="mb-3 text-foreground">이유를 입력해주세요</h4>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={
                  "어떤 일이 있었나요?\n예: 친구와 즐거운 시간을 보냈어요"
                }
                className="min-h-[120px] rounded-xl border resize-none letter-font"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleSubmit}
              disabled={selectedEmotions.length === 0}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 shadow-soft"
            >
              기록하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
