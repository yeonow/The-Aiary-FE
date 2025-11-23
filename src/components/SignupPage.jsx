import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { User, Mail, Lock, Heart, Lightbulb, ArrowLeft } from "lucide-react";
import { signup } from "../api/auth";

export function SignupPage({ onSignup, onSignupWithTest, onBack }) {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedbackStyle, setFeedbackStyle] = useState("comfort");
  const [timeOfDay, setTimeOfDay] = useState("pm");
  const [notificationHour, setNotificationHour] = useState("9");
  const [notificationMinute, setNotificationMinute] = useState("00");

  const handleNext = () => {
    if (step === 1 && nickname && email && password && confirmPassword) {
      if (password === confirmPassword) {
        setStep(2);
      }
    }
  };

  const handleComplete = async () => {
    const hour = String(notificationHour).padStart(2, "0");
    const minute = String(notificationMinute).padStart(2, "0");
    const notificationTime = `${hour}:${minute}`;
    const notificationAm = timeOfDay === "am";
    try {
      await signup({
        email,
        password,
        nickname,
        feedbackStyle,
        notificationAm,
        notificationTime,
      });
      alert("회원가입이 완료되었습니다!");
      onSignup();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 w-full">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={step === 1 ? onBack : () => setStep(1)}
          className="rounded-full hover:bg-primary/10"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
        </Button>
        <h2 className="flex-1 text-center text-primary">회원가입</h2>
        <div className="w-10" />
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        <div
          className={`h-2 rounded-full transition-all ${
            step === 1 ? "bg-primary w-8" : "bg-muted w-2"
          }`}
        ></div>
        <div
          className={`h-2 rounded-full transition-all ${
            step === 2 ? "bg-primary w-8" : "bg-muted w-2"
          }`}
        ></div>
      </div>

      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <Card className="p-6 rounded-2xl shadow-soft-lg border bg-card">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nickname">닉네임</Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                    strokeWidth={2}
                  />
                  <Input
                    id="nickname"
                    placeholder="이름을 입력해주세요"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                    strokeWidth={2}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                    strokeWidth={2}
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                    strokeWidth={2}
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 rounded-xl h-12"
                  />
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-soft mt-4"
              >
                다음
              </Button>
            </div>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <Card className="p-6 rounded-2xl shadow-soft-lg border bg-card mb-4">
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">AI 피드백 스타일</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFeedbackStyle("COMFORT")}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      feedbackStyle === "COMFORT"
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <Heart
                      className="w-7 h-7 mx-auto mb-2 text-primary"
                      strokeWidth={2}
                    />
                    <p className="text-sm font-medium">위로</p>
                  </button>
                  <button
                    onClick={() => setFeedbackStyle("REALITY")}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      feedbackStyle === "REALITY"
                        ? "border-secondary bg-secondary/10"
                        : "border-border bg-card"
                    }`}
                  >
                    <Lightbulb
                      className="w-7 h-7 mx-auto mb-2 text-secondary-foreground"
                      strokeWidth={2}
                    />
                    <p className="text-sm font-medium">조언</p>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>일일 알림 시간</Label>

                {/* AM/PM Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setTimeOfDay("am")}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                      timeOfDay === "am"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    }`}
                  >
                    오전
                  </button>
                  <button
                    onClick={() => setTimeOfDay("pm")}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                      timeOfDay === "pm"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    }`}
                  >
                    오후
                  </button>
                </div>

                {/* Time Input */}
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={notificationHour}
                    onChange={(e) => setNotificationHour(e.target.value)}
                    className="flex-1 rounded-xl h-12 text-center"
                    placeholder="00"
                  />
                  <span className="text-lg">:</span>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={notificationMinute}
                    onChange={(e) => setNotificationMinute(e.target.value)}
                    className="flex-1 rounded-xl h-12 text-center"
                    placeholder="00"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 rounded-2xl shadow-soft border bg-accent/10 mb-5">
            <div className="text-center">
              <p className="text-sm mb-5 leading-relaxed">
                로그인 후 심리 테스트를 하면
                <br />더 맞춤형 AI 피드백을 받을 수 있어요
              </p>
            </div>
          </Card>
          <Button
            onClick={handleComplete}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-soft mt-4"
          >
            설정완료
          </Button>
        </div>
      )}
    </div>
  );
}
