import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X, Heart, BookOpen, Music, Lightbulb, Mail } from "lucide-react";

//interface LetterFeedbackModalProps {
//  open: boolean;
//  onClose: () => void;
//  diaryContent: string;
//}

export function LetterFeedbackModal({ open, onClose, diaryContent }) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (open && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [open, hasAnimated]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[350px] w-[calc(100%-2rem)] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto"
      >
        <DialogTitle className="sr-only">AI 피드백 편지</DialogTitle>
        <DialogDescription className="sr-only">당신의 일기에 대한 AI의 피드백입니다</DialogDescription>
        <div 
          className={`bg-card rounded-2xl shadow-soft-lg border overflow-hidden transition-all duration-700 ${
            hasAnimated ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-[-20px]'
          }`}
        >
          {/* Header - Letter Theme */}
          <div className="bg-gradient-to-br from-primary/20 to-yellow-100/40 p-6 border-b relative">
            
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary rounded-full p-2">
                <Mail className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
              </div>
              <h3 className="text-primary">당신에게 편지가 도착했어요</h3>
            </div>
            <p className="text-sm text-muted-foreground">AI가 보내는 따뜻한 이야기</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Main Feedback Card */}
            <Card className="p-5 rounded-xl border bg-primary/10 shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-primary" strokeWidth={2} fill="currentColor" />
                <h4 className="text-primary font-medium">오늘의 감정 분석</h4>
              </div>
              <div className="mb-3">
                <div className="inline-block bg-card rounded-full px-4 py-2 mb-3 shadow-soft">
                  <span className="text-sm font-medium text-foreground">행복</span>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                오늘 일기를 읽으며 따뜻한 행복이 느껴졌어요. 
                친구와의 시간은 정말 소중해요. 이런 작은 연결의 순간들이 삶에 많은 기쁨을 가져다주죠.
              </p>
            </Card>

            {/* Recommendations */}
            <div className="space-y-3">
              <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft hover:shadow-soft-lg transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-foreground" strokeWidth={2} />
                  <span className="text-sm font-medium text-foreground">추천 책</span>
                </div>
                <p className="text-sm text-foreground mb-1">
                  "우정에 관한 이야기"
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  의미 있는 관계에 대한 따뜻한 이야기
                </p>
              </Card>

              <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft hover:shadow-soft-lg transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="w-4 h-4 text-foreground" strokeWidth={2} />
                  <span className="text-sm font-medium text-foreground">추천 음악</span>
                </div>
                <p className="text-sm text-foreground mb-1">
                  "Good Day - 좋은 하루"
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  오늘의 행복을 기념하는 노래
                </p>
              </Card>

              <Card className="p-4 rounded-xl border bg-muted/20 shadow-soft hover:shadow-soft-lg transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-foreground" strokeWidth={2} />
                  <span className="text-sm font-medium text-foreground">당신에게</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  오늘처럼 소중한 사람들과 시간을 보내는 것은 정말 중요해요. 
                  이런 순간들이 우리 삶에 활력을 주고 스트레스를 풀어주죠. 
                  앞으로도 이런 행복한 순간들을 많이 만들어가세요! 💚
                </p>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}