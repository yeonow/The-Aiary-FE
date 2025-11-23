import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Card } from "./ui/card";
import { Heart, BookOpen, Music, Lightbulb, Mail } from "lucide-react";
import "../styles/globals.css";

export function LetterFeedbackModal({ open, onClose, diary }) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (open && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [open, hasAnimated]);

  if (!open) return null;

  // 🟣 diary가 없으면 (안 넘어오면)
  if (!diary) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="p-6 text-center">
          <p>분석된 결과가 없습니다.</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] w-[calc(100%-2rem)] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">AI 피드백 편지</DialogTitle>
        <DialogDescription className="sr-only">
          당신의 일기에 대한 AI의 피드백입니다
        </DialogDescription>

        {/* AI 결과 표시 */}
        <div
          className={`bg-card rounded-2xl shadow-soft-lg border overflow-hidden transition-all duration-700 ${
            hasAnimated
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-[-20px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-primary/20 to-yellow-100/40 p-6 border-b">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary rounded-full p-2">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-primary">당신에게 편지가 도착했어요</h3>
            </div>
            <p className="text-sm text-muted-foreground">AI가 보내는 이야기</p>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-5">
            {/* 감정 분석 카드 */}
            <Card className="p-5 rounded-xl border bg-primary/10 shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-primary" />
                <h4 className="text-primary font-medium">오늘의 감정 분석</h4>
              </div>

              <div className="mb-3">
                <div className="inline-block bg-card rounded-full px-4 py-2 shadow-soft">
                  <span className="text-sm font-medium text-foreground">
                    {diary.emotion || "감정 분석 없음"}
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed letter-font">
                {diary.reply || "AI 응답이 없습니다."}
              </p>
            </Card>

            {/* 추천 책 */}
            {diary.book && (
              <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">추천 책</span>
                </div>
                <p className="text-sm letter-font">{diary.book}</p>
              </Card>
            )}

            {/* 추천 음악 */}
            {diary.music && (
              <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="w-4 h-4" />
                  <span className="text-sm font-medium">추천 음악</span>
                </div>
                <p className="text-sm letter-font">{diary.music}</p>
              </Card>
            )}

            {/* AI 메시지 */}
            <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm font-medium">당신에게</span>
              </div>
              <p className="text-xs leading-relaxed letter-font">
                {diary.message || diary.reply || "따뜻한 메시지가 없습니다."}
              </p>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
