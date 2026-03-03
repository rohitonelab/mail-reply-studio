import { useState } from "react";
import { X, Minus, Maximize2, Paperclip, Link, Smile, Image, MoreVertical } from "lucide-react";

interface ComposeModalProps {
  onClose: () => void;
}

const ComposeModal = ({ onClose }: ComposeModalProps) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div
        className="fixed bottom-0 right-20 w-[280px] bg-card rounded-t-lg compose-shadow cursor-pointer z-50"
        onClick={() => setMinimized(false)}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-foreground rounded-t-lg">
          <span className="text-sm font-medium text-card">New Message</span>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-muted/20 rounded transition-colors" onClick={(e) => { e.stopPropagation(); setMinimized(false); }}>
              <Maximize2 className="h-3.5 w-3.5 text-card" />
            </button>
            <button className="p-1 hover:bg-muted/20 rounded transition-colors" onClick={(e) => { e.stopPropagation(); onClose(); }}>
              <X className="h-3.5 w-3.5 text-card" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-20 w-[540px] bg-card rounded-t-xl compose-shadow z-50 flex flex-col max-h-[70vh]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-foreground rounded-t-xl">
        <span className="text-sm font-medium text-card">New Message</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setMinimized(true)} className="p-1 hover:bg-muted/20 rounded transition-colors">
            <Minus className="h-4 w-4 text-card" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-muted/20 rounded transition-colors">
            <X className="h-4 w-4 text-card" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border px-4">
          <div className="flex items-center py-1.5">
            <span className="text-sm text-muted-foreground w-12">To</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-foreground"
            />
          </div>
        </div>
        <div className="border-b border-border px-4">
          <div className="flex items-center py-1.5">
            <span className="text-sm text-muted-foreground w-12">Subject</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-foreground"
            />
          </div>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Compose your email..."
          className="flex-1 p-4 bg-transparent outline-none text-sm text-foreground resize-none min-h-[200px] placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="flex items-center gap-1">
          <button className="px-6 py-2 bg-gmail-compose text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Send
          </button>
          <div className="flex items-center gap-0.5 ml-2">
            <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
              <Link className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
              <Smile className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
              <Image className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ComposeModal;
