import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface EmotionStatsModalProps {
  open: boolean;
  onClose: () => void;
  date: number;
}

const emotionRecords = [
  { time: "09:30", emotion: "행복", reason: "맛있는 아침 식사", color: "#FFF4B3" },
  { time: "14:20", emotion: "평온", reason: "따뜻한 햇살", color: "#C4E5D4" },
  { time: "18:45", emotion: "행복", reason: "친구와 수다", color: "#FFF4B3" },
  { time: "21:00", emotion: "평온", reason: "음악 감상", color: "#C4E5D4" },
];

const chartData = [
  { name: "행복", value: 50, color: "#FFF4B3" },
  { name: "평온", value: 50, color: "#C4E5D4" },
];

export function EmotionStatsModal({ open, onClose, date }: EmotionStatsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[350px] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto"
      >
        <DialogTitle className="sr-only">감정 통계</DialogTitle>
        <DialogDescription className="sr-only">선택한 날짜의 감정 통계를 확인하세요</DialogDescription>
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
            
            <h3 className="text-primary">11월 {date}일</h3>
            <p className="text-sm text-muted-foreground mt-0.5">감정 통계</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Emotion Records */}
            <div>
              <h4 className="mb-3 font-medium">오늘의 감정 기록</h4>
              <div className="space-y-2.5">
                {emotionRecords.map((record, index) => (
                  <Card 
                    key={index}
                    className="p-4 rounded-xl border shadow-soft"
                    style={{ 
                      borderColor: `${record.color}80`,
                      backgroundColor: `${record.color}30`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground flex-shrink-0">
                        <Clock className="w-4 h-4" strokeWidth={2} />
                        <span>{record.time}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: record.color }}
                          ></div>
                          <span className="text-sm font-medium text-foreground">{record.emotion}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{record.reason}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chart */}
            <Card className="p-5 rounded-2xl border bg-primary/5 shadow-soft">
              <h4 className="mb-4 text-center font-medium text-primary">감정 분포</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
