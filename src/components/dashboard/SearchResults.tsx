import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface Bid {
  id: string;
  bid_number: string;
  title: string;
  organization: string;
  budget: number;
  end_date: string;
  category: string;
  location: string;
  status: string;
}

interface SearchResultsProps {
  searchQuery: string;
  userId: string;
}

const SearchResults = ({ searchQuery, userId }: SearchResultsProps) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBids();
  }, [searchQuery]);

  const fetchBids = async () => {
    setLoading(true);
    try {
      let query = supabase.from("bids").select("*").eq("status", "active");

      if (searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.order("created_at", { ascending: false }).limit(20);

      if (error) throw error;
      setBids(data || []);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (bidId: string) => {
    try {
      const { error } = await supabase.from("bookmarks").insert({
        user_id: userId,
        bid_id: bidId,
      });

      if (error) throw error;

      toast({
        title: "북마크 추가",
        description: "관심 공고에 추가되었습니다.",
      });
    } catch (error: any) {
      if (error.code === "23505") {
        toast({
          title: "이미 북마크됨",
          description: "이미 관심 공고에 등록된 공고입니다.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAnalyze = async (bidId: string) => {
    toast({
      title: "AI 분석 중",
      description: "공고를 분석하고 있습니다...",
    });
    // TODO: AI 분석 기능 구현
  };

  if (loading) {
    return <div className="text-center py-8">검색 중...</div>;
  }

  if (bids.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">검색 결과가 없습니다.</p>
        <p className="text-sm text-muted-foreground mt-2">다른 키워드로 검색해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <Card key={bid.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{bid.title}</CardTitle>
                <CardDescription className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline">{bid.category}</Badge>
                  <Badge variant="outline">{bid.location}</Badge>
                  <span className="text-sm">{bid.organization}</span>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBookmark(bid.id)}>
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAnalyze(bid.id)}>
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI 분석
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">예산</p>
                <p className="font-semibold">
                  {bid.budget ? `${(bid.budget / 10000).toFixed(0)}만원` : "미정"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">마감일</p>
                <p className="font-semibold">
                  {formatDistanceToNow(new Date(bid.end_date), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">공고번호</p>
                <p className="font-mono text-xs">{bid.bid_number}</p>
              </div>
              <div>
                <Button size="sm" variant="link" className="p-0 h-auto">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  상세보기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;