import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { User, Clover } from "lucide-react";
import { DiaryWriteModal } from "./DiaryWriteModal";
import { LetterFeedbackModal } from "./LetterFeedbackModal";
import { EmotionRecordModal } from "./EmotionRecordModal";
import { ProfileModal } from "./ProfileModal";

interface MainPageProps {
  nickname: string;
  onLogout: () => void;
}

export function MainPage({ nickname, onLogout }: MainPageProps) {
  const [showDiaryModal, setShowDiaryModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [showEmotionModal, setShowEmotionModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [savedDiaryContent, setSavedDiaryContent] = useState("");

  const handleDiarySaved = (content: string) => {
    setSavedDiaryContent(content);
    // Show letter feedback modal after diary is saved
    setTimeout(() => {
      setShowLetterModal(true);
    }, 300);
  };

  return (
    <div className="min-h-screen pb-24 w-full">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-8">
        <div className="flex items-center gap-2">
          <Clover className="w-7 h-7 text-primary" strokeWidth={2} />
          <h3 className="text-primary">감정 일기</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setShowProfileModal(true)}
          className="rounded-full hover:bg-primary/10"
        >
          <User className="w-5 h-5" strokeWidth={2} />
        </Button>
      </div>

      {/* Greeting */}
      <div className="px-6 mb-12">
        <h2 className="text-foreground mb-1">안녕하세요, {nickname}님</h2>
        <p className="text-muted-foreground">오늘의 일기를 작성해볼까요?</p>
      </div>

      {/* Diary Book Illustration */}
      <div className="px-6 mb-12">
        <div 
          onClick={() => setShowDiaryModal(true)}
          className="cursor-pointer transform transition-all hover:scale-105 active:scale-95"
        >
          <Card className="relative mx-auto max-w-[280px] h-72 rounded-3xl bg-gradient-to-br from-primary/80 to-primary shadow-soft-lg overflow-hidden border-2 border-primary/40">
            {/* Diary cover design */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {/* Decorative clover at top */}
              <div className="mb-6">
                <Clover className="w-12 h-12 text-primary-foreground/30" strokeWidth={1.5} />
              </div>
              
              {/* Diary title */}
              <div className="text-center mb-8">
                <h3 className="text-primary-foreground mb-2 font-semibold">My Diary</h3>
                <div className="h-px w-24 bg-primary-foreground/20 mx-auto"></div>
              </div>
              
              {/* Decorative lines */}
              <div className="space-y-2 w-full max-w-[180px]">
                <div className="h-px bg-primary-foreground/10"></div>
                <div className="h-px bg-primary-foreground/10"></div>
                <div className="h-px bg-primary-foreground/10"></div>
              </div>
            </div>
            
            {/* Page edge effect */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-primary-foreground/5"></div>
          </Card>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">일기장을 눌러 오늘의 이야기를 적어보세요</p>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="px-6">
        <Button
          onClick={() => setShowEmotionModal(true)}
          className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft-lg text-lg"
        >
          감정 기록하기
        </Button>
      </div>

      {/* Modals */}
      <DiaryWriteModal
        open={showDiaryModal}
        onClose={() => setShowDiaryModal(false)}
        onSaved={handleDiarySaved}
      />

      <LetterFeedbackModal
        open={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        diaryContent={savedDiaryContent}
      />

      <EmotionRecordModal
        open={showEmotionModal}
        onClose={() => setShowEmotionModal(false)}
      />

      <ProfileModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        nickname={nickname}
        onLogout={onLogout}
      />
    </div>
  );
}