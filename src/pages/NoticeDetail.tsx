import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  content: string;
  views: number;
  created_at: string;
}

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchNotice();
    }
  }, [id]);

  const fetchNotice = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setNotice(data);
    } catch (error) {
      console.error('Error fetching notice:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center text-muted-foreground">로딩 중...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center text-muted-foreground">공지사항을 찾을 수 없습니다</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/notices')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>

          <Card className="p-8">
            <div className="border-b border-border pb-6 mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                {notice.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{format(new Date(notice.created_at), 'yyyy-MM-dd HH:mm')}</span>
                <span>조회 {notice.views}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {notice.content}
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NoticeDetail;
