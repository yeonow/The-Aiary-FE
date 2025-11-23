const BASE = "http://172.20.10.4:8080";

// 전체 목록 조회
export async function fetchDiaries() {
  const res = await fetch(`${BASE}/api/diaries`);
  if (!res.ok) throw new Error("Failed to fetch diaries");
  return await res.json();
}

// 생성 (여기서 AI 분석 결과도 함께 리턴됨!)
export async function createDiary(data) {
  const res = await fetch(`${BASE}/api/diaries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text();
    console.error("🔥 Server returned error:", msg);
    throw new Error("Failed to create diary");
  }
  return await res.json();
}

// 단일 조회
export async function getDiaryById(id) {
  const res = await fetch(`${BASE}/api/diaries/${id}`);
  if (!res.ok) {
    const err = await res.text();
    console.error("🔥 Diary API error:", err);
    throw new Error("Failed");
  }
  return await res.json();
}
