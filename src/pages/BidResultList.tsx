import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star } from "lucide-react";
import { useState } from "react";

const BidResultList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // API 연결 예정: 여기에 데이터 fetching 로직 추가
  const mockData = [
    {
      id: 1,
      number: "R25BK01049087-000-0-000",
      title: "[휴사병 전설이 되다! 드라마 후반작업 제작_CG 용역",
      category: "용역",
      badges: ["일", "공", "전"],
      contractMethod: "제한경쟁",
      estimatedPrice: "210,000,000",
      winner: "[전규]",
      organization: "스튜디오드래곤",
      postedAt: "2025-09-26 17:00"
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
            <div className="w-80 shrink-0">
              <SearchFilter />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">결과 공고 <span className="text-muted-foreground">[검색결과 14,239건]</span></h2>
                <div className="flex gap-2">
                  <Select defaultValue="posted_desc">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="posted_desc">게시일시 ▼</SelectItem>
                      <SelectItem value="posted_asc">게시일시 ▲</SelectItem>
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

              <div className="space-y-4">
                {/* API 연결 예정: mockData를 실제 API 데이터로 교체 */}
                {mockData.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-4">
                      <button className="text-gray-400 hover:text-yellow-500 mt-1">
                        <Star className="w-5 h-5" />
                      </button>
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">일</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">공</span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">전</span>
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded">{item.category}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">조달청 {item.number}</div>
                        <h3 className="text-base font-bold mb-2">{item.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">낙찰자: </span>
                            <span className="font-medium">{item.winner}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">계약방법: </span>
                            <span>{item.contractMethod}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">추정가격: </span>
                            <span className="font-medium text-[#dc2626]">{item.estimatedPrice}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">게시일시: </span>
                            <span>{item.postedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default BidResultList;
