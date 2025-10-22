// src/components/Header.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming Button component exists

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* GateOn 로고 */}
        <Link to="/" className="flex items-center">
          <img src="/src/assets/gateon-logo.jpg" alt="GateOn Logo" className="h-8 mr-2" />
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/bid-list" className="text-gray-600 hover:text-blue-600 font-medium">입찰 공고</Link>
          <Link to="/bid-result-list" className="text-gray-600 hover:text-blue-600 font-medium">결과 공고</Link>
          <Link to="/bidders" className="text-gray-600 hover:text-blue-600 font-medium">입찰 기업</Link>
          <Link to="/order-plans" className="text-gray-600 hover:text-blue-600 font-medium">발주 계획</Link>
          <Link to="/pre-specs" className="text-gray-600 hover:text-blue-600 font-medium">사전 규격</Link>
        </nav>

        {/* 로그인 및 무료 시작 버튼 */}
        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">로그인</Button>
          </Link>
          <Link to="/signup"> {/* Assuming /signup for "무료로 시작하기" */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">무료로 시작하기</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;