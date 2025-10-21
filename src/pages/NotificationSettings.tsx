import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-gray-800">알림 메일 설정</CardTitle>
            <CardDescription className="text-gray-500">
              맞춤 검색 조건에 맞는 새로운 공고가 등록되면 이메일로 알림을 받아보세요. 이 기능은 현재 개발 중입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <fieldset disabled className="space-y-6 opacity-50">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <Label htmlFor="master-switch" className="font-semibold text-gray-800">전체 알림 받기</Label>
                  <p className="text-sm text-gray-500">모든 알림을 활성화하거나 비활성화합니다.</p>
                </div>
                <Switch id="master-switch" />
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">알림 받을 맞춤 검색</h4>
                <div className="text-center text-gray-500 py-8">
                  <p>알림을 설정할 맞춤 검색이 없습니다.</p>
                  <p className="text-sm">(기능 개발 중)</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="button" className="bg-blue-600 hover:bg-blue-500 text-white">설정 저장</Button>
              </div>
            </fieldset>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default NotificationSettings;