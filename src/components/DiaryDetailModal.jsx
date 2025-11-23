import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Card } from "./ui/card";
import { Heart, BookOpen, Music, Lightbulb } from "lucide-react";
import { getDiaryById } from "../api/diaryApi"; // ★ 단일 조회 API 사용

export function DiaryDetailModal({ open, onClose, diaryId }) {
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 open될 때 단일 diaryId 로 API 호출
  useEffect(() => {
    if (!open || diaryId == null) return;

    async function loadDiary() {
      setLoading(true);

      try {
        const data = await getDiaryById(diaryId);
        setDiary(data);
      } catch (err) {
        console.error("Diary load error:", err);
        setDiary(null); // 에러 시 null 처리
      }

      setLoading(false);
    }

    loadDiary();
  }, [open, diaryId]);

  // 로딩 또는 데이터 없음 처리
  if (loading || !diary) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="p-6 text-center">
          {loading ? "불러오는 중..." : "데이터가 없습니다"}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">일기 내용</DialogTitle>
        <DialogDescription className="sr-only">
          일기 내용과 AI 피드백
        </DialogDescription>

        <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
          {/* Header */}
          <div className="bg-primary/10 p-6 border-b">
            <h3 className="text-primary">
              {diary.createdAt?.split("T")[0]} 일기
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {diary.category || "카테고리 없음"}
            </p>
          </div>

          {/* Diary Content */}
          <div className="p-6 space-y-5">
            <Card className="p-5 rounded-xl border bg-muted/20 shadow-soft">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {diary.content}
              </p>
            </Card>

            {/* AI Feedback */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <h4 className="text-primary font-medium">AI 피드백</h4>
              </div>

              <div className="space-y-3">

                {/* 감정 */}
                {diary.emotion && (
                  <Card className="p-4 rounded-xl border bg-primary/10 shadow-soft">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm font-medium">
                        감정: {diary.emotion}
                      </span>
                    </div>
                    <p className="text-xs">
                      {diary.reply || "AI 응답 없음"}
                    </p>
                  </Card>
                )}

                {/* 책 */}
                {diary.book && (
                  <Card className="p-4 rounded-xl border bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm font-medium">추천 책</span>
                    </div>
                    <p className="text-sm">{diary.book}</p>
                  </Card>
                )}

                {/* 음악 */}
                {diary.music && (
                  <Card className="p-4 rounded-xl border bg-muted/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Music className="w-4 h-4" />
                      <span className="text-sm font-medium">추천 음악</span>
                    </div>
                    <p className="text-sm">{diary.music}</p>
                  </Card>
                )}

                {/* 기타 메시지 */}
                <Card className="p-4 rounded-xl border bg-muted/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-sm font-medium">AI 메시지</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {diary.reply || "AI 메시지가 없습니다."}
                  </p>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
