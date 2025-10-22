
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string | null;
  views: number;
  created_at: string;
}

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center text-muted-foreground">로딩 중...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center text-muted-foreground">블로그 포스트를 찾을 수 없습니다</div>
          </div>
        </main>
      </div>
    );
  }

  return (
          <div className="min-h-screen bg-background">
            
          <main className="pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <Button
                variant="ghost"
                onClick={() => navigate('/blog')}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로
              </Button>
    
              <Card className="overflow-hidden">
                {post.thumbnail_url && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-8">
                  <div className="border-b border-border pb-6 mb-6">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                      {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{format(new Date(post.created_at), 'yyyy-MM-dd HH:mm')}</span>
                      <span>조회 {post.views}</span>
                    </div>
                  </div>
    
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {post.content}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </main>
    
          
        </div>  );
};

export default BlogDetail;
