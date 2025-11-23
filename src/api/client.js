import { API_BASE_URL } from "./config";

export async function apiClient(
  path,
  { method = "GET", body, headers = {} } = {}
) {
  const res = await fetch(API_BASE_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch (_) {}

    if (res.status === 401) {
      throw new Error(
        "로그인에 실패했습니다.\n이메일 또는 비밀번호를 확인해주세요"
      );
    }
    throw new Error(errorData.detail || `요청 실패 (${res.status})`);
  }
  return res.json();
}
