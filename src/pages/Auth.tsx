
import React, { useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { FileText } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md mb-8 flex flex-col items-center animate-fade-in">
        <FileText size={48} className="mb-2 text-note-purple" />
        <h1 className="text-3xl font-bold mb-2">Notes App</h1>
        <p className="text-muted-foreground text-center">
          A simple way to save and organize your thoughts
        </p>
      </div>
      
      <AuthForm 
        isLogin={isLogin} 
        onToggleForm={() => setIsLogin(!isLogin)} 
      />
    </div>
  );
};

export default Auth;
