
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, FileText } from "lucide-react";

type NavbarProps = {
  username?: string;
};

const Navbar: React.FC<NavbarProps> = ({ username = "User" }) => {
  const handleLogout = () => {
    // Placeholder function - will need Supabase integration
    window.location.href = '/';
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <FileText size={24} className="mr-2 text-note-purple" />
          <h1 className="text-xl font-bold">Notes App</h1>
        </div>
        
        {username && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:inline-block">
              Hi, {username}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut size={16} />
              <span className="hidden md:inline-block">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
