
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import NotesList from '@/components/notes/NotesList';
import NoteDialog from '@/components/notes/NoteDialog';
import { Note } from '@/components/notes/NoteCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If auth is not loading and user is not authenticated, redirect to auth page
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    // Simulate loading notes from Supabase
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mock notes data - in a real app we'd fetch this from Supabase
      if (user) {
        setNotes([
          {
            id: '1',
            title: 'Welcome to Notes App',
            content: 'This is a simple note-taking application. You can create, edit, and delete notes. Try it out!',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            title: 'Shopping List',
            content: '- Milk\n- Eggs\n- Bread\n- Fruits\n- Vegetables',
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            title: 'Project Ideas',
            content: '1. Build a personal website\n2. Create a recipe app\n3. Develop a habit tracker',
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, authLoading, navigate]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsDialogOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsDialogOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    // In a real app, this would make a request to Supabase
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Note deleted successfully');
  };

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();

    if (editingNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...noteData, updated_at: now } 
          : note
      ));
      toast.success('Note updated successfully');
    } else {
      // Create new note
      const newNote: Note = {
        id: uuidv4(),
        ...noteData,
        created_at: now,
        updated_at: now,
      };
      setNotes([newNote, ...notes]);
      toast.success('Note created successfully');
    }

    setIsDialogOpen(false);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading authentication...</p>
      </div>
    );
  }

  return (
    <Layout username={user?.email?.split('@')[0] || 'User'}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Button onClick={handleCreateNote} className="flex items-center gap-1">
          <Plus size={16} />
          <span>Add Note</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 h-48 animate-pulse bg-muted/50"></div>
          ))}
        </div>
      ) : (
        <NotesList 
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      )}

      <NoteDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </Layout>
  );
};

export default Dashboard;
