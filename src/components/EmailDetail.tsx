import { useState } from "react";
import { ArrowLeft, Star, Archive, Trash2, Reply, Forward, MoreVertical, Printer, ChevronDown, ChevronUp } from "lucide-react";
import { Email, EmailReply } from "@/data/emails";
import { format } from "date-fns";

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
  onStar: (id: string) => void;
}

const avatarColors = [
  "bg-gmail-compose",
  "bg-gmail-red",
  "bg-gmail-green",
  "bg-gmail-yellow",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

interface ReplyMessageProps {
  reply: EmailReply;
  isCollapsed: boolean;
  onToggle: () => void;
}

const ReplyMessage = ({ reply, isCollapsed, onToggle }: ReplyMessageProps) => {
  const isMe = reply.from === "You";

  return (
    <div className="border-b border-border last:border-b-0">
      <div
        className="flex items-start gap-3 px-6 py-4 cursor-pointer hover:bg-gmail-hover/50 transition-colors"
        onClick={onToggle}
      >
        <div className={`h-10 w-10 rounded-full ${isMe ? "bg-gmail-green" : getAvatarColor(reply.from)} flex items-center justify-center text-primary-foreground text-sm font-medium shrink-0`}>
          {reply.from.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-foreground">{reply.from}</span>
              {isCollapsed && (
                <span className="text-sm text-muted-foreground truncate max-w-md">
                  — {reply.body.substring(0, 80)}{reply.body.length > 80 ? "..." : ""}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {format(reply.date, "MMM d, h:mm a")}
              </span>
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          {!isCollapsed && (
            <div className="mt-1">
              <span className="text-xs text-muted-foreground">&lt;{reply.fromEmail}&gt;</span>
              <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed mt-3 max-w-2xl">
                {reply.body}
              </div>
              {reply.bodyImage && (
                <div className="mt-4">
                  <img
                    src={reply.bodyImage}
                    alt="Email attachment"
                    className="rounded-lg max-w-md w-full object-cover border border-border"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmailDetail = ({ email, onBack, onStar }: EmailDetailProps) => {
  const replies = email.replies || [];
  const totalMessages = replies.length + 1;

  // Initially collapse all except the original and the last reply
  const [collapsedReplies, setCollapsedReplies] = useState<Set<string>>(() => {
    const set = new Set<string>();
    // Collapse middle replies if there are more than 2
    if (replies.length > 1) {
      replies.slice(0, -1).forEach((r) => set.add(r.id));
    }
    return set;
  });

  const toggleReply = (replyId: string) => {
    setCollapsedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(replyId)) {
        next.delete(replyId);
      } else {
        next.add(replyId);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex-1" />
        <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
          <Archive className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
          <Trash2 className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
          <Printer className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-gmail-hover rounded-full transition-colors">
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Subject */}
        <div className="flex items-start justify-between px-6 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-normal text-foreground">{email.subject}</h1>
            {totalMessages > 1 && (
              <span className="text-sm text-muted-foreground">{totalMessages}</span>
            )}
          </div>
          <button onClick={() => onStar(email.id)} className="p-1 ml-4 shrink-0">
            <Star className={`h-5 w-5 ${email.starred ? "fill-gmail-yellow text-gmail-yellow" : "text-muted-foreground"}`} />
          </button>
        </div>

        {/* Original message */}
        <div className="border-b border-border">
          <div className="flex items-start gap-3 px-6 py-4">
            <div className={`h-10 w-10 rounded-full ${getAvatarColor(email.from)} flex items-center justify-center text-primary-foreground text-sm font-medium shrink-0`}>
              {email.from.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{email.from}</span>
                    <span className="text-xs text-muted-foreground">&lt;{email.fromEmail}&gt;</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">to {email.to}</div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {format(email.date, "MMM d, yyyy, h:mm a")}
                </span>
              </div>

              <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed mt-4 max-w-2xl">
                {email.body}
              </div>

              {email.bodyImage && (
                <div className="mt-4">
                  <img
                    src={email.bodyImage}
                    alt="Email content"
                    className="rounded-lg max-w-md w-full object-cover border border-border"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reply thread */}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <ReplyMessage
                key={reply.id}
                reply={reply}
                isCollapsed={collapsedReplies.has(reply.id)}
                onToggle={() => toggleReply(reply.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reply/Forward buttons */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-border">
        <button className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-full hover:bg-gmail-hover transition-colors text-sm text-foreground">
          <Reply className="h-4 w-4" />
          Reply
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-full hover:bg-gmail-hover transition-colors text-sm text-foreground">
          <Forward className="h-4 w-4" />
          Forward
        </button>
      </div>
    </div>
  );
};

export default EmailDetail;
