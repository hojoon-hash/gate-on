// [초보자 참고] 이 파일이 바로 입찰 상세 "페이지" 역할을 합니다.
// [For Beginners] This file acts as the bid detail "page".

import React from 'react';
import { useParams } from 'react-router-dom'; // useParams 훅을 가져옵니다.
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BidDetailView from '@/views/BidDetailView';
import mockBids from '@/mockData/bids.json';
import NotFound from './NotFound'; // 404 페이지 컴포넌트를 가져옵니다.

const BidDetailPage: React.FC = () => {
  // 1. useParams를 사용해 URL의 파라미터(예: /bid/123 에서 '123')를 객체 형태로 가져옵니다.
  //    우리의 라우트 경로는 /bid/:id 이므로, id를 가져올 수 있습니다.
  // 1. Use useParams to get the URL parameters (e.g., '123' from /bid/123) as an object.
  //    Our route path is /bid/:id, so we can get the id.
  const { id } = useParams<{ id: string }>();

  // 2. 전체 목업 데이터 배열에서, URL을 통해 받은 id와 일치하는 id를 가진 입찰 공고 데이터를 찾습니다.
  // 2. Find the bid data object from the entire mock data array whose id matches the id from the URL.
  const bidData = mockBids.find(bid => bid.id === id);

  // 3. 만약 해당 id를 가진 공고를 찾지 못했다면, NotFound 컴포넌트를 보여줍니다.
  // 3. If no bid with that id is found, show the NotFound component.
  if (!bidData) {
    return <NotFound />;
  }

  // 4. 공고를 찾았다면, 이전과 같이 상세 뷰 컴포넌트에 해당 데이터를 prop으로 전달하여 렌더링합니다.
  // 4. If the bid is found, render the detail view component by passing the data as a prop, just like before.
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <BidDetailView bid={bidData} />
      </main>
      <Footer />
    </div>
  );
};

export default BidDetailPage;