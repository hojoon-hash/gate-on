import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertTriangle } from "lucide-react";

interface RecommendedBidsProps {
  userId: string;
}

const RecommendedBids = ({ userId }: RecommendedBidsProps) => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [userId]);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from("ai_predictions")
        .select(`
          *,
          bids (*)
        `)
        .eq("user_id", userId)
        .order("success_rate", { ascending: false })
        .limit(10);

      if (error) throw error;
      setPredictions(data || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (predictions.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">맞춤 추천이 준비 중입니다</h3>
        <p className="text-muted-foreground">
          공고를 검색하고 AI 분석을 요청하면 여기에 맞춤 추천이 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {predictions.map((prediction) => (
        <Card key={prediction.id} className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{prediction.bids.title}</CardTitle>
                <CardDescription className="mt-1">
                  {prediction.bids.organization}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-1">
                <Target className="w-4 h-4 mr-1" />
                {prediction.success_rate}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {prediction.suggested_price && (
              <div className="bg-secondary/20 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">AI 제안 입찰가</p>
                <p className="text-2xl font-bold">
                  {(prediction.suggested_price / 10000).toFixed(0)}만원
                </p>
              </div>
            )}
            
            {prediction.risk_factors && Array.isArray(prediction.risk_factors) && (
              <div>
                <p className="text-sm font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1 text-yellow-500" />
                  주의사항
                </p>
                <ul className="space-y-1 text-sm">
                  {prediction.risk_factors.map((risk: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {prediction.recommendations && Array.isArray(prediction.recommendations) && (
              <div>
                <p className="text-sm font-semibold mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  추천 전략
                </p>
                <ul className="space-y-1 text-sm">
                  {prediction.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecommendedBids;