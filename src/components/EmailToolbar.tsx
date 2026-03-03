import { RefreshCw, MoreVertical, ChevronLeft, ChevronRight, Inbox, Users, Tag } from "lucide-react";

interface EmailToolbarProps {
  total: number;
  category: string;
  onCategoryChange: (cat: string) => void;
}

const categories = [
  { id: "primary", label: "Primary", icon: Inbox },
  { id: "social", label: "Social", icon: Users },
  { id: "promotions", label: "Promotions", icon: Tag },
];

const EmailToolbar = ({ total, category, onCategoryChange }: EmailToolbarProps) => {
  return (
    <div className="flex flex-col border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-1.5">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 rounded accent-gmail-blue cursor-pointer" />
          <button className="p-1.5 hover:bg-gmail-hover rounded-full transition-colors">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-gmail-hover rounded-full transition-colors">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>1–{Math.min(50, total)} of {total}</span>
          <button className="p-1 hover:bg-gmail-hover rounded-full transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1 hover:bg-gmail-hover rounded-full transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm transition-colors border-b-[3px] flex-1 justify-center ${
                isActive
                  ? "border-gmail-blue text-gmail-blue font-medium"
                  : "border-transparent text-muted-foreground hover:bg-gmail-hover"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmailToolbar;
