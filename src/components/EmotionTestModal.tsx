import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { X, Sparkles } from "lucide-react";

interface EmotionTestModalProps {
  open: boolean;
  onClose: () => void;
}

const questions = [
  {
    question: "오늘 하루 기분은 어떠셨나요?",
    options: ["정말 좋았어요", "괜찮았어요", "그저 그랬어요", "별로였어요"]
  },
  {
    question: "최근 일주일간 가장 많이 느낀 감정은?",
    options: ["행복", "평온", "불안", "피곤함"]
  },
  {
    question: "스트레스를 받을 때 어떻게 해소하시나요?",
    options: ["친구와 대화", "혼자 시간 보내기", "운동하기", "음악 듣기"]
  },
  {
    question: "요즘 가장 신경 쓰이는 것은?",
    options: ["일/학업", "인간관계", "건강", "미래에 대한 걱정"]
  }
];

export function EmotionTestModal({ open, onClose }: EmotionTestModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // Test completed
      setTimeout(() => {
        handleClose();
      }, 500);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setAnswers([]);
    onClose();
  };

  const currentQuestion = questions[currentStep];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[350px] p-0 bg-transparent border-none shadow-none">
        <DialogTitle className="sr-only">감정 테스트</DialogTitle>
        <DialogDescription className="sr-only">간단한 질문에 답변하여 감정 상태를 파악해보세요</DialogDescription>
        <div className="bg-card rounded-3xl shadow-2xl border-4 border-accent/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6 border-b-2 border-accent/10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                <h3 className="text-accent">감정 테스트</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full hover:bg-accent/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>진행률</span>
                <span>{currentStep + 1} / {questions.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question */}
          <div className="p-6">
            <div className="mb-6">
              <div className="inline-block bg-accent/10 rounded-full px-4 py-1 mb-4">
                <span className="text-sm text-accent">질문 {currentStep + 1}</span>
              </div>
              <h4 className="leading-relaxed">{currentQuestion.question}</h4>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 rounded-2xl border-2 border-border bg-card hover:border-accent hover:bg-accent/5 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-accent/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-accent/0 group-hover:bg-accent"></div>
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="px-6 pb-6">
            <p className="text-xs text-center text-muted-foreground">
              답변은 AI 피드백 개선에만 사용돼요
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}