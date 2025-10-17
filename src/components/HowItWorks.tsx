import { Card } from "@/components/ui/card";
import { UserPlus, Search, Brain, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "프로필 등록",
      description: "업종, 사업 규모, 관심 지역 등 귀사의 정보를 입력합니다.",
    },
    {
      icon: Search,
      number: "02",
      title: "공고 자동 수집",
      description: "나라장터에서 실시간으로 새로운 공고를 수집하고 필터링합니다.",
    },
    {
      icon: Brain,
      number: "03",
      title: "AI 분석",
      description: "5년간의 낙찰 데이터와 비교하여 성공률과 리스크를 예측합니다.",
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "맞춤 추천",
      description: "성공 가능성이 높은 공고와 전략적 제안을 받아보세요.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="text-primary">간단한 4단계</span>로 시작하세요
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            복잡한 설정 없이 몇 분 만에 AI 기반 입찰 추천을 받아보실 수 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" 
               style={{ transform: 'translateY(-50%)' }} 
          />

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={index} 
                className="relative p-8 text-center hover:shadow-xl transition-all duration-300 bg-card border-2 hover:border-primary/20 group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                <div className="pt-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
