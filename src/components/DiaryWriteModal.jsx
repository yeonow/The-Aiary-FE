import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createDiary } from "../api/diaryApi"; // ★ API 추가
import "../styles/globals.css";

export function DiaryWriteModal({ open, onClose, onSaved, testResultId }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!content.trim()) return;

  try {
    const savedDiary = await createDiary({
      content,
      type: "COMFORT",
      category: "일기",
      keywords: ""
    });

    onSaved(savedDiary);   // ← 반드시 이걸 보내야 함!!!
    onClose();
  } catch (err) {
    console.error("Error:", err);
  }
};

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-0 bg-transparent border-none shadow-none">
        <DialogTitle className="sr-only">일기 쓰기</DialogTitle>
        <DialogDescription className="sr-only">
          오늘의 일기를 작성하세요
        </DialogDescription>

        <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
          {/* Header */}
          <div className="bg-primary/10 p-6 border-b">
            <h3 className="text-primary mb-1">오늘의 일기</h3>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"오늘 하루는 어땠나요?\n마음껏 이야기를 적어보세요..."}
              className="min-h-[300px] rounded-xl border resize-none text-foreground placeholder:text-muted-foreground/50 letter-font"
            />
          </div>

          {/* Submit Button */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || loading}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 shadow-soft"
            >
              {loading ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
