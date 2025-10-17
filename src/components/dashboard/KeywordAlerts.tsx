import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  keyword: string;
  is_active: boolean;
  created_at: string;
}

interface KeywordAlertsProps {
  userId: string;
}

const KeywordAlerts = ({ userId }: KeywordAlertsProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAlerts();
  }, [userId]);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from("keyword_alerts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const handleAddAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("keyword_alerts").insert({
        user_id: userId,
        keyword: newKeyword.trim(),
      });

      if (error) throw error;

      toast({
        title: "키워드 알람 추가",
        description: `"${newKeyword}" 키워드 알람이 추가되었습니다.`,
      });

      setNewKeyword("");
      fetchAlerts();
    } catch (error) {
      toast({
        title: "오류",
        description: "키워드 알람 추가에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAlert = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("keyword_alerts")
        .update({ is_active: !isActive })
        .eq("id", id);

      if (error) throw error;
      fetchAlerts();
    } catch (error) {
      toast({
        title: "오류",
        description: "상태 변경에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAlert = async (id: string) => {
    try {
      const { error } = await supabase.from("keyword_alerts").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "삭제 완료",
        description: "키워드 알람이 삭제되었습니다.",
      });

      fetchAlerts();
    } catch (error) {
      toast({
        title: "오류",
        description: "삭제에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            새 키워드 알람 추가
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAlert} className="flex gap-2">
            <Input
              type="text"
              placeholder="예: IT서비스, 시스템 구축, 웹사이트 개발"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              <Plus className="w-4 h-4 mr-1" />
              추가
            </Button>
          </form>
        </CardContent>
      </Card>

      {alerts.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">등록된 키워드 알람이 없습니다</h3>
          <p className="text-muted-foreground">
            관심있는 키워드를 등록하면 해당 공고가 올라올 때 알림을 받을 수 있습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Badge variant={alert.is_active ? "default" : "secondary"}>
                    {alert.keyword}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {alert.is_active ? "활성" : "비활성"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleAlert(alert.id, alert.is_active)}
                  >
                    {alert.is_active ? "비활성화" : "활성화"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeywordAlerts;