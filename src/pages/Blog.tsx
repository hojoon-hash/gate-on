
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

    </div>
  );
};

export default Blog;
