import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star } from "lucide-react";
import { useState } from "react";

const PreSpecList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // API 연결 예정: 여기에 데이터 fetching 로직 추가
  const mockData = [
    {
      id: 1,
      type: "일반용역",
      status: "마감",
      number: "R25BD00120019",
      title: "평택세관 감시종합정보시스템 재구축사업",
      organization: "관세청 평택세관",
      budget: "1,459,302,490",
      announcementOrg: "조달청 인천지방조달청",
      manager: "최찬수",
      phone: "070-4056-7867",
      progressDate: "2025-09-26",
      deadline: "2025-09-29 23:59:00"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="사업명/사전규격등록번호/수요기관/공고기관/담당자명 정보를 검색해 주세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-80 shrink-0">
              <Card className="p-4">
                <h3 className="font-bold text-lg mb-4">검색 필터</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">기간</label>
                    <div className="flex gap-2 items-center mb-2">
                      <label className="flex items-center gap-1">
                        <input type="radio" name="dateType" defaultChecked />
                        <span className="text-sm">진행일자</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="radio" name="dateType" />
                        <span className="text-sm">의견등록마감일시</span>
                      </label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Input type="date" className="w-full" />
                      <span>~</span>
                      <Input type="date" className="w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">사업명</label>
                    <Input placeholder="" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">수요기관</label>
                    <Input placeholder="" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">초기화</Button>
                    <Button className="flex-1 bg-black hover:bg-black/90 text-white">검색</Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">사전규격 <span className="text-muted-foreground">[검색결과 4,751건]</span></h2>
                <div className="flex gap-2">
                  <Select defaultValue="date_desc">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date_desc">진행일자 ▼</SelectItem>
                      <SelectItem value="date_asc">진행일자 ▲</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="20">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20개씩</SelectItem>
                      <SelectItem value="50">50개씩</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">관심</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">번호</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">업무구분</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">진행상태</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">사전규격등록번호<br />사업명</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">수요기관</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">배정예산액</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">공고기관</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">담당자<br />(연락처)</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">진행일자</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">의견등록마감일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* API 연결 예정: mockData를 실제 API 데이터로 교체 */}
                    {mockData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="border-b px-4 py-3">
                          <button className="text-gray-400 hover:text-yellow-500">
                            <Star className="w-5 h-5" />
                          </button>
                        </td>
                        <td className="border-b px-4 py-3 text-sm">4,{751 - index}</td>
                        <td className="border-b px-4 py-3 text-sm">{item.type}</td>
                        <td className="border-b px-4 py-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">{item.status}</span>
                        </td>
                        <td className="border-b px-4 py-3">
                          <div className="text-xs text-muted-foreground mb-1">{item.number}</div>
                          <div className="text-sm font-medium">{item.title}</div>
                        </td>
                        <td className="border-b px-4 py-3 text-sm">{item.organization}</td>
                        <td className="border-b px-4 py-3 text-sm font-medium text-[#dc2626]">{item.budget}</td>
                        <td className="border-b px-4 py-3 text-sm">{item.announcementOrg}</td>
                        <td className="border-b px-4 py-3 text-sm">
                          <div>{item.manager}</div>
                          <div className="text-xs text-muted-foreground">({item.phone})</div>
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-blue-600">{item.progressDate}</td>
                        <td className="border-b px-4 py-3 text-sm text-[#dc2626]">{item.deadline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                <Button variant="outline" size="sm">이전</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">다음</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSpecList;
