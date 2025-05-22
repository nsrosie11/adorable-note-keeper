
import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';

type LayoutProps = {
  children: React.ReactNode;
  username?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, username }) => {
  const { user } = useAuth();
  const displayName = username || user?.email?.split('@')[0] || 'User';
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar username={displayName} />
      <main className="flex-1 container py-6 px-4">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-foreground border-t bg-muted/50">
        <div className="container">
          Notely app by Nasya &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
