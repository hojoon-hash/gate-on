import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star } from "lucide-react";
import { useState } from "react";

const BidList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // API 연결 예정: 여기에 데이터 fetching 로직 추가
  const mockData = [
    {
      id: 1,
      number: "R25BK01080754-000",
      title: "중앙지구 수리시설개보수사업 토목공사",
      category: "공사",
      badges: ["일", "전", "공"],
      estimatedPrice: "2,359,901,000",
      contractMethod: "제한경쟁",
      organization: "한국농어촌공사 경기지역본부 강화지사",
      deadline: "2025-10-02 10:00",
      postedAt: "2025-09-26 18:59"
    },
    // 더 많은 샘플 데이터...
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* 검색바 */}
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="검색어를 입력해 주세요."
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
            {/* 검색 필터 (왼쪽) */}
            <div className="w-80 shrink-0">
              <SearchFilter />
            </div>

            {/* 메인 컨텐츠 (오른쪽) */}
            <div className="flex-1">
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">입찰 공고 <span className="text-muted-foreground">[검색결과 17,439건]</span></h2>
                <div className="flex gap-2">
                  <Select defaultValue="posted_desc">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="posted_desc">게시일시 ▼</SelectItem>
                      <SelectItem value="posted_asc">게시일시 ▲</SelectItem>
                      <SelectItem value="deadline_desc">마감일시 ▼</SelectItem>
                      <SelectItem value="deadline_asc">마감일시 ▲</SelectItem>
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

              {/* 테이블 */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">관심</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">번호</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">공고명 / 분류</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">계약방법<br />추정 가격</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">지역</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">공고기관<br />수요기관</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium">게시일시<br />입찰 마감일시</th>
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
                        <td className="border-b px-4 py-3 text-sm">17,{439 - index}</td>
                        <td className="border-b px-4 py-3">
                          <div className="flex gap-1 mb-1">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">일</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">전</span>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">[공사]</span>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">조달청 {item.number}</div>
                          <div className="text-sm font-medium">{item.title}</div>
                        </td>
                        <td className="border-b px-4 py-3">
                          <div className="text-sm">{item.contractMethod}</div>
                          <div className="text-sm font-medium text-[#dc2626]">{item.estimatedPrice}</div>
                        </td>
                        <td className="border-b px-4 py-3">
                          <span className="px-2 py-1 bg-gray-100 text-xs rounded">제한없음</span>
                        </td>
                        <td className="border-b px-4 py-3 text-sm">{item.organization}</td>
                        <td className="border-b px-4 py-3">
                          <div className="text-xs text-muted-foreground">{item.postedAt}</div>
                          <div className="text-sm font-medium text-blue-600">{item.deadline}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
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

export default BidList;
