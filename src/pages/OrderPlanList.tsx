
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import mockOrderPlans from "@/mockData/orderPlans.json";
import SearchFilter from "@/components/SearchFilter";

const OrderPlanList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const mockData = mockOrderPlans;

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
                  placeholder="사업명/수요기관/발주계획번호/담당자 정보를 검색해 주세요."
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
                  <label className="text-sm font-medium mb-2 block">기간</label>
                  <div className="flex gap-2 items-center mb-2">
                    <label className="flex items-center gap-1">
                      <input type="radio" name="dateType" defaultChecked />
                      <span className="text-sm">진행일자</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="dateType" />
                      <span className="text-sm">발주시기</span>
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

          {/* 메인 컨텐츠 */}
          <div className="flex-1">
            {/* 헤더 */}
        </div>
      </div>
    </div>
  </div>
  );
};

export default OrderPlanList;
