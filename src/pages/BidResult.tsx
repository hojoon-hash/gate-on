
// [초보자 참고] 이 파일이 개찰 결과 "페이지" 역할을 합니다.
// [For Beginners] This file acts as the bid result "page".

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 1. 방금 만든 개찰 결과 뷰 컴포넌트와 목업 데이터를 가져옵니다.
// 1. Import the result view component we just made and the mock data.
import BidResultView from '@/views/BidResultView';
import mockResult from '@/mockData/bidResult.json';

const BidResultPage: React.FC = () => {
  // 2. 목업 데이터를 변수에 저장합니다.
  //    나중에는 URL에서 ID를 가져와 API로 실제 데이터를 불러오게 됩니다.
  // 2. Store the mock data in a variable.
  //    Later, you will fetch real data from an API using an ID from the URL.
  const resultData = mockResult;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        {/* 3. 개찰 결과 뷰 컴포넌트를 화면에 렌더링하고, 'result'라는 prop으로 데이터를 전달합니다. */}
        {/* 3. Render the result view component and pass the data to it via the 'result' prop. */}
        <BidResultView result={resultData} />
      </main>
      <Footer />
    </div>
  );
};

export default BidResultPage;
