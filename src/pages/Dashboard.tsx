
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a logged-in user with mock data
    const mockUser = {
      id: 'mock-user-id',
      email: 'test@example.com',
    };
    setUser(mockUser as any); // Using 'as any' to match the User type shape
  }, []);

  const handleLogout = () => {
    // Simulate logout by navigating to the home page
    console.log('User logged out (mock).');
    navigate('/');
  };

  if (!user) {
    // Render a loading state or null while fetching user
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-gray-800">Dashboard</CardTitle>
              <p className="text-gray-500">Welcome back, <span className="font-semibold text-blue-600">{user.email}</span></p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <h3 className="font-semibold text-green-800">Email Verified</h3>
                <p className="text-green-700">Your account is active and you are ready to explore.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild size="lg" className="h-auto bg-blue-600 hover:bg-blue-500">
                  <Link to="/" className="flex flex-col items-center justify-center p-4">
                    <span className="text-lg font-semibold text-white">입찰 공고 보기</span>
                    <span className="text-sm font-normal text-white">View Latest Bids</span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-auto">
                  <Link to="/account" className="flex flex-col items-center justify-center p-4">
                    <span className="text-lg font-semibold text-gray-800">내 정보 관리</span>
                    <span className="text-sm font-normal text-gray-500">Manage My Account</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button onClick={handleLogout} variant="destructive" className="w-full sm:w-auto">
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
