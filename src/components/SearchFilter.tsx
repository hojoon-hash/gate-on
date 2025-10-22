
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// Note: Rebuilt from scratch to ensure stability and fix runtime errors.

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div>
    <Label className="text-sm font-medium mb-2 block">{title}</Label>
    {children}
  </div>
);

const SearchFilter = () => {
  const [expanded, setExpanded] = useState(false);

  // To make this a fully controlled component, you would have a useState for each input.
  // For now, we are just ensuring the UI renders without crashing.

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h3 className="font-bold text-lg">검색 필터</h3>
        <Button variant="ghost" size="sm">
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {expanded && (
        <div className="space-y-6">
          <Section title="간편검색">
            <Input placeholder="공고명, 번호, 기관명 등" />
          </Section>

          <Section title="기간">
            <div className="space-y-2">
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-1 text-sm"><input type="radio" name="dateType" defaultChecked /> 게시일시</label>
                <label className="flex items-center gap-1 text-sm"><input type="radio" name="dateType" /> 마감일시</label>
              </div>
              <div className="flex gap-2 items-center">
                <Input type="date" />
                <span>~</span>
                <Input type="date" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {[ "전체", "당일", "1주일", "1개월", "6개월", "1년" ].map(period => (
                  <Button key={period} variant="outline" size="sm" className="flex-grow">{period}</Button>
                ))}
              </div>
            </div>
          </Section>

          <Section title="공고 업무 구분">
            <div className="grid grid-cols-2 gap-2">
              {[ "물품", "공사", "용역", "외자", "기타" ].map(type => (
                <label key={type} className="flex items-center gap-2 text-sm"><Checkbox id={`type-${type}`} /> {type}</label>
              ))}
            </div>
          </Section>

          <Section title="계약 방법">
            <div className="grid grid-cols-2 gap-2">
              {[ "일반경쟁", "제한경쟁", "지명경쟁", "수의계약", "기타" ].map(method => (
                <label key={method} className="flex items-center gap-2 text-sm"><Checkbox id={`method-${method}`} /> {method}</label>
              ))}
            </div>
          </Section>

          <Section title="추정 가격 (억원)">
            <div className="flex gap-2 items-center">
              <Input type="number" placeholder="0" />
              <span>~</span>
              <Input type="number" placeholder="0" />
            </div>
          </Section>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">초기화</Button>
            <Button className="flex-1 bg-black hover:bg-black/90 text-white">검색</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SearchFilter;
