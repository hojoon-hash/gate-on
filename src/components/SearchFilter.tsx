import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SearchFilterProps {
  onSearch?: () => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">검색 필터</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {expanded && (
        <div className="space-y-4">
          {/* 간편검색 */}
          <div>
            <Label className="text-sm font-medium mb-2 block">간편검색</Label>
            <Input 
              placeholder="공고명/공고번호/공고기관명/수요기관을 입력하세요."
              className="w-full"
            />
          </div>

          {/* 기간 */}
          <div>
            <Label className="text-sm font-medium mb-2 block">기간</Label>
            <div className="flex gap-2 items-center flex-wrap">
              <div className="flex gap-2">
                <label className="flex items-center gap-1">
                  <input type="radio" name="dateType" defaultChecked />
                  <span className="text-sm">게시일시</span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="dateType" />
                  <span className="text-sm">입찰 마감일시</span>
                </label>
              </div>
              <Input type="date" className="w-40" />
              <span>~</span>
              <Input type="date" className="w-40" />
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">전체</Button>
              <Button variant="outline" size="sm">당일</Button>
              <Button variant="outline" size="sm">1주일</Button>
              <Button variant="outline" size="sm">1개월</Button>
              <Button variant="outline" size="sm">6개월</Button>
              <Button variant="outline" size="sm">1년</Button>
              <Button variant="outline" size="sm">2년</Button>
            </div>
          </div>

          {/* 공고 업무 구분 */}
          <div>
            <Label className="text-sm font-medium mb-2 block">공고 업무 구분</Label>
            <div className="flex gap-3 flex-wrap">
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">물품</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">공사</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">용역</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">외자</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">기타</span>
              </label>
            </div>
          </div>

          {/* 계약 방법 */}
          <div>
            <Label className="text-sm font-medium mb-2 block">계약 방법</Label>
            <div className="flex gap-3 flex-wrap">
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">일반경쟁</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">제한경쟁</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">지명경쟁</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">수의계약</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">기타</span>
              </label>
            </div>
          </div>

          {/* 추정 가격 */}
          <div>
            <Label className="text-sm font-medium mb-2 block">추정 가격</Label>
            <div className="flex gap-2 items-center">
              <Input type="number" placeholder="0" className="w-32" />
              <span>~</span>
              <Input type="number" placeholder="0" className="w-32" />
              <span className="text-sm">억원</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              예) 5천만원 : 0.5 억원, 5억5천만원 : 5.5 억원
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              검색조건 신규등록
            </Button>
            <Button variant="outline" className="flex-1">
              초기화
            </Button>
            <Button className="flex-1 bg-black hover:bg-black/90 text-white" onClick={onSearch}>
              검색
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SearchFilter;
