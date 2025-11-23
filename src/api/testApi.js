const BASE_URL = "http://172.20.10.4:8080/api/tests"
export async function fetchTests() {
  const res = await fetch(BASE_URL);

  console.log("HTTP STATUS:", res.status, res.statusText);

  if (!res.ok) {
    throw new Error("Failed to fetch tests");
  }

  return await res.json();
}

export async function fetchTestDetail(testId){
    const res = await fetch(`${BASE_URL}/${testId}`);
    return res.json();
}

export async function fetchTestHistory(testCode) {
  const url = `${BASE_URL}/history?testCode=${testCode}`;
  console.log("Request URL:", url);

  const res = await fetch(url);

  console.log("HTTP STATUS:", res.status, res.statusText);

  const data = await res.json();
  console.log("HISTORY RESPONSE:", data);

  return data;

}

export async function generateQuestions(testCode, count) {
  const url = `${BASE_URL}/generate-questions?testCode=${testCode}&count=${count}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) throw new Error("Failed to generate questions");

  return res.json();  // { questions: [...] }
}

export async function submitTest(testCode, score, summary) {
  const url = `${BASE_URL}/api/tests/submit`;

  const body = {
    testCode: testCode,
    score: score,
    summary: summary
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error("submit API 요청 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("submitTest 에러:", error);
    throw error;
  }
}