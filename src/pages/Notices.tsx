
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

    </div>
  );
};

export default Notices;
