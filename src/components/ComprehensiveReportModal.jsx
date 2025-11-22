import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X, Calendar, TrendingUp, Heart, Lightbulb, ArrowRight } from "lucide-react";
import { Calendar } from "./ui/calendar";

//interface ComprehensiveReportModalProps {
//  open: boolean;
//  onClose: () => void;
//}

export function ComprehensiveReportModal({ open, onClose }) {
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [showReport, setShowReport] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      setShowReport(true);
    }
  };

  const handleReset = () => {
    setShowReport(false);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleStartDateSelect = ( date) => {
    setStartDate(date);
    setShowStartCalendar(false);
  };

  const handleEndDateSelect = ( date) => {
    setEndDate(date);
    setShowEndCalendar(false);
  };

  const formatDate = ( date) => {
    if (!date) return "날짜 선택";
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month, day);
  };

  // Report View
  if (showReport) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-[350px] w-[calc(100%-2rem)] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto"
        >
          <DialogTitle className="sr-only">종합 리포트</DialogTitle>
          <DialogDescription className="sr-only">선택한 기간의 종합 분석 리포트입니다</DialogDescription>
          <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary/20 to-yellow-100/40 p-6 border-b relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full hover:bg-primary/10"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </Button>
              
              <h3 className="text-primary mb-2">종합 리포트</h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(startDate)} - {formatDate(endDate)}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 rounded-xl border bg-primary/10 text-center shadow-soft">
                  <div className="text-2xl font-semibold text-primary mb-1">22</div>
                  <div className="text-xs text-muted-foreground">총 일기 수</div>
                </Card>
                <Card className="p-4 rounded-xl border bg-yellow-100/50 text-center shadow-soft">
                  <div className="text-2xl font-semibold text-primary mb-1">18</div>
                  <div className="text-xs text-muted-foreground">감정 기록</div>
                </Card>
              </div>

              {/* Main Emotion Trend */}
              <Card className="p-5 rounded-xl border bg-primary/10 shadow-soft">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" strokeWidth={2} />
                  <h4 className="text-primary font-medium">감정 트렌드</h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  이 기간 동안 전반적으로 <strong>평온하고 긍정적인 감정</strong>이 주를 이뤘어요. 
                  특히 친구들과의 교류가 많았던 시기였네요.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="px-3 py-1.5 bg-card rounded-full text-xs">행복 35%</div>
                  <div className="px-3 py-1.5 bg-card rounded-full text-xs">평온 40%</div>
                  <div className="px-3 py-1.5 bg-card rounded-full text-xs">걱정 15%</div>
                  <div className="px-3 py-1.5 bg-card rounded-full text-xs">기타 10%</div>
                </div>
              </Card>

              {/* Key Insights */}
              <Card className="p-5 rounded-xl border bg-muted/20 shadow-soft">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-primary" strokeWidth={2} />
                  <h4 className="font-medium text-foreground">주요 발견</h4>
                </div>
                <ul className="space-y-2.5 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>친구와의 만남이 감정에 긍정적인 영향을 줬어요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>음악 감상이 스트레스 해소에 도움이 되었어요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>주말보다 평일에 더 활동적이었네요</span>
                  </li>
                </ul>
              </Card>

              {/* AI Recommendation */}
              <Card className="p-5 rounded-xl border bg-muted/20 shadow-soft">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-primary" strokeWidth={2} />
                  <h4 className="font-medium text-foreground">AI 추천</h4>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  계속해서 소중한 사람들과의 시간을 유지하세요. 
                  또한 음악을 통한 감정 조절 방법도 효과적이니 앞으로도 활용해보세요. 
                  가끔은 새로운 취미 활동을 시도해보는 것도 좋을 것 같아요!
                </p>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 space-y-3">
              <Button 
                onClick={handleReset}
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-primary hover:bg-primary/10"
              >
                다른 기간 분석하기
              </Button>
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

  // Calendar Popup for Start Date
  if (showStartCalendar) {
    return (
      <Dialog open={open} onOpenChange={() => setShowStartCalendar(false)}>
        <DialogContent 
          className="max-w-[350px] w-[calc(100%-2rem)] p-0 bg-transparent border-none shadow-none"
        >
          <DialogTitle className="sr-only">시작일 선택</DialogTitle>
          <DialogDescription className="sr-only">시작일을 선택하세요</DialogDescription>
          <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
            <div className="bg-primary/10 p-5 border-b relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowStartCalendar(false)}
                className="absolute top-4 right-4 rounded-full hover:bg-primary/10"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </Button>
              <h3 className="text-primary">시작일 선택</h3>
            </div>
            <div className="p-6">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateSelect}
                className="rounded-lg mx-auto"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Calendar Popup for End Date
  if (showEndCalendar) {
    return (
      <Dialog open={open} onOpenChange={() => setShowEndCalendar(false)}>
        <DialogContent 
          className="max-w-[350px] w-[calc(100%-2rem)] p-0 bg-transparent border-none shadow-none"
        >
          <DialogTitle className="sr-only">종료일 선택</DialogTitle>
          <DialogDescription className="sr-only">종료일을 선택하세요</DialogDescription>
          <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
            <div className="bg-primary/10 p-5 border-b relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEndCalendar(false)}
                className="absolute top-4 right-4 rounded-full hover:bg-primary/10"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </Button>
              <h3 className="text-primary">종료일 선택</h3>
            </div>
            <div className="p-6">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateSelect}
                className="rounded-lg mx-auto"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Date Selection View (Initial)
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[350px] w-[calc(100%-2rem)] p-0 bg-transparent border-none shadow-none"
      >
        <DialogTitle className="sr-only">기간 선택</DialogTitle>
        <DialogDescription className="sr-only">종합 리포트를 받을 기간을 선택하세요</DialogDescription>
        <div className="bg-card rounded-2xl shadow-soft-lg border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary/20 to-yellow-100/40 p-6 border-b relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full hover:bg-primary/10"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </Button>
            
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-5 h-5 text-primary" strokeWidth={2} />
              <h3 className="text-primary">기간 선택</h3>
            </div>
            <p className="text-sm text-muted-foreground">분석할 기간을 선택해주세요</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Start Date Button */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">시작일</label>
              <Button
                onClick={() => setShowStartCalendar(true)}
                variant="outline"
                className="w-full h-14 rounded-xl border-2 hover:border-primary hover:bg-primary/10 justify-between text-left"
              >
                <span className={startDate ? "text-foreground" : "text-muted-foreground"}>
                  {formatDate(startDate)}
                </span>
                <CalendarIcon className="w-5 h-5 text-primary" strokeWidth={2} />
              </Button>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-2">
              <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" strokeWidth={2} />
            </div>

            {/* End Date Button */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">종료일</label>
              <Button
                onClick={() => setShowEndCalendar(true)}
                variant="outline"
                className="w-full h-14 rounded-xl border-2 hover:border-primary hover:bg-primary/10 justify-between text-left"
              >
                <span className={endDate ? "text-foreground" : "text-muted-foreground"}>
                  {formatDate(endDate)}
                </span>
                <CalendarIcon className="w-5 h-5 text-primary" strokeWidth={2} />
              </Button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="px-6 pb-6 pt-2">
            <Button 
              onClick={handleGenerateReport}
              disabled={!startDate || !endDate}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-soft transition-all"
            >
              {startDate && endDate ? "분석하기" : "날짜를 선택해주세요"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
