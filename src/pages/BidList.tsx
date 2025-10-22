import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom"; // 1. Link 컴포넌트를 가져옵니다.
import mockBids from "@/mockData/bids.json"; // 2. 중앙 목업 데이터를 사용합니다.

const BidList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // 3. 가져온 목업 데이터를 변수에 할당합니다.
  const bids = mockBids;

  return (
    <div className="min-h-screen bg-background">

      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* 검색바 */}
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="검색어를 입력해 주세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <MagnifyingGlassIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 검색 필터 (상단) */}
          <div className="mb-6">
            <SearchFilter />
          </div>

          {/* 메인 컨텐츠 */}
          <div className="flex-1">
            {/* 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">입찰 공고 <span className="text-muted-foreground">[검색결과 {bids.length}건]</span></h2>
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
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-800">관심</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">업무</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">공고명</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">공고기관</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">추정가격</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">입찰 마감일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 4. 데이터를 순회하며 각 행을 Link로 감싸거나, 셀 안에 Link를 넣습니다. */}
                    {bids.map((bid) => (
                      <tr key={bid.id} className="hover:bg-gray-50">
                        <td className="border-b border-gray-200 px-4 py-3 text-center">
                          <button className="text-gray-400 hover:text-yellow-500">
                            <StarIcon className="w-5 h-5" />
                          </button>
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{bid.task}</td>
                        <td className="border-b border-gray-200 px-4 py-3">
                          <Link to={`/bid/${bid.id}`} className="hover:underline">
                            <div className="text-xs text-gray-500 mb-1">조달청 {bid.id}</div>
                            <div className="text-sm font-medium text-blue-600">{bid.title}</div>
                          </Link>
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{bid.institution}</td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-red-600">{bid.price}</td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-red-600">{bid.deadline}</td>
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
  );
};

export default BidList;