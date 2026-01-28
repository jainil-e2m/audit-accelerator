import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bold, Italic, Link as LinkIcon, List, Send, X } from 'lucide-react';

interface EmailEditorProps {
  to: string;
  initialSubject: string;
  initialBody: string;
  onSend: (to: string, subject: string, body: string) => void;
  onClose: () => void;
  isSending?: boolean;
}

export function EmailEditor({
  to,
  initialSubject,
  initialBody,
  onSend,
  onClose,
  isSending,
}: EmailEditorProps) {
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);

  const handleSend = () => {
    onSend(to, subject, body);
  };

  const ToolbarButton = ({
    icon: Icon,
    label,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }) => (
    <button
      type="button"
      title={label}
      className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="card-elevated overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-secondary/50 px-4 py-3">
        <h3 className="font-semibold text-foreground">Compose Email</h3>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Fields */}
      <div className="border-b">
        <div className="flex items-center border-b px-4 py-2">
          <label className="w-16 text-sm text-muted-foreground">To:</label>
          <span className="text-sm font-medium text-foreground">{to}</span>
        </div>
        <div className="flex items-center px-4 py-2">
          <label className="w-16 text-sm text-muted-foreground">Subject:</label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-0 p-0 text-sm font-medium focus-visible:ring-0"
            placeholder="Enter subject..."
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b px-4 py-2">
        <ToolbarButton icon={Bold} label="Bold" />
        <ToolbarButton icon={Italic} label="Italic" />
        <div className="mx-2 h-4 w-px bg-border" />
        <ToolbarButton icon={LinkIcon} label="Insert Link" />
        <ToolbarButton icon={List} label="Bulleted List" />
      </div>

      {/* Body */}
      <div className="p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-[300px] w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Write your email..."
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t bg-secondary/30 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary">*</span> This is a demo. Emails are not actually sent.
        </p>
        <Button
          onClick={handleSend}
          disabled={isSending || !subject.trim() || !body.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isSending ? (
            'Sending...'
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Email
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
