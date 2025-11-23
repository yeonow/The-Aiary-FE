import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Sparkles } from "lucide-react";
import { generateQuestions } from "../api/testApi";
import { submitTest } from "../api/testApi";

export function EmotionTestModal({ open, onClose, testCode }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  // 🔥 질문 생성 API 호출
  useEffect(() => {
    if (!open) return;

    async function load() {
      setLoading(true);

      try {
        const res = await generateQuestions(testCode, 5);

        // 서버 응답이 ["Q1", "Q2"] 형태라면 변환
        const parsed = res.questions.map(q => ({
          question: q,
          options: ["전혀 아니다", "아니다", "그렇다", "매우 그렇다"]
        }));

        setQuestions(parsed);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    load();
  }, [open, testCode]);

  const handleClose = () => {
    setCurrentStep(0);
    setAnswers([]);
    onClose();
  };

  // 🔥 ★ 최종: 마지막 질문에서 submitTest 자동 호출
  const handleAnswer = async (index) => {
    const newAns = [...answers];
    newAns[currentStep] = index;
    setAnswers(newAns);

    if (currentStep < questions.length - 1) {
      // 다음 질문 이동
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // ===============================
      // 🔥 마지막 질문: 서버로 제출하기
      // ===============================

      // 점수 계산 방식: index 합산
      const score = newAns.reduce((acc, cur) => acc + cur, 0);

      // summary (원하면 변경 가능)
      const summary = "감정 테스트가 정상적으로 제출되었습니다.";

      try {
        await submitTest(testCode, score, summary);
        console.log("Submit success");
      } catch (error) {
        console.error("Submit failed:", error);
      }

      setTimeout(() => {
        handleClose();
      }, 500);
    }
  };

  // 로딩 화면
  if (loading) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="p-6 text-center">
          <p className="text-primary">질문 생성 중...</p>
        </DialogContent>
      </Dialog>
    );
  }

  const currentQ = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[350px] p-0 bg-transparent border-none">
        <div className="bg-card rounded-3xl shadow-xl border-4 border-accent/30 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6 border-b-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <h3 className="text-accent">감정 테스트</h3>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>진행률</span>
              <span>{currentStep + 1} / {questions.length}</span>
            </div>

            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="p-6">
            <span className="inline-block bg-accent/10 px-4 py-1 rounded-full text-sm text-accent">
              질문 {currentStep + 1}
            </span>
            <h4 className="mt-3 leading-relaxed">{currentQ.question}</h4>

            <div className="space-y-3 mt-6">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="group w-full p-4 rounded-2xl border-2 hover:border-accent hover:bg-accent/5 transition-all text-left"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-center pb-4 text-muted-foreground">
            답변은 AI 개선에만 사용됩니다
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
