import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DeadlineSoon = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-gray-800">마감임박 공고</CardTitle>
            <CardDescription className="text-gray-500">
              입찰 마감이 임박한 공고들을 확인하고 놓치지 마세요. 이 기능은 현재 개발 중입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-gray-200 rounded-lg">
              <div className="p-6 text-center text-gray-500">
                <p>마감임박 공고가 없습니다.</p>
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

export default DeadlineSoon;