import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { MagnifyingGlassIcon, BellIcon, BookmarkIcon, ArrowTrendingUpIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import mockResults from "@/mockData/results.json";
import mockBidders from "@/mockData/bidders.json";
import mockBids from "@/mockData/bids.json";
import mockNotices from "@/mockData/notices.json";
import mockBlogPosts from "@/mockData/blogPosts.json";

const Index = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const [notices, setNotices] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('bids');

  useEffect(() => {
    setNotices(mockNotices);
    setBlogPosts(mockBlogPosts);
  }, []);

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
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
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
      <section className="py-8 mb-12">
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
              <button onClick={() => navigate('/custom-search')} className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MagnifyingGlassIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">맞춤 검색 관리</span>
              </button>
              <button onClick={() => navigate('/notification-settings')} className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BellIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">알림 메일 설정</span>
              </button>
              <button onClick={() => navigate('/deadline-soon')} className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">마감임박</span>
              </button>
              <button onClick={() => navigate('/favorites')} className="flex flex-col items-center gap-3 p-6 hover:bg-accent rounded-xl transition-all hover:shadow-sm group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookmarkIcon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">즐겨찾기 관리</span>
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content Tabs - DYNAMIC VERSION */}
      <section className="py-8 mb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="border-b border-border mb-6">
            <div className="flex gap-1 overflow-x-auto">
              {/* [초보자 참고] 각 버튼은 클릭 시 setActiveTab을 호출하여 activeTab 상태를 변경합니다. */}
              {/* [For Beginners] Each button calls setActiveTab on click to change the activeTab state. */}
              <button 
                onClick={() => setActiveTab('bids')}
                className={`px-6 py-3 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'bids' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                }`}>
                최신 입찰공고
              </button>
              <button 
                onClick={() => setActiveTab('results')}
                className={`px-6 py-3 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'results' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                }`}>
                최신 결과공고
              </button>
              <button 
                onClick={() => setActiveTab('bidders')}
                className={`px-6 py-3 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'bidders' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                }`}>
                최신 입찰기업
              </button>
              {/* Other tabs can be added here following the same pattern */}
            </div>
          </div>

          {/* [초보자 참고] 조건부 렌더링: activeTab 값에 따라 다른 테이블을 보여줍니다. */}
          {/* [For Beginners] Conditional Rendering: Shows a different table based on the activeTab value. */}
          
          {/* Bids Table */}
          {activeTab === 'bids' && (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">업무</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">분류</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">공고번호/공고명</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">공고기관/수요기관</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">계약방법<br />(추정가격)</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">입찰 마감일시</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">게시일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBids.map((bid) => (
                      <tr key={bid.id} className="border-b border-border hover:bg-accent transition-colors group">
                        <td className="px-4 py-4 text-sm">{bid.task}</td>
                        <td className="px-4 py-4">
                          <div className="flex gap-1">
                            {bid.tags.map(tag => (
                               <span key={tag} className={`px-2 py-1 text-xs rounded font-medium ${
                                 tag === '일' ? 'bg-primary/10 text-primary' :
                                 tag === '전' ? 'bg-green-500/10 text-green-700' :
                                 'bg-purple-500/10 text-purple-700'
                               }`}>{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Link to={`/bid/${bid.id}`} className="group-hover:underline text-blue-600">
                            <div className="text-xs text-gray-500 mb-1">조달청 {bid.id}</div>
                            <div className="text-sm font-medium">{bid.title}</div>
                          </Link>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-foreground">{bid.institution}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-muted-foreground">{bid.method}</div>
                          <div className="text-sm font-semibold text-foreground">{bid.price}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">{bid.deadline}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{bid.postedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Results Table */}
          {activeTab === 'results' && (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">공고명</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">낙찰업체</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">개찰일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResults.map((result) => (
                      <tr key={result.id} className="border-b border-border hover:bg-accent transition-colors">
                        <td className="px-4 py-4 text-sm font-medium text-blue-600">{result.noticeTitle}</td>
                        <td className="px-4 py-4 text-sm">{result.winnerName}</td>
                        <td className="px-4 py-4 text-sm">{format(new Date(result.openingDate), 'yyyy-MM-dd HH:mm')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Bidders Table */}
          {activeTab === 'bidders' && (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">기업명</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">대표자명</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">사업자번호</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBidders.map((bidder) => (
                      <tr key={bidder.id} className="border-b border-border hover:bg-accent transition-colors">
                        <td className="px-4 py-4 text-sm font-medium text-gray-800">{bidder.companyName}</td>
                        <td className="px-4 py-4 text-sm text-gray-800">{bidder.ceoName}</td>
                        <td className="px-4 py-4 text-sm text-gray-800">{bidder.businessRegNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Notice & Blog Section */}
      <section className="py-12 bg-muted/30 mb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notices */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-border bg-accent/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                    공지사항
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/notices')}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    더보기
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {notices.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    등록된 공지사항이 없습니다
                  </div>
                ) : (
                  notices.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => navigate(`/notices/${notice.id}`)}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {notice.is_pinned && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded flex-shrink-0">
                                공지
                              </span>
                            )}
                            <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                              {notice.title}
                            </h3>
                          </div>
                          <p className="text-xs text-gray-500">
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
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                    블로그
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/blog')}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    더보기
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {blogPosts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    등록된 블로그가 없습니다
                  </div>
                ) : (
                  blogPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex gap-4">
                        {post.thumbnail_url && (
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={post.thumbnail_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500">
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
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    고객상담
                  </h2>
                  <p className="text-gray-500 mb-6">
                    고객상담은 1:1문의를 통해서만 접수받고 있습니다.
                  </p>
                  <div className="flex items-start gap-3 mb-6">
                    <ClockIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">상담운영시간</p>
                      <p className="text-gray-500">09:30 - 18:30</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate('/inquiry')}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500"
                  >
                    1:1 문의하기
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
                    <ClockIcon className="w-24 h-24 text-blue-600 opacity-50" />
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
