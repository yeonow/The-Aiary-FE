import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { fetchTests, fetchTestHistory } from "../api/testApi";
import { EmotionTestModal } from "./EmotionTestModal";

export function EmotionTestPage() {
  const [testList, setTestList] = useState([]);
  const [history, setHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  // 테스트 목록 불러오기
  useEffect(() => {
    fetchTests().then(setTestList);
  }, []);

  // 테스트 선택
  const handleSelect = async (test) => {
    setSelectedCode(test.code); // ⭐ code 전달
    setOpenModal(true);

    // 히스토리 조회
    const h = await fetchTestHistory(test.code);
    const formatted = h.map(item => ({
      date: item.createdAt.split("T")[0],
      title: item.test.title,
      score: item.score,
      level: item.summary
    }));

    setHistory(formatted);
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-center text-primary">심리 테스트</h2>
      <p className="text-center text-muted-foreground">
        원하는 테스트를 선택해주세요
      </p>

      {/* 테스트 목록 */}
      <div className="space-y-4">
        {testList.map(test => (
          <Card
            key={test.code}
            onClick={() => handleSelect(test)}
            className="p-5 rounded-2xl border cursor-pointer hover:bg-muted"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-medium">{test.title}</h3>
                <p className="text-sm text-muted-foreground">{test.description}</p>
              </div>
              <ArrowRight />
            </div>
          </Card>
        ))}
      </div>

      {/* 이전 기록 */}
      {history.length > 0 && (
        <div className="mt-8">
          <h3 className="text-foreground mb-4">이전 기록</h3>

          <div className="space-y-3">
            {history.map((item, idx) => (
              <Card key={idx} className="p-4 rounded-xl bg-muted/20 border">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                    <p className="font-medium">{item.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">{item.score}점</p>
                   
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 모달 */}
      <EmotionTestModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        testCode={selectedCode}
      />
    </div>
  );
}
