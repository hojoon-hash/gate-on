import React from 'react';

// 초보자 참고: React 컴포넌트는 웹 페이지의 특정 부분을 만드는 '레고 블록'과 같습니다.
// CompanyDetailView는 기업의 상세 정보를 보여주는 하나의 큰 블록이 됩니다.
// 'prop'은 이 블록(컴포넌트)에 외부에서 정보를 전달하는 방법입니다.
// 여기서는 'companyData'라는 prop을 통해 기업의 모든 상세 정보를 받아옵니다.

// 1. `companyData` prop의 타입을 정의합니다.
// 실제 API 데이터와 다를 수 있으므로, 현재는 이미지와 요구사항을 기반으로 추정합니다.
interface CompanyData {
  companyInfo: {
    name: string; // 상호
    ceo: string; // 대표자
    address: string; // 주소
    phone: string; // 전화
    fax: string; // 팩스
    foundedDate: string; // 설립일
    capital: string; // 자본금
    employees: string; // 종업원수
    creditRating: string; // 신용등급
  };
  agentInfo: {
    name: string; // 담당자명
    department: string; // 부서
    position: string; // 직위
    phone: string; // 연락처
    email: string; // 이메일
  };
  constructionHistory: Array<{
    projectName: string; // 공고명
    client: string; // 발주처
    contractDate: string; // 계약일
    completionDate: string; // 준공일
    amount: string; // 계약금액
    type: string; // 업종
  }>;
  techHoldings: Array<{
    techName: string; // 기술명
    regDate: string; // 등록일
    expiryDate: string; // 유효기간
  }>;
}

// 6. 컴포넌트 내부에서 사용할 임시 가짜 데이터 (Mock Data)
// 이 데이터는 컴포넌트가 prop 없이도 독립적으로 렌더링되어 화면을 확인할 수 있도록 돕습니다.
const mockCompanyData: CompanyData = {
  companyInfo: {
    name: '진흥건설산업 주식회사',
    ceo: '김진흥',
    address: '서울특별시 강남구 테헤란로 123, 10층 (역삼동, 진흥빌딩)',
    phone: '02-1234-5678',
    fax: '02-1234-5679',
    foundedDate: '1998-03-15',
    capital: '10억원',
    employees: '50명',
    creditRating: 'AAA',
  },
  agentInfo: {
    name: '이영업',
    department: '영업부',
    position: '과장',
    phone: '010-9876-5432',
    email: 'sales.lee@jinhung.com',
  },
  constructionHistory: [
    {
      projectName: '강남 오피스 빌딩 신축 공사',
      client: '㈜미래개발',
      contractDate: '2023-01-01',
      completionDate: '2024-03-30',
      amount: '500억원',
      type: '건축',
    },
    {
      projectName: '판교 데이터센터 증축 공사',
      client: '㈜클라우드솔루션',
      contractDate: '2022-07-10',
      completionDate: '2023-12-15',
      amount: '300억원',
      type: '토목',
    },
    {
      projectName: '부산 신항만 확장 공사',
      client: '해양수산부',
      contractDate: '2021-05-20',
      completionDate: '2022-11-01',
      amount: '1,000억원',
      type: '항만',
    },
  ],
  techHoldings: [
    {
      techName: '친환경 콘크리트 배합 기술',
      regDate: '2020-01-10',
      expiryDate: '2030-01-09',
    },
    {
      techName: '스마트 건설 현장 관리 시스템',
      regDate: '2021-06-20',
      expiryDate: '2031-06-19',
    },
  ],
};

const CompanyDetailView: React.FC<{ companyData?: CompanyData }> = ({ companyData }) => {
  // prop으로 companyData가 넘어오지 않으면 mockCompanyData를 사용합니다.
  const data = companyData || mockCompanyData;

  // 초보자 참고: HTML 테이블은 <table> 태그로 시작하며,
  // <thead>는 테이블의 머리글(컬럼 이름)을, <tbody>는 실제 데이터 행을 담습니다.
  // <tr>은 테이블의 한 행(Row)을, <th>는 머리글 셀(Header Cell)을, <td>는 데이터 셀(Data Cell)을 나타냅니다.
  // Tailwind CSS 클래스 (예: 'border', 'px-4', 'py-2')를 사용하여 테이블에 선을 긋거나 셀 간격을 조절할 수 있습니다.

  return (
    <div className="container mx-auto px-4 py-8 font-pretendard">
      {/* 4.1. '진흥건설산업 주식회사 기본 정보' 섹션 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {data.companyInfo.name} 기본 정보
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">상호</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">대표자</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.ceo}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">주소</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.address}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">전화</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.phone}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">팩스</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.fax}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">설립일</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.foundedDate}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">자본금</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.capital}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">종업원수</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.employees}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">신용등급</th>
                <td className="px-4 py-2 text-gray-800">{data.companyInfo.creditRating}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4.2. '진흥건설산업 주식회사 담당자 정보' 섹션 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {data.companyInfo.name} 담당자 정보
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">담당자명</th>
                <td className="px-4 py-2 text-gray-800">{data.agentInfo.name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">부서</th>
                <td className="px-4 py-2 text-gray-800">{data.agentInfo.department}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">직위</th>
                <td className="px-4 py-2 text-gray-800">{data.agentInfo.position}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">연락처</th>
                <td className="px-4 py-2 text-gray-800">{data.agentInfo.phone}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 px-4 py-2 font-medium text-gray-700 w-1/4">이메일</th>
                <td className="px-4 py-2 text-gray-800">{data.agentInfo.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4.3. 'Smart 연관 지도' 섹션 (구현 제외) */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart 연관 지도</h2>
        <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-500">
          지도 기능은 추후 구현 예정입니다.
        </div>
      </section>

      {/* 4.4. '공사 실적' 섹션 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">공사 실적</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 font-medium text-gray-700">공고명</th>
                <th className="px-4 py-2 font-medium text-gray-700">발주처</th>
                <th className="px-4 py-2 font-medium text-gray-700">계약일</th>
                <th className="px-4 py-2 font-medium text-gray-700">준공일</th>
                <th className="px-4 py-2 font-medium text-gray-700">계약금액</th>
                <th className="px-4 py-2 font-medium text-gray-700">업종</th>
              </tr>
            </thead>
            <tbody>
              {data.constructionHistory.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-4 py-2 text-gray-800">{item.projectName}</td>
                  <td className="px-4 py-2 text-gray-800">{item.client}</td>
                  <td className="px-4 py-2 text-gray-800">{item.contractDate}</td>
                  <td className="px-4 py-2 text-gray-800">{item.completionDate}</td>
                  <td className="px-4 py-2 text-gray-800">{item.amount}</td>
                  <td className="px-4 py-2 text-gray-800">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 UI 플레이스홀더 */}
        <div className="flex justify-center mt-4 text-gray-500">
          &lt; 1 2 3 &gt;
        </div>
      </section>

      {/* 4.5. '보유 기술' 섹션 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">보유 기술</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 font-medium text-gray-700">기술명</th>
                <th className="px-4 py-2 font-medium text-gray-700">등록일</th>
                <th className="px-4 py-2 font-medium text-gray-700">유효기간</th>
              </tr>
            </thead>
            <tbody>
              {data.techHoldings.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-4 py-2 text-gray-800">{item.techName}</td>
                  <td className="px-4 py-2 text-gray-800">{item.regDate}</td>
                  <td className="px-4 py-2 text-gray-800">{item.expiryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 UI 플레이스홀더 */}
        <div className="flex justify-center mt-4 text-gray-500">
          &lt; 1 2 3 &gt;
        </div>
      </section>
    </div>
  );
};

export default CompanyDetailView;
