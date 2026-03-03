import { Star, Archive, Trash2, Mail, MailOpen } from "lucide-react";
import { Email } from "@/data/emails";
import { format, isToday, isThisYear } from "date-fns";

interface EmailListProps {
  emails: Email[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onStar: (id: string) => void;
}

function formatDate(date: Date): string {
  if (isToday(date)) return format(date, "h:mm a");
  if (isThisYear(date)) return format(date, "MMM d");
  return format(date, "MM/dd/yy");
}

const EmailList = ({ emails, selectedId, onSelect, onStar }: EmailListProps) => {
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Mail className="h-16 w-16 mb-4 opacity-30" />
        <p className="text-lg">No emails found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {emails.map((email) => {
        const replyCount = email.replies?.length || 0;
        return (
          <div
            key={email.id}
            onClick={() => onSelect(email.id)}
            className={`group flex items-center gap-2 px-4 py-2 cursor-pointer border-b border-border transition-colors ${
              selectedId === email.id ? "bg-gmail-selected" : "bg-card"
            } hover:gmail-shadow-sm hover:z-10 relative`}
          >
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-muted-foreground/30 accent-gmail-blue cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStar(email.id);
                }}
                className="p-1 hover:bg-gmail-hover rounded-full transition-colors"
              >
                <Star
                  className={`h-4 w-4 ${
                    email.starred
                      ? "fill-gmail-yellow text-gmail-yellow"
                      : "text-muted-foreground/40 group-hover:text-muted-foreground"
                  }`}
                />
              </button>
            </div>

            <span className={`w-[180px] truncate text-sm shrink-0 ${!email.read ? "font-bold text-foreground" : "text-foreground"}`}>
              {email.from}
              {replyCount > 0 && (
                <span className="text-xs text-muted-foreground font-normal ml-1">({replyCount + 1})</span>
              )}
            </span>

            <div className="flex-1 flex items-center gap-2 min-w-0">
              <span className={`truncate text-sm ${!email.read ? "font-bold text-foreground" : "text-foreground"}`}>
                {email.subject}
              </span>
              <span className="text-sm text-muted-foreground truncate hidden md:inline">
                — {email.snippet}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <div className="hidden group-hover:flex items-center gap-0.5">
                <button className="p-1.5 hover:bg-gmail-hover rounded-full transition-colors">
                  <Archive className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-gmail-hover rounded-full transition-colors">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-gmail-hover rounded-full transition-colors">
                  {email.read ? (
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              <span className={`text-xs whitespace-nowrap group-hover:hidden ${!email.read ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                {formatDate(email.date)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;
