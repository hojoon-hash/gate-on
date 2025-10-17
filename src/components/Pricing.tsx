import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Freemium",
      price: "무료",
      description: "서비스를 체험해보고 싶은 스타트업을 위한 플랜",
      features: [
        "월 10개 공고 분석",
        "기본 AI 예측 (성공률)",
        "주요 리스크 요인 1가지",
        "이메일 지원",
      ],
      cta: "무료로 시작하기",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₩99,000",
      period: "/ 월",
      description: "본격적으로 공공입찰에 도전하는 기업을 위한 플랜",
      features: [
        "무제한 공고 분석",
        "고급 AI 예측 (성공률 + 상세 분석)",
        "전체 리스크 요인 분석",
        "3가지 전략적 제안",
        "과거 5년 낙찰 데이터 접근",
        "실시간 공고 알림",
        "우선 고객 지원",
      ],
      cta: "Pro로 시작하기",
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            합리적인 <span className="text-primary">요금제</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            무료로 시작하고, 필요할 때 업그레이드하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`p-8 ${
                plan.highlighted 
                  ? 'border-4 border-primary shadow-2xl scale-105 relative' 
                  : 'border-2'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-1 rounded-full text-sm font-bold">
                  추천
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-primary hover:bg-primary/90 shadow-lg' 
                      : 'bg-secondary hover:bg-secondary/90'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
