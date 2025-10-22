import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  BookmarkIcon, 
  ClockIcon, // ArrowTrendingUpIcon을 ClockIcon으로 변경
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ArrowRightIcon 
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { format } from "date-fns";

// [초보자 참고] 새로 만든 가짜(Mock) 데이터를 가져옵니다.
// [For Beginners] Import the newly created mock data.
import mockBids from "@/mockData/bids.json";
import mockResults from "@/mockData/results.json";
import mockBidders from "@/mockData/bidders.json";
import mockNotices from "@/mockData/notices.json";
import mockBlogPosts from "@/mockData/blogPosts.json";

const Index = () => {
  // --- 상태 관리 (State Management) ---
  // [초보자 참고] useState는 컴포넌트가 기억해야 할 값(상태)을 관리하는 React의 기능(Hook)입니다.
  // [For Beginners] useState is a React Hook that lets you add a state variable to your component.
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('bids');
  
  // --- 데이터 (Data) ---
  // [초보자 참고] 이 컴포넌트에서 사용할 데이터 목록입니다. 현재는 가짜 데이터를 직접 사용합니다.
  // [For Beginners] This is the data list used in this component. Currently, it uses mock data directly.
  const totalSlides = 3; // 배너 슬라이드 개수

  // --- JSX 렌더링 (JSX Rendering) ---
  // [초보자 참고] 이 부분이 실제 화면에 표시될 내용을 구성하는 코드입니다.
  // [For Beginners] This is the code that defines what will be displayed on the screen.
    return (
      <>
        {/* ==================================================================
         *  1. 메인 배너 (Hero Section)
         *  - 페이지의 가장 상단에서 사용자의 시선을 끄는 역할을 합니다.
         * ================================================================== */}
        <section className="bg-blue-600 pt-24 pb-12 text-white">
          <div className="container mx-auto px-4 relative">
            <div className="text-center py-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                수만 건의 공고 헤매지 마세요!<br />
                우리 회사 '맞춤 입찰'만 골라 받고,<br />
                자격 요건 '검증'까지 한 번에!
              </h1>
            </div>
            {/* 캐러셀 네비게이션 UI (기능은 미구현) */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(totalSlides)].map((_, i) => (
                <button key={i} className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
              ))}
                      </div>
                    </div>
                  </section>
                <div className="container mx-auto px-4 py-8">      {/* ==================================================================
       *  2. 로그인/회원가입 버튼 (Login/Signup Button)
       * ================================================================== */}
      <section className="text-center my-8">
        <Link
          to="/auth"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-12 rounded-lg text-lg transition-colors"
        >
          로그인/회원가입
        </Link>
      </section>

      {/* ==================================================================
       *  3. 빠른 실행 아이콘 (Quick Action Icons)
       * ================================================================== */}
      <section className="my-12">
        <div className="flex justify-around items-center py-8">
          <Link to="/custom-search" className="group flex flex-col items-center">
            <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-blue-600 mb-2" />
            <span className="font-semibold group-hover:text-blue-600 text-base">맞춤 검색 관리</span>
          </Link>
          <Link to="/notification-settings" className="group flex flex-col items-center">
            <BellIcon className="w-12 h-12 mx-auto text-blue-600 mb-2" />
            <span className="font-semibold group-hover:text-blue-600 text-base">알림 메일 설정</span>
          </Link>
          <Link to="/deadline-soon" className="group flex flex-col items-center">
            <ClockIcon className="w-12 h-12 mx-auto text-blue-600 mb-2" />
            <span className="font-semibold group-hover:text-blue-600 text-base">마감 임박</span>
          </Link>
          <Link to="/favorites" className="group flex flex-col items-center">
            <BookmarkIcon className="w-12 h-12 mx-auto text-blue-600 mb-2" />
            <span className="font-semibold group-hover:text-blue-600 text-base">즐겨찾기 관리</span>
          </Link>
        </div>
      </section>

      {/* ==================================================================
       *  4. 탭 콘텐츠 (Tab Content) - 기존 구조 유지
       * ================================================================== */}
      <section className="my-12">
        <div className="border-b">
          <div className="flex gap-1">
            <button onClick={() => setActiveTab('bids')} className={`px-6 py-3 border-b-2 font-semibold text-base ${activeTab === 'bids' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>최신 입찰공고</button>
            <button onClick={() => setActiveTab('results')} className={`px-6 py-3 border-b-2 font-semibold text-base ${activeTab === 'results' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>최신 결과공고</button>
            <button onClick={() => setActiveTab('bidders')} className={`px-6 py-3 border-b-2 font-semibold text-base ${activeTab === 'bidders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>최신 수주기업</button>
          </div>
        </div>
        <div className="py-6">
          {activeTab === 'bids' && (
            <Card>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="p-3 font-medium text-sm">공고명</th>
                    <th className="p-3 font-medium text-sm">공고기관</th>
                    <th className="p-3 font-medium text-sm">마감일시</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBids.map(bid => (
                    <tr key={bid.id} className="border-t">
                      <td className="p-3 text-sm"><Link to={`/bid/${bid.id}`} className="hover:underline">{bid.title}</Link></td>
                      <td className="p-3 text-gray-600 text-sm">{bid.institution}</td>
                      <td className="p-3 text-gray-600 text-sm">{bid.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
          {activeTab === 'results' && (
            <Card>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="p-3 font-medium text-sm">공고명</th>
                    <th className="p-3 font-medium text-sm">낙찰업체</th>
                    <th className="p-3 font-medium text-sm">개찰일시</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.map(result => (
                    <tr key={result.id} className="border-t">
                      <td className="p-3 text-sm"><Link to={`/bid-result/${result.id}`} className="hover:underline">{result.공고명}</Link></td>
                      <td className="p-3 text-gray-600 text-sm">{result.낙찰업체}</td>
                      <td className="p-3 text-gray-600 text-sm">{format(new Date(result.개찰일시), 'yyyy-MM-dd HH:mm')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
          {activeTab === 'bidders' && (
            <Card>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="p-3 font-medium text-sm">업체명</th>
                    <th className="p-3 font-medium text-sm">최근 수주 공고</th>
                    <th className="p-3 font-medium text-sm">수주 일자</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBidders.map(bidder => (
                    <tr key={bidder.id} className="border-t">
                      <td className="p-3 text-sm">{bidder.companyName}</td>
                      <td className="p-3 text-sm"><Link to={`/bid-result/${bidder.recentBid.number}`} className="hover:underline">{bidder.recentBid.title}</Link></td>
                      <td className="p-3 text-gray-600 text-sm">{bidder.recentBid.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      </section>

      {/* ==================================================================
       *  5. 공지사항 & 블로그 (Notices & Blog)
       * ================================================================== */}
      <section className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 공지사항 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">공지사항</h2>
              <Link to="/notices" className="text-sm text-gray-500 hover:text-blue-600 text-base">더보기 &gt;</Link>
            </div>
            <div className="border-t border-b divide-y">
              {mockNotices.map(notice => (
                <div key={notice.id} className="flex justify-between items-center py-3">
                  <Link to={`/notices/${notice.id}`} className="truncate hover:underline text-base">{notice.title}</Link>
                  <span className="text-sm text-gray-400 flex-shrink-0 ml-4">{notice.date}</span>
                </div>
              ))}
            </div>
          </div>
          {/* 블로그 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">블로그</h2>
              <Link to="/blog" className="text-sm text-gray-500 hover:text-blue-600 text-base">더보기 &gt;</Link>
            </div>
            <div className="border-t border-b divide-y">
              {mockBlogPosts.map(post => (
                <div key={post.id} className="flex justify-between items-center py-3">
                  <Link to={`/blog/${post.id}`} className="truncate hover:underline text-base">{post.title}</Link>
                  <span className="text-sm text-gray-400 flex-shrink-0 ml-4">{post.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
       *  6. 고객 상담 (Customer Support)
       * ================================================================== */}
      <section className="my-12">
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <ClockIcon className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-bold text-lg">고객 상담</h3>
                <p className="text-sm text-gray-600">운영 시간: 평일 09:30 - 18:30</p>
              </div>
            </div>
            <Link to="/support" className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors text-base">
              1:1 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Index;