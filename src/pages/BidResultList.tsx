
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import mockResults from "@/mockData/results.json";

const BidResultList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const results = mockResults;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
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

          <div className="flex gap-6">
            <div className="w-80 shrink-0">
              <SearchFilter />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">결과 공고 <span className="text-muted-foreground">[검색결과 {results.length}건]</span></h2>
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

              {/* Refactored to a table layout for consistency */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-800">관심</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">공고명</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">낙찰업체</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">개찰일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="border-b border-gray-200 px-4 py-3 text-center">
                          <button className="text-gray-400 hover:text-yellow-500">
                            <StarIcon className="w-5 h-5" />
                          </button>
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3">
                          <Link to={`/bid-result/${result.id}`} className="hover:underline text-blue-600 font-semibold">
                            {result.noticeTitle}
                          </Link>
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{result.winnerName}</td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{format(new Date(result.openingDate), 'yyyy-MM-dd HH:mm')}</td>
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

export default BidResultList;
