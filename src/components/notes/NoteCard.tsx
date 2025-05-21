
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

const getRandomColor = (id: string) => {
  const colors = ['bg-note-lightPurple', 'bg-note-yellow', 'bg-note-blue', 
                 'bg-note-green', 'bg-note-orange', 'bg-note-pink'];
  // Use the string (id) to determine a consistent color for each note
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const timeAgo = formatDistanceToNow(new Date(note.updated_at), { addSuffix: true });
  const colorClass = getRandomColor(note.id);

  return (
    <Card className={`note-card ${colorClass} h-full flex flex-col`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-6">{note.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
        <span>{timeAgo}</span>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(note)}
            className="h-8 w-8"
          >
            <Edit size={16} />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(note.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 size={16} />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
