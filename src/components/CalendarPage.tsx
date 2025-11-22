import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight, Smile, FileText, MessageCircle, BookOpen, Music, Heart, File } from "lucide-react";
import { EmotionStatsModal } from "./EmotionStatsModal";
import { DiaryDetailModal } from "./DiaryDetailModal";
import { ComprehensiveReportModal } from "./ComprehensiveReportModal";

// Mock data - 날짜별 일기 카테고리 아이콘
const diaryCategories = [
  { date: 15, category: "friends", icon: MessageCircle, color: "#FFF4B3" },
  { date: 17, category: "study", icon: BookOpen, color: "#C4E5D4" },
  { date: 19, category: "music", icon: Music, color: "#FFE0A3" },
  { date: 20, category: "emotion", icon: Heart, color: "#E5B3C4" },
  { date: 22, category: "general", icon: File, color: "#D4C4E5" },
];

// Mock emotion data
const emotionData = [
  { date: 15, emotion: "happy", color: "#FFF4B3" },
  { date: 16, emotion: "calm", color: "#C4E5D4" },
  { date: 17, emotion: "excited", color: "#FFE0A3" },
  { date: 18, emotion: "anxious", color: "#D4C4E5" },
  { date: 19, emotion: "happy", color: "#FFF4B3" },
  { date: 20, emotion: "calm", color: "#C4E5D4" },
];

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10)); // November 2024
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [showDiaryModal, setShowDiaryModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [activeTab, setActiveTab] = useState("diary"); // 기본 탭

  const monthName = currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateClick = (date: number | null) => {
    if (!date) return;
    setSelectedDate(date);
    if (activeTab === "emotion") {
      setShowEmotionModal(true);
    } else {
      setShowDiaryModal(true);
    }
  };

  const getEmotionForDate = (date: number) => {
    return emotionData.find(e => e.date === date);
  };

  const getDiaryForDate = (date: number) => {
    return diaryCategories.find(d => d.date === date);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={prevMonth}
              className="rounded-full hover:bg-primary/10"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </Button>
            <h3 className="text-foreground">{monthName}</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={nextMonth}
              className="rounded-full hover:bg-primary/10"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>

          <TabsContent value="diary" className="mt-0 space-y-5">
            {/* Fixed height container to prevent layout shift */}
            <div className="min-h-[380px]">
              <Card className="rounded-2xl border p-4 shadow-soft bg-card">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                    <div key={day} className={`text-center text-sm py-2 ${idx === 0 ? 'text-destructive/70' : idx === 6 ? 'text-primary' : 'text-muted-foreground'}`}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days - 날짜 안에 아이콘만 표시 */}
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
                              ? 'bg-primary/20 border-2 border-primary/50 hover:bg-primary/30 shadow-soft'
                              : 'bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/30'
                            : ''
                        }`}
                      >
                        {day && (
                          <>
                            {IconComponent && (
                              <IconComponent className="w-4 h-4 text-primary" strokeWidth={2} />
                            )}
                            <span className={IconComponent ? 'text-xs' : ''}>{day}</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* 달력과 버튼 사이 여백 추가 (16px) */}
              <div className="h-4"></div>

              {/* Comprehensive Report Button */}
              <Button
                onClick={() => setShowReportModal(true)}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-400/90 text-primary-foreground shadow-soft-lg"
              >
                <FileText className="w-5 h-5 mr-2" strokeWidth={2} />
                종합 리포트 받기
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="emotion" className="mt-0">
            {/* Fixed height container matching diary tab */}
            <div className="min-h-[380px]">
              <Card className="rounded-2xl border p-4 shadow-soft bg-card">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                    <div key={day} className={`text-center text-sm py-2 ${idx === 0 ? 'text-destructive/70' : idx === 6 ? 'text-primary' : 'text-muted-foreground'}`}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1.5">
                  {getDaysInMonth().map((day, index) => {
                    const emotionInfo = day ? getEmotionForDate(day) : null;
                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day)}
                        disabled={!day}
                        className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all ${
                          day
                            ? emotionInfo
                              ? 'text-foreground hover:opacity-80 shadow-soft border-2'
                              : 'bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/30'
                            : ''
                        }`}
                        style={emotionInfo ? {
                          backgroundColor: emotionInfo.color,
                          borderColor: emotionInfo.color
                        } : undefined}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Legend */}
              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-happy/40 rounded-full border border-happy/50">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFF4B3" }}></div>
                  <span className="text-xs">행복</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-calm/40 rounded-full border border-calm/50">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#C4E5D4" }}></div>
                  <span className="text-xs">평온</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-excited/40 rounded-full border border-excited/50">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFE0A3" }}></div>
                  <span className="text-xs">설렘</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-anxious/40 rounded-full border border-anxious/50">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#D4C4E5" }}></div>
                  <span className="text-xs">불안</span>
                </div>
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