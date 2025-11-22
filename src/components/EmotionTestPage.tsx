import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Brain, Heart, TrendingUp, Activity, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

// 테스트 목록 데이터
const testList = [
  {
    id: "emotional-stability",
    title: "감정 안정성 테스트",
    description: "당신의 감정 조절 능력과 안정성을 측정합니다",
    icon: Heart,
    color: "from-pink-400/20 to-rose-400/20",
    borderColor: "border-pink-400/40",
  },
  {
    id: "stress-level",
    title: "스트레스 지수 테스트",
    description: "현재 경험하고 있는 스트레스 수준을 확인합니다",
    icon: Activity,
    color: "from-orange-400/20 to-amber-400/20",
    borderColor: "border-orange-400/40",
  },
  {
    id: "resilience",
    title: "회복탄력성 테스트",
    description: "어려움을 극복하는 당신의 회복력을 평가합니다",
    icon: TrendingUp,
    color: "from-primary/20 to-green-400/20",
    borderColor: "border-primary/40",
  },
  {
    id: "energy-level",
    title: "에너지 레벨 측정",
    description: "일상생활에서의 에너지와 활력도를 체크합니다",
    icon: Zap,
    color: "from-yellow-400/20 to-amber-400/20",
    borderColor: "border-yellow-400/40",
  },
  {
    id: "cognitive-function",
    title: "인지 기능 테스트",
    description: "집중력과 사고력의 현재 상태를 평가합니다",
    icon: Brain,
    color: "from-purple-400/20 to-violet-400/20",
    borderColor: "border-purple-400/40",
  },
];

// 샘플 질문 데이터 (감정 안정성 테스트)
const sampleQuestions = [
  {
    id: 1,
    question: "갑자기 계획이 바뀌어도 크게 동요하지 않는 편이다",
    options: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
  },
  {
    id: 2,
    question: "스트레스를 받아도 빠르게 회복하는 편이다",
    options: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
  },
  {
    id: 3,
    question: "부정적인 감정을 잘 조절할 수 있다",
    options: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
  },
  {
    id: 4,
    question: "감정 기복이 심하지 않은 편이다",
    options: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
  },
  {
    id: 5,
    question: "어려운 상황에서도 침착함을 유지한다",
    options: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
  },
];

export function EmotionTestPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [previousResults, setPreviousResults] = useState([
    { date: "2024년 11월 10일", score: 72, level: "양호" },
    { date: "2024년 10월 25일", score: 68, level: "보통" },
  ]);

  const handleTestSelect = (testId: string) => {
    setSelectedTest(testId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < sampleQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const handleRetry = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    return Math.round((total / (sampleQuestions.length * 4)) * 100);
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return "매우 양호";
    if (score >= 60) return "양호";
    if (score >= 40) return "보통";
    if (score >= 20) return "주의 필요";
    return "관리 필요";
  };

  // Test List View
  if (!selectedTest) {
    return (
      <div className="min-h-screen pb-24 w-full">
        <div className="p-6">
          <h2 className="text-primary mb-2 text-center">심리 테스트</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            원하는 테스트를 선택해주세요
          </p>

          <div className="space-y-4">
            {testList.map((test) => {
              const IconComponent = test.icon;
              return (
                <Card
                  key={test.id}
                  onClick={() => handleTestSelect(test.id)}
                  className={`p-5 rounded-2xl border-2 ${test.borderColor} bg-gradient-to-br ${test.color} shadow-soft cursor-pointer transition-all hover:scale-[1.02] hover:shadow-soft-lg active:scale-[0.98]`}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-card rounded-xl p-3 shadow-soft">
                      <IconComponent className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1.5">{test.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {test.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary text-sm">
                        <span>시작하기</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Previous Results */}
          {previousResults.length > 0 && (
            <div className="mt-8">
              <h3 className="text-foreground mb-4">이전 기록</h3>
              <div className="space-y-3">
                {previousResults.map((result, idx) => (
                  <Card
                    key={idx}
                    className="p-4 rounded-xl border bg-muted/20 shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {result.date}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          감정 안정성 테스트
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-primary">
                          {result.score}점
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.level}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Result View
  if (showResult) {
    const score = calculateScore();
    const level = getScoreLevel(score);

    return (
      <div className="min-h-screen pb-24 w-full">
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={2} />
            </div>
            <h2 className="text-primary mb-2">테스트 완료</h2>
            <p className="text-sm text-muted-foreground">
              {testList.find((t) => t.id === selectedTest)?.title}
            </p>
          </div>

          {/* Score Card */}
          <Card className="p-8 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/20 to-yellow-100/40 shadow-soft-lg mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">종합 점수</p>
              <div className="text-5xl font-bold text-primary mb-2">{score}</div>
              <div className="inline-block px-4 py-2 rounded-full bg-card shadow-soft">
                <span className="text-sm font-medium text-foreground">{level}</span>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-5 rounded-2xl border bg-card shadow-soft mb-6">
            <h3 className="text-foreground mb-3">결과 요약</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              {score >= 60
                ? "감정 조절 능력이 양호한 편입니다. 대부분의 상황에서 안정적으로 감정을 다룰 수 있는 것으로 보입니다. 이러한 강점을 유지하면서 가끔씩 자신을 돌아보는 시간을 가지세요."
                : "감정 관리에 어려움을 느끼고 계신 것 같습니다. 스트레스 관리와 감정 조절 연습이 도움이 될 수 있습니다. 전문가의 도움을 받는 것도 좋은 방법입니다."}
            </p>
            <div className="bg-muted/40 rounded-xl p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">추천 활동</h4>
              <ul className="space-y-1.5 text-sm text-foreground/80">
                <li>• 매일 5분 호흡 명상 실천하기</li>
                <li>• 감정 일기 꾸준히 작성하기</li>
                <li>• 규칙적인 운동으로 스트레스 해소하기</li>
              </ul>
            </div>
          </Card>

          {/* Previous Results */}
          {previousResults.length > 0 && (
            <div className="mb-6">
              <h3 className="text-foreground mb-4">이전 기록</h3>
              <div className="space-y-3">
                {previousResults.map((result, idx) => (
                  <Card
                    key={idx}
                    className="p-4 rounded-xl border bg-muted/20 shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {result.date}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {result.level}
                        </p>
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {result.score}점
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-soft"
            >
              다른 테스트 하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Test Question View
  const currentQ = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <div className="min-h-screen pb-24 w-full">
      <div className="p-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              질문 {currentQuestion + 1} / {sampleQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-6 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-yellow-100/20 shadow-soft-lg mb-8">
          <h3 className="text-foreground leading-relaxed">{currentQ.question}</h3>
        </Card>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              variant="outline"
              className={`w-full h-14 rounded-xl border-2 hover:border-primary hover:bg-primary/10 text-left justify-start transition-all ${
                answers[currentQuestion] === index
                  ? "border-primary bg-primary/20"
                  : "border-border"
              }`}
            >
              <span className="flex-1">{option}</span>
              {answers[currentQuestion] === index && (
                <CheckCircle2 className="w-5 h-5 text-primary ml-2" strokeWidth={2} />
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
