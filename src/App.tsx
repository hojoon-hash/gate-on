import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import BidList from "./pages/BidList";
import BidResultList from "./pages/BidResultList";
import BidderList from "./pages/BidderList";
import OrderPlanList from "./pages/OrderPlanList";
import PreSpecList from "./pages/PreSpecList";
import Notices from "./pages/Notices";
import NoticeDetail from "./pages/NoticeDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Inquiry from "./pages/Inquiry";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BidDetailPage from "./pages/BidDetail";
import BidResultPage from "./pages/BidResult";
import Dashboard from "./pages/Dashboard";
import CustomSearch from "./pages/CustomSearch";
import NotificationSettings from "./pages/NotificationSettings";
import DeadlineSoon from "./pages/DeadlineSoon";
import Favorites from "./pages/Favorites";
import CompanyDetailView from "./views/CompanyDetailView";

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// [초보자 참고] 공통 레이아웃 컴포넌트입니다.
// Header, Footer, 그리고 그 사이에 페이지별 내용이 채워질 <Outlet />으로 구성됩니다.
// [For Beginners] This is the common layout component.
// It consists of a Header, a Footer, and an <Outlet /> in between where page-specific content will be filled.
const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    {/* flex-grow는 남은 공간을 모두 채우라는 의미로, Footer가 항상 페이지 하단에 위치하도록 만듭니다. */}
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* [초보자 참고] Layout Route가 모든 페이지 Route를 감싸는 구조입니다. */}
          {/* [For Beginners] The Layout Route wraps all the page Routes. */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/custom-search" element={<CustomSearch />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="/deadline-soon" element={<DeadlineSoon />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/bid-list" element={<BidList />} />
            <Route path="/bid-result-list" element={<BidResultList />} />
            <Route path="/bidders" element={<BidderList />} />
            <Route path="/order-plans" element={<OrderPlanList />} />
            <Route path="/pre-specs" element={<PreSpecList />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/bid/:id" element={<BidDetailPage />} />
            <Route path="/bid-result/:id" element={<BidResultPage />} />
            <Route path="/company/:id" element={<CompanyDetailView />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
