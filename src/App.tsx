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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/bid/list" element={<BidList />} />
          <Route path="/bid-result/list" element={<BidResultList />} />
          <Route path="/bidder/list" element={<BidderList />} />
          <Route path="/order-plan/list" element={<OrderPlanList />} />
          <Route path="/pre-spec/list" element={<PreSpecList />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:id" element={<NoticeDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/inquiry" element={<Inquiry />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
