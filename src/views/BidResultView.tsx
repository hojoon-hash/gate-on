import React from 'react';

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
  
  // [초보자 참고] 날짜 형식을 'YYYY-MM-DD HH:mm'으로 바꿔주는 함수입니다.
  // [For Beginners] A function to format dates into 'YYYY-MM-DD HH:mm'.
  const formatDate = (dateString: string) => {
    if (!dateString) return '정보 없음';
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    }).replace(/\. /g, '-').replace(/\.$/, '').replace(/ /g,'');
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
            {/* [초보자 참고] a,b,c,d,e 태그는 테이블의 구조를 정의합니다. */}
            {/* [For Beginners] The thead, tbody, tr, th, and td tags define the table's structure. */}
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
              {/* [초보자 참고] .map() 함수를 사용해 입찰자 목록을 순회하며 테이블 행(<tr>)을 만듭니다. */}
              {/* [For Beginners] The .map() function is used to loop through the list of bidders and create table rows (<tr>). */}
              {result.bidders.map((bidder) => (
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
        {/* [초보자 참고] 페이지네이션은 나중에 구현될 기능으로, 지금은 자리를 비워둡니다. */}
        {/* [For Beginners] Pagination is a feature to be implemented later, so we leave a placeholder for now. */}
        <div className="mt-4 text-center text-gray-500">[페이지네이션 영역]</div>
      </InfoSection>

    </div>
  );
};

export default BidResultView;
