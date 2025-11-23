import { apiClient } from "./client";

export function login({ email, password }) {
  return apiClient("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function signup({
  email,
  password,
  nickname,
  feedbackStyle,
  notificationAm,
  notificationTime,
}) {
  return apiClient("/api/auth/signup", {
    method: "POST",
    body: {
      email,
      password,
      nickname,
      feedbackStyle,
      notificationAm,
      notificationTime,
    },
  });
}
