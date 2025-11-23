import { useState, useEffect, useCallback } from "react";
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
import { fetchDiaries } from "../api/diaryApi";

// 감정 색상 매핑
const emotionColorMap = {
  행복: "#FFF4B3",
  평온: "#C4E5D4",
  설렘: "#FFE0A3",
  불안: "#D4C4E5",
};

// Mock emotion data (감정 탭용 - 아직은 더미)
const emotionData = [
  { date: 15, emotion: "행복", color: "#FFF4B3" },
  { date: 16, emotion: "평온", color: "#C4E5D4" },
  { date: 17, emotion: "설렘", color: "#FFE0A3" },
  { date: 18, emotion: "불안", color: "#D4C4E5" },
  { date: 19, emotion: "행복", color: "#FFF4B3" },
  { date: 20, emotion: "설렘", color: "#FFE0A3" },
];

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDiaryId, setSelectedDiaryId] = useState(null);

  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [showDiaryModal, setShowDiaryModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [activeTab, setActiveTab] = useState("diary");

  const [diaries, setDiaries] = useState([]);
  const [loadingDiaries, setLoadingDiaries] = useState(false);

  // 🔥 (1) 전체 일기 불러오는 함수 분리
  const loadDiaries = useCallback(async () => {
    setLoadingDiaries(true);
    try {
      const list = await fetchDiaries();
      setDiaries(list);
      console.log("📘 fetched diaries:", list);
    } catch (err) {
      console.error("캘린더 일기 불러오기 실패:", err);
    }
    setLoadingDiaries(false);
  }, []);

  // 🔥 (2) 페이지 처음 로드될 때 fetch
  useEffect(() => {
    loadDiaries();
  }, [loadDiaries]);

  // 🔥 (3) DiaryWriteModal에서 전송하는 이벤트를 감지 → 새로 fetch
  useEffect(() => {
    const handler = () => {
      console.log("📥 diary-created 이벤트 감지됨 → 재로딩");
      loadDiaries();
    };

    window.addEventListener("diary-created", handler);
    return () => window.removeEventListener("diary-created", handler);
  }, [loadDiaries]);

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

  // 📌 createdAt 기반으로 날짜에 해당하는 일기 찾기
  const getDiaryForDate = (dateNum) => {
    if (!dateNum) return null;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;

    const target = `${year}-${String(month).padStart(2, "0")}-${String(
      dateNum
    ).padStart(2, "0")}`;

    return diaries.find((d) => d.createdAt?.startsWith(target));
  };

  const getEmotionForDate = (date) =>
    emotionData.find((e) => e.date === date);

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

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);

    if (activeTab === "emotion") {
      setShowEmotionModal(true);
    } else {
      const diary = getDiaryForDate(date);
      if (diary) {
        setSelectedDiaryId(diary.id);
        setShowDiaryModal(true);
      } else {
        console.log("📭 이 날짜에는 일기가 없습니다:", date);
      }
    }
  };

  return (
    <div className="min-h-screen pb-24 w-full">
      <div className="p-6">
        <h2 className="text-primary mb-6 text-center">감정 캘린더</h2>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 gap-3 bg-muted/40 rounded-2xl p-1.5 h-14 border">
            <TabsTrigger value="diary" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4 mr-1.5" />
              일기 & 피드백
            </TabsTrigger>

            <TabsTrigger value="emotion" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Smile className="w-4 h-4 mr-1.5" />
              감정 기록
            </TabsTrigger>
          </TabsList>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mt-6 mb-5">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-full hover:bg-primary/10">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h3 className="text-foreground">{monthName}</h3>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-full hover:bg-primary/10">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* ---------------- Diary Tab ---------------- */}
          <TabsContent value="diary" className="mt-0 space-y-5">
            <div className="min-h-[380px]">
              <Card className="rounded-2xl border p-4 shadow-soft bg-card">
                {loadingDiaries && (
                  <p className="text-center text-sm text-muted-foreground mb-3">
                    일기를 불러오는 중입니다...
                  </p>
                )}

                {/* 요일 */}
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

                {/* 날짜 */}
                <div className="grid grid-cols-7 gap-1.5">
                  {getDaysInMonth().map((day, index) => {
                    const diary = day ? getDiaryForDate(day) : null;

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
                            {diary && (
                              <FileText className="w-4 h-4 text-primary" />
                            )}
                            <span className={diary ? "text-xs" : ""}>{day}</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Button
                onClick={() => setShowReportModal(true)}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft mt-6"
              >
                <FileText className="w-5 h-5 mr-2" />
                종합 리포트 받기
              </Button>
            </div>
          </TabsContent>

          {/* ---------------- Emotion Tab ---------------- */}
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
                    const emotion = getEmotionForDate(day);
                    const bgColor = emotion?.color;

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
                            ? { backgroundColor: bgColor, borderColor: bgColor }
                            : {}
                        }
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ---------------- Modals ---------------- */}

      <EmotionStatsModal
        open={showEmotionModal}
        onClose={() => setShowEmotionModal(false)}
        date={selectedDate || 0}
      />

      <DiaryDetailModal
        open={showDiaryModal}
        onClose={() => setShowDiaryModal(false)}
        diaryId={selectedDiaryId}
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
    <div
      className="flex items-center gap-1.5 px-3 py-2 rounded-full border"
      style={{ backgroundColor: color + "66", borderColor: color }}
    >
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-xs">{label}</span>
    </div>
  );
}
