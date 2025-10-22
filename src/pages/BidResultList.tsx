import { useState } from "react";
import { Link } from "react-router-dom";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { format } from "date-fns";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import mockData from "@/mockData/detailedResults.json";

// 초보자 참고: 페이지네이션 및 데이터 표시를 위한 설정
const ITEMS_PER_PAGE = 3; // 한 페이지에 보여줄 항목 수

const BidResultList = () => {
  // 초보자 참고: 현재 페이지 번호를 기억하기 위한 상태
  // 'currentPage'는 현재 페이지 번호, 'setCurrentPage'는 이 번호를 변경하는 함수입니다.
  const [currentPage, setCurrentPage] = useState(1);

  // 초보자 참고: 페이지네이션 계산
  const totalItems = mockData.length; // 전체 데이터 개수
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE); // 전체 페이지 수 계산

  // 현재 페이지에 보여줄 데이터만 잘라내기
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, endIndex);

  // 페이지 변경 핸들러 함수
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // 숫자 포맷 함수 (예: 1,500,000,000원)
  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  }

  return (
    <div className="min-h-screen bg-background">

      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">결과 공고</h1>
            <span className="text-sm text-muted-foreground">
              총 {totalItems}건
            </span>
          </div>

          {/* 초보자 참고: 테이블 구조 (<table>, <thead>, <tbody>, <tr>, <th>, <td>)
           * <table>: 전체 테이블을 감쌉니다.
           * <thead>: 테이블의 헤더(제목) 부분을 정의합니다.
           * <tbody>: 테이블의 본문(내용) 부분을 정의합니다.
           * <tr>: 테이블의 행(row)을 정의합니다.
           * <th>: 헤더 행의 각 셀(cell)을 정의합니다. (Header Cell)
           * <td>: 본문 행의 각 셀(cell)을 정의합니다. (Data Cell)
           */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* 초보자 참고: Tailwind CSS로 스타일링 예시
                   * px-4: 좌우 패딩(padding) 4단위
                   * py-3: 상하 패딩(padding) 3단위
                   * text-left: 텍스트 왼쪽 정렬
                   * text-xs: 아주 작은 폰트 크기
                   * font-semibold: 폰트 굵기 semi-bold
                   * text-gray-500: 텍스트 색상 회색
                   * uppercase: 텍스트를 대문자로
                   * tracking-wider: 글자 간격(자간) 넓게
                   */}
                  <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">관심</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">번호</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">공고명 / 분류</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">계약방법<br/>추정가격</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">지역</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">공고기관<br/>수요기관</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">게시일시<br/>개찰일시</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">1순위 업체 (입찰기업수)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <button className="text-gray-400 hover:text-yellow-500">
                        {item.interest ? <StarIconSolid className="w-5 h-5 text-yellow-500" /> : <StarIconOutline className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* 초보자 참고: 한 셀(<td>) 안에 여러 줄 표시하기
                       * <div> 태그로 각 줄을 감싸고, 부모 <td>에 flex-col을 적용하거나 그냥 block 요소로 두면 자동으로 수직 정렬됩니다.
                       */}
                      <div>
                        <Link to={`/bid-result/${item.id}`} className="text-sm font-semibold text-blue-600 hover:underline">
                          {item.title}
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500">({item.category})</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{item.method}</div>
                      <div className="text-xs">{formatCurrency(item.estimatedPrice)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{item.orgName}</div>
                      <div className="text-xs text-gray-400">{item.demandName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{format(new Date(item.postedDate), 'yyyy-MM-dd HH:mm')}</div>
                      <div className="text-xs">{format(new Date(item.openingDate), 'yyyy-MM-dd HH:mm')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.firstBidder} <span className="text-xs text-gray-500">({item.bidderCount})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 초보자 참고: 페이지네이션 로직
           * 1. '이전' 버튼: 현재 페이지가 1보다 클 때만 활성화됩니다.
           * 2. 페이지 번호 버튼: Array.from으로 총 페이지 수만큼 배열을 만들고, map으로 각 번호에 대한 버튼을 생성합니다.
           *    - 현재 보고 있는 페이지 번호는 다른 스타일(파란색 배경)을 적용하여 구별합니다.
           * 3. '다음' 버튼: 현재 페이지가 마지막 페이지보다 작을 때만 활성화됩니다.
           */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BidResultList;