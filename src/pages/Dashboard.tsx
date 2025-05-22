
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import NotesList from '@/components/notes/NotesList';
import NoteDialog from '@/components/notes/NoteDialog';
import { Note } from '@/components/notes/NoteCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

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

    const fetchNotes = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) {
          console.error('Error fetching notes:', error);
          toast.error('Failed to load notes');
          return;
        }

        setNotes(data || []);
      } catch (error) {
        console.error('Error in fetchNotes:', error);
        toast.error('Failed to load notes');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user, authLoading, navigate]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsDialogOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsDialogOpen(true);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting note:', error);
        toast.error('Failed to delete note');
        return;
      }

      setNotes(notes.filter(note => note.id !== id));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Error in handleDeleteNote:', error);
      toast.error('Failed to delete note');
    }
  };

  const handleSaveNote = async (noteData: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const now = new Date().toISOString();

      if (editingNote) {
        // Update existing note
        const { error } = await supabase
          .from('notes')
          .update({
            title: noteData.title,
            content: noteData.content,
            updated_at: now
          })
          .eq('id', editingNote.id);

        if (error) {
          console.error('Error updating note:', error);
          toast.error('Failed to update note');
          return;
        }

        // Update the local state
        setNotes(notes.map(note =>
          note.id === editingNote.id
            ? { ...note, ...noteData, updated_at: now }
            : note
        ));
        toast.success('Note updated successfully');
      } else {
        // Create new note
        const { data, error } = await supabase
          .from('notes')
          .insert({
            title: noteData.title,
            content: noteData.content,
            user_id: user?.id
          })
          .select();

        if (error) {
          console.error('Error creating note:', error);
          toast.error('Failed to create note');
          return;
        }

        if (data && data.length > 0) {
          // Add the new note to the beginning of the list
          setNotes([data[0], ...notes]);
          toast.success('Note created successfully');
        }
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error in handleSaveNote:', error);
      toast.error('Failed to save note');
    }
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
