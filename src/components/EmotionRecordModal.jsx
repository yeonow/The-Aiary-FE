import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";

//interface EmotionRecordModalProps {
//  open: boolean;
//  onClose: () => void;
//}

const emotions = [
  { id: "happy", label, color,
  { id: "sad", label, color,
  { id: "angry", label, color,
  { id: "anxious", label, color,
  { id: "calm", label, color,
  { id: "excited", label, color,
  { id: "tired", label, color,
  { id: "lonely", label, color,
];

export function EmotionRecordModal({ open, onClose }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [reason, setReason] = useState("");

  const toggleEmotion = ( emotionId) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(selectedEmotions.filter(id => id !== emotionId));
    } else {
      setSelectedEmotions([...selectedEmotions, emotionId]);
    }
  };

  const handleSubmit = () => {
    if (selectedEmotions.length > 0) {
      // Save emotion record
      setSelectedEmotions([]);
      setReason("");
      onClose();
    }
  };

  const today = new Date().toLocaleDateString('ko-KR', { 
    month: 'long', day, weekday);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[350px] p-0 bg-transparent border-none shadow-none"
      >
        <DialogTitle className="sr-only">감정 기록하기</DialogTitle>
        <DialogDescription className="sr-only">오늘의 감정을 기록하세요</DialogDescription>
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
              <h4 className="mb-3 text-foreground">지금 느끼는 감정을 선택해주세요</h4>
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
                placeholder="어떤 일이 있었나요?&#10;예: 친구와 즐거운 시간을 보냈어요"
                className="min-h-[120px] rounded-xl border resize-none"
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
