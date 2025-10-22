
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CustomSearch = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-gray-800">맞춤 검색 관리</CardTitle>
            <CardDescription className="text-gray-500">
              자주 사용하는 검색 조건을 저장하고 관리하여 원하는 공고를 빠르게 찾아보세요. 이 기능은 현재 개발 중입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-4">새 맞춤 검색 추가</h4>
              <fieldset disabled className="space-y-4 opacity-50">
                <div className="space-y-2">
                  <Label htmlFor="search-name" className="text-gray-800">맞춤 검색 이름</Label>
                  <Input id="search-name" placeholder="예: 우리 회사 주력 사업 공고" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-keywords" className="text-gray-800">키워드</Label>
                  <Input id="search-keywords" placeholder="#반도체, #유지보수, ..." />
                </div>
                <Button type="button" className="bg-blue-600 hover:bg-blue-500 text-white">저장하기</Button>
              </fieldset>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4">저장된 맞춤 검색 목록</h4>
              <div className="text-center text-gray-500 py-8">
                <p>저장된 맞춤 검색이 없습니다.</p>
                <p className="text-sm">(기능 개발 중)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomSearch;