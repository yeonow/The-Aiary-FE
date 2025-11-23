import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Clover, Mail, Lock } from "lucide-react";
import { login } from "../api/auth";

//interface LoginPageProps {
//  onLogin: () => void;
//  onSignup: () => void;
//}

export function LoginPage({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const data = await login({ email, password });
      console.log("로그인 성공 응답", data);

      localStorage.setItem("email", email);

      alert("로그인에 성공했습니다 !");

      if (onLogin) {
        onLogin(data);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6 w-full">
      {/* Logo / Brand */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
          <Clover className="w-10 h-10 text-primary" strokeWidth={2} />
        </div>
        <h1 className="text-primary mb-2">감정 일기</h1>
        <p className="text-muted-foreground">당신의 마음을 기록하세요</p>
      </div>

      <Card className="w-full p-6 rounded-2xl shadow-soft-lg border border-border bg-card">
        <div className="space-y-5">
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
                className="pl-10 rounded-xl border h-12"
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
                className="pl-10 rounded-xl border h-12"
              />
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft mt-6"
          >
            로그인
          </Button>
        </div>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-3">계정이 없으신가요?</p>
        <Button
          variant="ghost"
          onClick={onSignup}
          className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-xl px-6"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
