import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import mockBidders from "@/mockData/bidders.json";

const BidderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const mockData = mockBidders;

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
                  placeholder="기업명/대표자명/사업자등록번호를 입력하세요."
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
              <Card className="p-4">
                <h3 className="font-bold text-lg mb-4">검색 필터</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">기업명</label>
                    <Input placeholder="" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">대표자명</label>
                    <Input placeholder="" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">사업자등록번호</label>
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
                <h2 className="text-xl font-bold">입찰 기업 검색 <span className="text-muted-foreground">[검색결과 434,569건]</span></h2>
                <div className="flex gap-2">
                  <Select defaultValue="date_desc">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date_desc">최종낙찰일 ▼</SelectItem>
                      <SelectItem value="date_asc">최종낙찰일 ▲</SelectItem>
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
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-800">관심</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">번호</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">기업명</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">대표자</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">사업자등록번호</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">주소</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">최근 낙찰 공고</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">추정 가격</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">공고기관</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">최종낙찰일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border-b border-gray-200 px-4 py-3 text-center">
                          <button className="text-gray-400 hover:text-yellow-500">
                            <StarIcon className="w-5 h-5" />
                          </button>
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">434,{569 - index}</td>
                        <td className="border-b border-gray-200 px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">{item.type}</span>
                            <span className="text-sm font-medium text-gray-800">{item.companyName}</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{item.ceoName}</td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{item.businessRegNo}</td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{item.address}</td>
                        <td className="border-b border-gray-200 px-4 py-3">
                          <div className="text-xs text-blue-600">[공사]</div>
                          <div className="text-xs text-gray-500 mb-1">조달청 {item.recentBid.number}</div>
                          <div className="text-sm font-medium text-gray-800">{item.recentBid.title}</div>
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-red-600">{item.recentBid.price}</td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{item.recentBid.organization}</td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{item.recentBid.date}</td>
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

export default BidderList;
