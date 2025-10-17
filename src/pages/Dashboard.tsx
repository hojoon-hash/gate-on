import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Bookmark, TrendingUp, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import gateonLogo from "@/assets/gateon-logo.jpg";
import SearchResults from "@/components/dashboard/SearchResults";
import KeywordAlerts from "@/components/dashboard/KeywordAlerts";
import RecommendedBids from "@/components/dashboard/RecommendedBids";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"search" | "recommended" | "alerts">("search");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !user) return;

    try {
      await supabase.from("search_history").insert({
        user_id: user.id,
        keyword: searchQuery,
      });
      
      toast({
        title: "검색 완료",
        description: `"${searchQuery}" 검색 결과를 불러왔습니다.`,
      });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={gateonLogo} alt="GateOn" className="h-8" />
            <h1 className="text-xl font-bold">GateOn 대시보드</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="키워드, 업종, 지역 등으로 검색하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white text-foreground"
                />
              </div>
              <Button type="submit" variant="secondary">
                검색
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <Button
              variant={activeTab === "search" ? "default" : "ghost"}
              onClick={() => setActiveTab("search")}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeTab === "search"}
            >
              <Search className="w-4 h-4 mr-2" />
              검색 결과
            </Button>
            <Button
              variant={activeTab === "recommended" ? "default" : "ghost"}
              onClick={() => setActiveTab("recommended")}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeTab === "recommended"}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              맞춤 추천
            </Button>
            <Button
              variant={activeTab === "alerts" ? "default" : "ghost"}
              onClick={() => setActiveTab("alerts")}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeTab === "alerts"}
            >
              <Bell className="w-4 h-4 mr-2" />
              키워드 알람
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "search" && <SearchResults searchQuery={searchQuery} userId={user.id} />}
        {activeTab === "recommended" && <RecommendedBids userId={user.id} />}
        {activeTab === "alerts" && <KeywordAlerts userId={user.id} />}
      </div>
    </div>
  );
};

export default Dashboard;