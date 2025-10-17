import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Notice {
  id: string;
  title: string;
  content: string;
  views: number;
  is_pinned: boolean;
  created_at: string;
}

const Notices = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (noticeId: string) => {
    try {
      const notice = notices.find(n => n.id === noticeId);
      if (!notice) return;

      await supabase
        .from('notices')
        .update({ views: notice.views + 1 })
        .eq('id', noticeId);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleNoticeClick = (noticeId: string) => {
    incrementViews(noticeId);
    navigate(`/notices/${noticeId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">공지사항</h1>
            <p className="text-muted-foreground">크제비의 새로운 소식을 확인하세요</p>
          </div>

          <Card className="overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-muted-foreground">
                로딩 중...
              </div>
            ) : notices.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                등록된 공지사항이 없습니다
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice.id)}
                    className="p-6 hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {notice.is_pinned && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                              공지
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                            {notice.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{format(new Date(notice.created_at), 'yyyy-MM-dd HH:mm')}</span>
                          <span>조회 {notice.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notices;
