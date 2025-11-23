import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Smile,
  FileText,
} from "lucide-react";

import { EmotionStatsModal } from "./EmotionStatsModal";
import { DiaryDetailModal } from "./DiaryDetailModal";
import { ComprehensiveReportModal } from "./ComprehensiveReportModal";

// Mock data - 날짜별 일기 카테고리 아이콘
const diaryCategories = [
  { date: 15, category: "음악", icon: FileText, color: "#FFD6A5" },
  { date: 17, category: "책", icon: FileText, color: "#C1E1C1" },
  { date: 19, category: "메모", icon: FileText, color: "#FFB5E8" },
  { date: 20, category: "감정", icon: FileText, color: "#B5E8FF" },
  { date: 22, category: "기타", icon: FileText, color: "#E5D3FF" }
];

// Mock emotion data
const emotionData = [
  { date: 15, emotion: "행복", color: "#FFF4B3" },
  { date: 16, emotion: "평온", color: "#C4E5D4" },
  { date: 17, emotion: "설렘", color: "#FFE0A3" },
  { date: 18, emotion: "불안", color: "#D4C4E5" },
  { date: 19, emotion: "행복", color: "#FFF4B3" },
  { date: 20, emotion: "설렘", color: "#FFE0A3" }
];

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10)); // November 2024
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [showDiaryModal, setShowDiaryModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [activeTab, setActiveTab] = useState("diary");

  const monthName = currentMonth.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    if (activeTab === "emotion") setShowEmotionModal(true);
    else setShowDiaryModal(true);
  };

  const getEmotionForDate = (date) =>
    emotionData.find((e) => e.date === date);

  const getDiaryForDate = (date) =>
    diaryCategories.find((d) => d.date === date);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className="min-h-screen pb-24 w-full">
      <div className="p-6">
        <h2 className="text-primary mb-6 text-center">감정 캘린더</h2>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 gap-3 bg-muted/40 rounded-2xl p-1.5 h-14 border">
            <TabsTrigger
              value="diary"
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft text-sm transition-all"
            >
              <FileText className="w-4 h-4 mr-1.5" strokeWidth={2} />
              일기 & 피드백
            </TabsTrigger>

            <TabsTrigger
              value="emotion"
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft text-sm transition-all"
            >
              <Smile className="w-4 h-4 mr-1.5" strokeWidth={2} />
              감정 기록
            </TabsTrigger>
          </TabsList>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mt-6 mb-5">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-full hover:bg-primary/10">
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </Button>
            <h3 className="text-foreground">{monthName}</h3>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-full hover:bg-primary/10">
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>

          {/* ------------------- Diary Tab ------------------- */}
          <TabsContent value="diary" className="mt-0 space-y-5">
            <div className="min-h-[380px]">
              <Card className="rounded-2xl border p-4 shadow-soft bg-card">
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                    <div
                      key={day}
                      className={`text-center text-sm py-2 ${
                        idx === 0
                          ? "text-destructive/70"
                          : idx === 6
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {getDaysInMonth().map((day, index) => {
                    const diary = day ? getDiaryForDate(day) : null;
                    const IconComponent = diary?.icon;

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day)}
                        disabled={!day}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 text-sm transition-all ${
                          day
                            ? diary
                              ? "bg-primary/20 border-2 border-primary/50 hover:bg-primary/30 shadow-soft"
                              : "bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/30"
                            : ""
                        }`}
                      >
                        {day && (
                          <>
                            {IconComponent && (
                              <IconComponent className="w-4 h-4 text-primary" strokeWidth={2} />
                            )}
                            <span className={IconComponent ? "text-xs" : ""}>{day}</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <div className="h-4"></div>

              <Button
                onClick={() => setShowReportModal(true)}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft mt-6"
              >
                <FileText className="w-5 h-5 mr-2" strokeWidth={2} />
                종합 리포트 받기
              </Button>
            </div>
          </TabsContent>

          {/* ------------------- Emotion Tab ------------------- */}
          <TabsContent value="emotion" className="mt-0">
            <div className="min-h-[380px]">
              <Card className="rounded-2xl border p-4 shadow-soft bg-card">
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                    <div
                      key={day}
                      className={`text-center text-sm py-2 ${
                        idx === 0
                          ? "text-destructive/70"
                          : idx === 6
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {getDaysInMonth().map((day, index) => {
                    const emotion = day ? getEmotionForDate(day) : null;

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day)}
                        disabled={!day}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all ${
                          day
                            ? emotion
                              ? "text-foreground hover:opacity-80 shadow-soft border-2"
                              : "bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/30"
                            : ""
                        }`}
                        style={
                          emotion
                            ? { backgroundColor: emotion.color, borderColor: emotion.color }
                            : {}
                        }
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Legend */}
              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                <Legend color="#FFF4B3" label="행복" />
                <Legend color="#C4E5D4" label="평온" />
                <Legend color="#FFE0A3" label="설렘" />
                <Legend color="#D4C4E5" label="불안" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <EmotionStatsModal
        open={showEmotionModal}
        onClose={() => setShowEmotionModal(false)}
        date={selectedDate || 0}
      />

      <DiaryDetailModal
        open={showDiaryModal}
        onClose={() => setShowDiaryModal(false)}
        date={selectedDate || 0}
      />

      <ComprehensiveReportModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-full border" style={{ backgroundColor: color + "66", borderColor: color }}>
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-xs">{label}</span>
    </div>
  );
}
