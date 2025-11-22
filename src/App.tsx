import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { MainPage } from "./components/MainPage";
import { CalendarPage } from "./components/CalendarPage";
import { EmotionTestPage } from "./components/EmotionTestPage";
import { BottomNav } from "./components/BottomNav";

type Screen = "login" | "signup" | "main";
type Tab = "home" | "calendar" | "test";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [nickname, setNickname] = useState("Alex");

  const handleLogin = () => {
    setNickname("Alex");
    setCurrentScreen("main");
  };

  const handleSignup = () => {
    setNickname("Alex");
    setCurrentScreen("main");
  };

  const handleSignupWithTest = () => {
    setNickname("Alex");
    setCurrentScreen("main");
    setActiveTab("test");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
    setActiveTab("home");
  };

  // Render login/signup screens
  if (currentScreen === "login") {
    return (
      <div className="app-container min-h-screen bg-background">
        <LoginPage 
          onLogin={handleLogin}
          onSignup={() => setCurrentScreen("signup")}
        />
      </div>
    );
  }

  if (currentScreen === "signup") {
    return (
      <div className="app-container min-h-screen bg-background">
        <SignupPage 
          onSignup={handleSignup}
          onSignupWithTest={handleSignupWithTest}
          onBack={() => setCurrentScreen("login")}
        />
      </div>
    );
  }

  // Render main app with bottom navigation
  return (
    <div className="app-container min-h-screen bg-background">
      {activeTab === "home" && (
        <MainPage 
          nickname={nickname}
          onLogout={handleLogout}
        />
      )}

      {activeTab === "calendar" && (
        <CalendarPage />
      )}

      {activeTab === "test" && (
        <EmotionTestPage />
      )}

      <BottomNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}