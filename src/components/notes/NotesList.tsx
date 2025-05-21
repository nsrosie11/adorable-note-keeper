
import React from 'react';
import NoteCard, { Note } from './NoteCard';

type NotesListProps = {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
};

const NotesList: React.FC<NotesListProps> = ({ notes, onEditNote, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No notes found. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onEdit={onEditNote} 
          onDelete={onDeleteNote} 
        />
      ))}
    </div>
  );
};

export default NotesList;
