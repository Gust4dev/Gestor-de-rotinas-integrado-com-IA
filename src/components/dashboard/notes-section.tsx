import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface NotesSectionProps {
  selectedDate: Date;
}

export function NotesSection({ selectedDate }: NotesSectionProps) {
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNote = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Note saved successfully!');
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Daily Notes</h3>
          <Button
            onClick={handleSaveNote}
            disabled={isSaving}
            size="sm"
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Note'}
          </Button>
        </div>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your notes for this day..."
          className="min-h-[150px]"
        />
      </Card>
    </motion.div>
  );
}