
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import mockBidders from "@/mockData/bidders.json";

const BidderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const mockData = mockBidders;

  return (
    <div className="min-h-screen bg-background">

      
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

          {/* 검색 필터 (상단) */}
          <div className="mb-6">
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

          {/* 메인 컨텐츠 */}
          <div className="flex-1">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">입찰 기업 <span className="text-muted-foreground">[검색결과 {mockData.length}건]</span></h2>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">기업명</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">대표자명</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">사업자번호</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">주소</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-800">최근 입찰 공고</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((bidder) => (
                    <tr key={bidder.id} className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 px-4 py-3 text-sm font-medium">
                        <Link to={`/company/${bidder.id}`} className="hover:underline text-blue-600">
                          {bidder.companyName}
                        </Link>
                      </td>
                      <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{bidder.ceoName}</td>
                      <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{bidder.businessRegNo}</td>
                      <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">{bidder.address}</td>
                      <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-800">
                        {bidder.recentBid ? (
                          <Link to={`/bid/${bidder.recentBid.number}`} className="hover:underline text-blue-600">
                            {bidder.recentBid.title}
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </td>
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
  );
};

export default BidderList;
