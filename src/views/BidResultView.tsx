import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// [초보자 참고] TypeScript 인터페이스를 사용해 데이터의 구조를 미리 정의합니다.
// 이렇게 하면 'result' prop으로 어떤 데이터가 들어와야 하는지 명확해지고, 자동완성 기능도 활성화됩니다.
// [For Beginners] We use TypeScript interfaces to pre-define the structure of our data.
// This clarifies what data should come in through the 'result' prop and enables auto-completion.

// 입찰 공고 요약 정보
interface BidInfo {
  noticeNo: string;
  title: string;
  institution: string;
  openingDate: string;
  estimatedPrice: string;
}

// 결과 공고 요약 정보
interface ResultSummary {
  winnerName: string;
  bidAmount: string;
  bidRate: string;
  adjustmentRate: string;
  lowerLimitPrice: string;
}

// 복수예가 정보
interface PrelimPrice {
  price: string;
  selected: boolean;
}

interface PrelimPricesInfo {
  prices: PrelimPrice[];
  selectionCount: number;
}

// 개찰 순위 (입찰자) 정보
interface Bidder {
  rank: number;
  name: string;
  bidAmount: string;
  bidRate: string;
  remarks: string;
}

// 전체 개찰 결과 데이터 구조
interface BidResult {
  bidInfo: BidInfo;
  resultSummary: ResultSummary;
  prelimPrices: PrelimPricesInfo;
  bidders: Bidder[];
}

// 컴포넌트가 받을 props의 타입 정의
interface BidResultViewProps {
  result: BidResult;
}

// [초보자 참고] 재사용 가능한 UI 조각을 위한 작은 컴포넌트입니다.
// 제목과 내용을 받아 섹션을 예쁘게 보여주는 역할을 합니다.
// [For Beginners] A small, reusable UI piece. It takes a title and content
// to display a section nicely.
const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300">{title}</h2>
    {children}
  </div>
);

// [초보자 참고] 테이블의 한 행을 그리는 작은 컴포넌트입니다.
// [For Beginners] A small component for rendering a single row in a table.
const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex border-b py-2">
    <span className="w-1/3 font-semibold text-gray-600">{label}</span>
    <span className="w-2/3 text-gray-800">{value}</span>
  </div>
);


// [초보자 참고] 메인 컴포넌트입니다. 개찰 결과 전체 데이터를 'result' prop으로 받아서 화면에 그려줍니다.
// [For Beginners] This is the main component. It receives all the bid result data via the 'result' prop and renders it.
const BidResultView: React.FC<BidResultViewProps> = ({ result }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

  // [초보자 참고] 페이지네이션 계산 로직
  // [For Beginners] Pagination calculation logic

  // 1. 전체 페이지 수 계산
  // allBidders.length: 전체 아이템 개수 (예: 35)
  // itemsPerPage: 페이지당 아이템 수 (예: 10)
  // Math.ceil()은 소수점을 올림하여 전체 페이지 수를 구합니다. (예: 3.5 -> 4 페이지)
  const totalPages = Math.ceil(result.bidders.length / itemsPerPage);

  // 2. 현재 페이지에 보여줄 데이터의 시작/끝 인덱스 계산
  // currentPage가 2라면, startIndex는 (2-1)*10 = 10, endIndex는 10+10 = 20이 됩니다.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 3. 데이터 슬라이싱: 원본 배열에서 현재 페이지에 해당하는 부분만 잘라냅니다.
  // array.slice(startIndex, endIndex)는 startIndex부터 endIndex '전'까지의 항목을 복사하여 새 배열을 만듭니다.
  // 예: .slice(10, 20)는 인덱스 10부터 19까지의 아이템을 가져옵니다.
  const currentBidders = result.bidders.slice(startIndex, endIndex);

  // 페이지 변경을 처리하는 함수
  const handlePageChange = (page: number) => {
    // 요청된 페이지 번호가 1과 전체 페이지 수 사이에 있을 때만 상태를 변경합니다.
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      
      {/* 입찰 공고 요약 섹션 */}
      <InfoSection title="입찰 공고 요약">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <InfoRow label="공고번호" value={result.bidInfo.noticeNo} />
          <InfoRow label="공고기관" value={result.bidInfo.institution} />
          <InfoRow label="공고명" value={result.bidInfo.title} />
          <InfoRow label="개찰일시" value={formatDate(result.bidInfo.openingDate)} />
          <InfoRow label="예정가격" value={result.bidInfo.estimatedPrice} />
        </div>
      </InfoSection>

      {/* 결과 공고 요약 섹션 */}
      <InfoSection title="결과 공고 요약">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <InfoRow label="1순위 업체" value={<span className="font-bold text-blue-600">{result.resultSummary.winnerName}</span>} />
          <InfoRow label="사정률" value={result.resultSummary.adjustmentRate} />
          <InfoRow label="투찰금액" value={result.resultSummary.bidAmount} />
          <InfoRow label="예정가격" value={result.bidInfo.estimatedPrice} />
          <InfoRow label="투찰률" value={result.resultSummary.bidRate} />
          <InfoRow label="낙찰하한가" value={result.resultSummary.lowerLimitPrice} />
        </div>
      </InfoSection>

      {/* 복수예가 정보 섹션 */}
      <InfoSection title="복수예가 정보">
        <div className="border rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {result.prelimPrices.prices.map((p, index) => (
              <div key={index} className={`p-2 border rounded text-center ${p.selected ? 'bg-blue-100 border-blue-400 font-bold' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-500">{index + 1}번</p>
                <p className="text-gray-800">{p.price}</p>
                {p.selected && <span className="text-xs text-blue-600">(추첨)</span>}
              </div>
            ))}
          </div>
          <p className="text-right text-sm text-gray-600 mt-4">
            총 {result.prelimPrices.prices.length}개 중 {result.prelimPrices.selectionCount}개 추첨
          </p>
        </div>
      </InfoSection>

      {/* 개찰 순위 섹션 */}
      <InfoSection title="개찰 순위">
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-center">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-sm font-semibold text-gray-700">순위</th>
                <th className="p-3 text-sm font-semibold text-gray-700">상호</th>
                <th className="p-3 text-sm font-semibold text-gray-700">투찰금액</th>
                <th className="p-3 text-sm font-semibold text-gray-700">투찰률</th>
                <th className="p-3 text-sm font-semibold text-gray-700">비고</th>
              </tr>
            </thead>
            <tbody>
              {/* [초보자 참고] 이제 전체 데이터(result.bidders)가 아닌, 현재 페이지용으로 잘라낸 'currentBidders'를 사용해 테이블을 그립니다. */}
              {/* [For Beginners] Now, we use 'currentBidders', the sliced data for the current page, to render the table instead of the full 'result.bidders' data. */}
              {currentBidders.map((bidder) => (
                <tr key={bidder.rank} className={`border-b ${bidder.rank === 1 ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                  <td className="p-3 text-sm text-gray-800">{bidder.rank}</td>
                  <td className="p-3 text-sm text-gray-800 text-left">{bidder.name}</td>
                  <td className="p-3 text-sm text-gray-800 text-right">{bidder.bidAmount}</td>
                  <td className="p-3 text-sm text-gray-800">{bidder.bidRate}</td>
                  <td className="p-3 text-sm text-gray-800">{bidder.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 컴포넌트 */}
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              {/* [초보자 참고] 조건부 비활성화: 현재 페이지가 1이면, Tailwind CSS 클래스를 적용해 버튼을 비활성화된 것처럼 보이게 합니다. */}
              {/* [For Beginners] Conditional Disabling: If the current page is 1, apply Tailwind CSS classes to make the button look disabled. */}
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {/* [초보자 참고] 조건부 비활성화: 현재 페이지가 마지막 페이지이면, 버튼을 비활성화된 것처럼 보이게 합니다. */}
              {/* [For Beginners] Conditional Disabling: If the current page is the last page, make the button look disabled. */}
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </InfoSection>

    </div>
  );
};

export default BidResultView;
