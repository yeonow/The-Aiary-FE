import { Card } from "./ui/card";
import { TrendingUp, Heart, Calendar, Lightbulb } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 감정 기록 빈도
const emotionFrequency = [
  { day: "월", count: 5 },
  { day: "화", count: 4 },
  { day: "수", count: 6 },
  { day: "목", count: 7 },
  { day: "금", count: 5 },
  { day: "토", count: 4 },
  { day: "일", count: 3 },
];

// 기분 분포
const moodDistribution = [
  { name: "행복", value: 14, color: "#8BC34A" },
  { name: "평온", value: 10, color: "#4CAF50" },
  { name: "설렘", value: 6, color: "#CDDC39" },
  { name: "불안", value: 4, color: "#FF7043" },
];

// 키워드
const keywords = [
  { word: "친구", count: 8 },
  { word: "일", count: 6 },
  { word: "음악", count: 5 },
];

export function WeeklyInsightsPage() {
  return (
    <div className="min-h-screen pb-24">
      <div
        className="p-6 space-y-5"
        style={{ maxWidth: "390px", margin: "0 auto" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-primary rounded-full p-5 mb-3 shadow-soft-lg">
            <TrendingUp className="w-8 h-8 text-primary-foreground" strokeWidth={2} />
          </div>
          <h2 className="text-primary mb-1">주간 분석</h2>
          <p className="text-sm text-muted-foreground">2024년 11월 15일 - 21일</p>
        </div>

        {/* Emotion Frequency Chart */}
        <Card className="p-6 rounded-2xl border shadow-soft-lg">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" strokeWidth={2} />
            <h4 className="text-primary font-medium">감정 기록 빈도</h4>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={emotionFrequency}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8D4A0" />
                  <stop offset="100%" stopColor="#D4E5B8" />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar
                dataKey="count"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <p className="text-xs text-center text-muted-foreground mt-3">
            이번 주 총 34번 감정을 기록했어요
          </p>
        </Card>

        {/* Mood Distribution */}
        <Card className="p-6 rounded-2xl border shadow-soft-lg">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-secondary-foreground" strokeWidth={2} />
            <h4 className="text-secondary-foreground font-medium">기분 분포</h4>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={moodDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {moodDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Keywords */}
        <Card className="p-6 rounded-2xl border shadow-soft-lg">
          <h4 className="mb-4 text-accent-foreground font-medium">
            자주 등장한 주제
          </h4>

          <div className="space-y-3.5">
            {keywords.map((keyword, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {keyword.word}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {keyword.count}회
                  </span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(keyword.count / 8) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insight */}
        <Card className="p-6 rounded-2xl border bg-primary/10 shadow-soft-lg">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" strokeWidth={2} />
            <h4 className="text-primary font-medium">AI 인사이트</h4>
          </div>

          <div className="bg-card rounded-xl p-5 border">
            <p className="text-sm text-foreground/90 leading-relaxed">
              이번 주는 대부분 행복하고 평온한 감정을 느끼셨어요. 특히 사회적 관계가
              당신의 행복에 큰 역할을 하고 있네요. 감정의 균형이 좋아지고 있고,
              작은 순간들에서 기쁨을 찾고 계세요.  
              우정을 계속 가꾸어가세요—긍정적인 에너지의 큰 원천이에요! 💚
            </p>
          </div>
        </Card>

        {/* Weekly Summary */}
        <Card className="p-5 rounded-2xl border bg-secondary/10 shadow-soft-lg">
          <h4 className="mb-4 text-secondary-foreground font-medium text-center">
            주간 요약
          </h4>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-card rounded-xl p-4 border">
              <p className="text-2xl text-primary mb-1 font-semibold">34</p>
              <p className="text-xs text-muted-foreground">감정 기록</p>
            </div>

            <div className="bg-card rounded-xl p-4 border">
              <p className="text-2xl text-secondary-foreground mb-1 font-semibold">5</p>
              <p className="text-xs text-muted-foreground">일기 작성</p>
            </div>

            <div className="bg-card rounded-xl p-4 border">
              <p className="text-2xl text-accent-foreground mb-1 font-semibold">87%</p>
              <p className="text-xs text-muted-foreground">긍정 비율</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
