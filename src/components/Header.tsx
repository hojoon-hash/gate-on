import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/gateon-logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="GateOn" className="h-8 w-auto" />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/bid/list" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            입찰 공고
          </Link>
          <Link to="/bid-result/list" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            결과 공고
          </Link>
          <Link to="/bidder/list" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            입찰 기업
          </Link>
          <Link to="/order-plan/list" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            발주계획
          </Link>
          <Link to="/pre-spec/list" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            사전규격
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
            로그인
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate("/auth")}>
            무료로 시작하기
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
