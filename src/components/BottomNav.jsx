import { Heart, Calendar, Sparkles } from "lucide-react";

export function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: "home", icon: Heart, label: "감정 기록" },
    { id: "calendar", icon: Calendar, label: "캘린더" },
    { id: "test", icon: Sparkles, label: "감정 테스트" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-transparent z-50">
      <div className="w-full bg-card border-t border-border shadow-soft-lg">
        <div className="flex justify-around items-center h-20 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center gap-1.5 transition-all ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-all ${
                    isActive ? "bg-primary" : "bg-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                    strokeWidth={2}
                  />
                </div>
                <span
                  className={`text-xs ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
