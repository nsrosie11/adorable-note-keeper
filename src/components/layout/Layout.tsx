
import React from 'react';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
  username?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, username }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar username={username} />
      <main className="flex-1 container py-6 px-4">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <div className="container">
          Notes App &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
