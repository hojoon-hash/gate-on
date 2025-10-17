import { Card } from "@/components/ui/card";
import aiIcon from "@/assets/feature-ai.jpg";
import matchIcon from "@/assets/feature-match.jpg";
import riskIcon from "@/assets/feature-risk.jpg";
import { TrendingUp, Shield, Target, Clock, Award, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: aiIcon,
      iconComponent: TrendingUp,
      title: "AI 예측 분석",
      description: "5년간의 낙찰 데이터를 학습한 AI가 귀사의 입찰 성공률을 0-100% 사이로 정확하게 예측합니다.",
      color: "primary",
    },
    {
      icon: matchIcon,
      iconComponent: Target,
      title: "맞춤형 공고 추천",
      description: "업종, 규모, 지역 등 귀사의 프로필에 최적화된 공고만 선별하여 추천해드립니다.",
      color: "accent",
    },
    {
      icon: riskIcon,
      iconComponent: Shield,
      title: "리스크 요인 분석",
      description: "지역 제한, 필수 자격, 경쟁 강도 등 핵심 리스크 요인을 사전에 파악하고 대응 전략을 제시합니다.",
      color: "primary",
    },
    {
      iconComponent: Clock,
      title: "실시간 공고 수집",
      description: "나라장터 API를 통해 5분마다 최신 공고를 자동 수집하여 기회를 놓치지 않습니다.",
      color: "accent",
    },
    {
      iconComponent: Award,
      title: "전략적 제안",
      description: "AI가 분석한 데이터를 바탕으로 경쟁 우위를 확보할 수 있는 3가지 행동 지침을 제공합니다.",
      color: "primary",
    },
    {
      iconComponent: BarChart3,
      title: "통계 데이터 기반",
      description: "5년간의 방대한 낙찰 통계를 기반으로 신뢰성 높은 인사이트를 제공합니다.",
      color: "accent",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            왜 <span className="text-primary">게이트온</span>인가요?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI 기술과 빅데이터 분석으로 초기 창업기업의 공공입찰 성공률을 높입니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.iconComponent;
            return (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group"
              >
                <div className="space-y-4">
                  {feature.icon ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-1">
                      <img 
                        src={feature.icon} 
                        alt={feature.title} 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                      feature.color === 'primary' 
                        ? 'from-primary/10 to-primary/5' 
                        : 'from-accent/10 to-accent/5'
                    } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-8 h-8 ${
                        feature.color === 'primary' ? 'text-primary' : 'text-accent'
                      }`} />
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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

export default Features;
