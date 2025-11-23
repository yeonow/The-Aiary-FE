import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X, Heart, BookOpen, Music, Lightbulb } from "lucide-react";
import "../styles/globals.css";

//interface DiaryDetailModalProps {
//  open: boolean;
//  onClose: () => void;
//  date: number;
//}

export function DiaryDetailModal({ open, onClose, date }) {
  const diaryContent =
    "오늘 오랜만에 친구를 만났는데 정말 좋았어요. 맛있는 음식도 먹고 오랜 시간 이야기도 나누었어요. 최근에 쌓였던 스트레스가 눈 녹듯 사라지는 기분이었어요. 이런 휴식이 정말 필요했나봐요.";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">일기 내용</DialogTitle>
        <DialogDescription className="sr-only">
          일기 내용과 AI 피드백을 확인하세요
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

            <h3 className="text-primary">11월 {date}일 일기</h3>
            <p className="text-sm text-muted-foreground mt-0.5">오늘의 일기</p>
          </div>

          {/* Diary Content */}
          <div className="p-6 space-y-5">
            <Card className="p-5 rounded-xl border bg-muted/20 shadow-soft">
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap letter-font">
                {diaryContent}
              </p>
            </Card>

            {/* AI Feedback Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" strokeWidth={2} />
                <h4 className="text-primary font-medium">AI 피드백</h4>
              </div>

              <div className="space-y-3">
                <Card className="p-4 rounded-xl border bg-primary/10 shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium text-foreground">
                      오늘의 감정: 행복
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed letter-font">
                    친구와의 시간은 정말 소중해요. 이런 작은 연결의 순간들이
                    삶에 많은 기쁨을 가져다주죠.
                  </p>
                </Card>

                <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen
                      className="w-4 h-4 text-foreground"
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium text-foreground">
                      추천 책
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-1 letter-font">
                    "우정에 관한 책"
                  </p>
                </Card>

                <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <Music
                      className="w-4 h-4 text-foreground"
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium text-foreground">
                      추천 음악
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-1 letter-font">
                    "Good Day"
                  </p>
                </Card>

                <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb
                      className="w-4 h-4 text-foreground"
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium text-foreground">
                      당신에게
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed letter-font">
                    오늘처럼 소중한 사람들과 시간을 보내는 것은 정말 중요해요.
                    이런 순간들이 우리 삶에 활력을 주고 스트레스를 풀어주죠. 💚
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="px-6 pb-6">
            <Button
              onClick={onClose}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-soft"
            >
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
