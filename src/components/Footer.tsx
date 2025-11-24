// src/components/Footer.tsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto"> {/* mt-auto로 하단에 고정 */}
      <div className="container mx-auto px-4 text-gray-600 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* 로고 및 저작권 */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start mb-2">
              <img src="/src/assets/gateon-logo.jpg" alt="GateOn Logo" className="h-6 mr-2" />
            </Link>
            <p className="mt-2">© {new Date().getFullYear()} GateOn. All Rights Reserved.</p>
          </div>

          {/* 링크 그룹 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">서비스</h4>
              <ul>
                <li><Link to="/bid-list" className="hover:text-blue-600">입찰 공고</Link></li>
                <li><Link to="/bid-result-list" className="hover:text-blue-600">결과 공고</Link></li>
                <li><Link to="/custom-search" className="hover:text-blue-600">맞춤 검색</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">지원</h4>
              <ul>
                <li><Link to="/inquiry" className="hover:text-blue-600">1:1 문의</Link></li>
                <li><Link to="/notices" className="hover:text-blue-600">공지사항</Link></li>
                <li><Link to="/blog" className="hover:text-blue-600">블로그</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">회사</h4>
              <ul>
                <li><Link to="/about" className="hover:text-blue-600">회사 소개</Link></li> {/* Assuming /about page */}
                <li><Link to="/privacy-policy" className="hover:text-blue-600">개인정보처리방침</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-blue-600">이용약관</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;