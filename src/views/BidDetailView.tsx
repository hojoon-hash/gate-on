import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon, PhoneIcon, CurrencyDollarIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

// [초보자 참고] 데이터 타입 정의는 이전과 동일합니다.
// [For Beginners] Data type definitions are the same as before.
interface Bid {
  id: number;
  title: string;
  bidNoticeNo: string;
  industryType: string;
  notifyingInstitution: string;
  demandingInstitution: string;
  contractMethod: string;
  regionLimit: string;
  contactPerson: string;
  contactNumber: string;
  registrationDeadline: string;
  bidStartDate: string;
  bidEndDate: string;
  openingDate: string;
  basicAmount: string;
  presumedPrice: string;
  pricingMethod: string;
  biddingRateLimit: string;
  attachments: { name: string; url: string }[];
}

interface BidDetailViewProps {
  bid: Bid;
}

// [초보자 참고] 재사용을 위해 정보 행을 별도의 컴포넌트로 만들었습니다.
// [For Beginners] The info row has been made a separate component for reusability.
const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b last:border-b-0">
    <span className="w-full sm:w-1/3 font-semibold text-gray-500 mb-1 sm:mb-0">{label}</span>
    <span className="w-full sm:w-2/3 text-gray-800 font-medium">{value}</span>
  </div>
);

const formatDate = (dateString: string) => {
  if (!dateString) return '정보 없음';
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false
  }).replace(/\. /g, '-').replace(/\.$/, '').replace(/ /g,'');
};

const BidDetailView: React.FC<BidDetailViewProps> = ({ bid }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* --- Main Title and Badges --- */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline">{bid.industryType}</Badge>
          <Badge variant="outline">{bid.contractMethod}</Badge>
          <Badge variant="outline">{bid.regionLimit}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {bid.title}
        </h1>
      </div>

      {/* --- Schedule Section --- */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarIcon className="w-5 h-5" /> 입찰 주요 일정</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[ 
            { label: '참가등록 마감', date: bid.registrationDeadline },
            { label: '입찰 개시', date: bid.bidStartDate },
            { label: '입찰 마감', date: bid.bidEndDate },
            { label: '개찰', date: bid.openingDate },
          ].map(item => (
            <div key={item.label} className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-gray-500">{item.label}</p>
              <p className="text-lg font-bold text-primary">{formatDate(item.date)}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* --- Basic Info Section --- */}
          <Card>
            <CardHeader>
              <CardTitle>공고 기본 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoRow label="공고번호" value={bid.bidNoticeNo} />
              <InfoRow label="공고기관" value={bid.notifyingInstitution} />
              <InfoRow label="수요기관" value={bid.demandingInstitution} />
              <InfoRow label="계약방법" value={bid.contractMethod} />
            </CardContent>
          </Card>

          {/* --- Pricing Info Section --- */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CurrencyDollarIcon className="w-5 h-5"/> 금액 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoRow label="기초금액" value={<span className="text-red-600 text-lg">{bid.basicAmount} 원</span>} />
              <InfoRow label="추정가격" value={<span className="text-red-600 text-lg">{bid.presumedPrice} 원</span>} />
              <InfoRow label="예가방법" value={bid.pricingMethod} />
              <InfoRow label="투찰 하한율" value={bid.biddingRateLimit} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* --- Contact Info Section --- */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserIcon className="w-5 h-5"/> 담당자 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoRow label="담당자" value={bid.contactPerson} />
              <InfoRow label="연락처" value={<a href={`tel:${bid.contactNumber}`} className="text-blue-600 hover:underline">{bid.contactNumber}</a>} />
            </CardContent>
          </Card>

          {/* --- Attachments Section --- */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DocumentTextIcon className="w-5 h-5"/> 첨부 파일</CardTitle>
            </CardHeader>
            <CardContent>
              {bid.attachments.length > 0 ? (
                <ul className="space-y-2">
                  {bid.attachments.map((file) => (
                    <li key={file.name}>
                      <a href={file.url} className="flex items-center gap-2 text-blue-600 hover:underline">
                        <DocumentTextIcon className="w-4 h-4" />
                        <span>{file.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">첨부된 파일이 없습니다.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default BidDetailView;