
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Auth page since we don't have Supabase connected yet
    // In a real app with Supabase, we'd check auth state here
    navigate('/auth');
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default Index;
