import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string | null;
  views: number;
  created_at: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      await supabase
        .from('blog_posts')
        .update({ views: post.views + 1 })
        .eq('id', postId);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handlePostClick = (postId: string) => {
    incrementViews(postId);
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">블로그</h1>
            <p className="text-muted-foreground">입찰 정보와 팁을 공유합니다</p>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-12">
              로딩 중...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              등록된 블로그 포스트가 없습니다
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  {post.thumbnail_url && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{format(new Date(post.created_at), 'yyyy-MM-dd')}</span>
                      <span>조회 {post.views}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
