import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Favorites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-gray-800">즐겨찾기 관리</CardTitle>
            <CardDescription className="text-gray-500">
              관심 있는 공고를 즐겨찾기하고 목록을 관리하세요. 이 기능은 현재 개발 중입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-gray-200 rounded-lg">
              <div className="p-6 text-center text-gray-500">
                <p>즐겨찾기한 공고가 없습니다.</p>
                <p className="text-sm">(기능 개발 중)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;