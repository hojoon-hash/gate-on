import logo from "@/assets/gateon-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <img src={logo} alt="GateOn" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">
              초기 창업기업을 위한<br />AI 기반 입찰 추천 플랫폼
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">서비스 소개</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">이용 방법</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">요금제</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">지원</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">고객 지원</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">이용 가이드</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">회사</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">회사 소개</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">이용약관</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 GateOn. All rights reserved.</p>
          <p className="mt-2 text-xs">
            본 서비스는 공공데이터포털의 나라장터 API를 활용하며, 상업적 이용이 가능하나 시스템 부하 유발 및 범죄 악용은 금지됩니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
