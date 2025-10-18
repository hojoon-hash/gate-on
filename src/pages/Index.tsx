import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Search, Bell, BookmarkIcon, TrendingUp, ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Index = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const [notices, setNotices] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchNotices();
    fetchBlogPosts();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner with Carousel */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-[320px] flex items-center justify-center text-primary-foreground">
              <div className="text-center z-10 px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  공공 진출의 문을 열다 게이트온
                </h1>
              </div>
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-6'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card className="p-8 shadow-md border-border/50">
            <div className="text-center mb-8">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12 h-12 text-base font-semibold shadow-sm"
                onClick={() => navigate("/auth")}
              >
                로그인/회원가입
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">맞춤 검색 관리</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">알림 메일 설정</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">마감임박</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookmarkIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">즐겨찾기 관리</span>
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="border-b border-border mb-6">
            <div className="flex gap-1 overflow-x-auto">
              <button className="px-6 py-3 border-b-2 border-primary text-primary font-semibold whitespace-nowrap transition-colors">
                최신 입찰공고
              </button>
              <button className="px-6 py-3 border-b-2 border-transparent hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
                최신 결과공고
              </button>
              <button className="px-6 py-3 border-b-2 border-transparent hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
                최신 입찰기업
              </button>
              <button className="px-6 py-3 border-b-2 border-transparent hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
                최신 발주계획
              </button>
              <button className="px-6 py-3 border-b-2 border-transparent hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
                최신 사전규격
              </button>
            </div>
          </div>

          {/* Sample Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">업무</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">분류</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">공고번호/공고명</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">공고기관/수요기관</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">계약방법<br />(추정가격)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">입찰 마감일시</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">게시일시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-accent transition-colors">
                    <td className="px-4 py-4 text-sm">공사</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">일</span>
                        <span className="px-2 py-1 bg-green-500/10 text-green-700 text-xs rounded font-medium">전</span>
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-700 text-xs rounded font-medium">공</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-muted-foreground mb-1">조달청 R25BK01080754-000</div>
                      <div className="text-sm font-medium text-foreground">중앙지구 수리시설개보수사업 토목공사</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-foreground">한국농어촌공사 경기지역본부 강화지사</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-muted-foreground">제한경쟁</div>
                      <div className="text-sm font-semibold text-foreground">2,359,901,000원</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">2025-10-02 10:00</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">2025-09-26 18:59</td>
                  </tr>
                  {/* API 연결 시 여기에 데이터가 들어갑니다 */}
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      더 많은 데이터는 각 메뉴를 이용해주세요
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Notice & Blog Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notices */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-border bg-accent/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    공지사항
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/notices')}
                    className="text-muted-foreground hover:text-primary"
                  >
                    더보기
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-border">
                {notices.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    등록된 공지사항이 없습니다
                  </div>
                ) : (
                  notices.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => navigate(`/notices/${notice.id}`)}
                      className="p-4 hover:bg-accent cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {notice.is_pinned && (
                              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded flex-shrink-0">
                                공지
                              </span>
                            )}
                            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                              {notice.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(notice.created_at), 'yyyy-MM-dd')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Blog */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-border bg-accent/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    블로그
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/blog')}
                    className="text-muted-foreground hover:text-primary"
                  >
                    더보기
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-border">
                {blogPosts.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    등록된 블로그가 없습니다
                  </div>
                ) : (
                  blogPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="p-4 hover:bg-accent cursor-pointer transition-colors group"
                    >
                      <div className="flex gap-4">
                        {post.thumbnail_url && (
                          <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                            <img
                              src={post.thumbnail_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(post.created_at), 'yyyy-MM-dd')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    고객상담
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    고객상담은 1:1문의를 통해서만 접수받고 있습니다.
                  </p>
                  <div className="flex items-start gap-3 mb-6">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">상담운영시간</p>
                      <p className="text-muted-foreground">09:30 - 18:30</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate('/inquiry')}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    1:1 문의하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-24 h-24 text-primary opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
