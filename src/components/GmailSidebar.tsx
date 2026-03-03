import { Inbox, Star, Clock, Send, FileText, Tag, ChevronDown, Pencil } from "lucide-react";

interface GmailSidebarProps {
  collapsed: boolean;
  activeFolder: string;
  onFolderChange: (folder: string) => void;
  onCompose: () => void;
  unreadCount: number;
}

const folders = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "starred", label: "Starred", icon: Star },
  { id: "snoozed", label: "Snoozed", icon: Clock },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "more", label: "More", icon: ChevronDown },
  { id: "labels", label: "Labels", icon: Tag },
];

const GmailSidebar = ({ collapsed, activeFolder, onFolderChange, onCompose, unreadCount }: GmailSidebarProps) => {
  return (
    <aside className={`flex flex-col pt-4 transition-all duration-200 ${collapsed ? "w-[72px]" : "w-[256px]"} shrink-0`}>
      <button
        onClick={onCompose}
        className={`flex items-center gap-3 mx-3 mb-4 rounded-2xl gmail-shadow-sm hover:compose-shadow transition-all bg-card text-foreground ${
          collapsed ? "p-3 justify-center" : "px-6 py-3.5"
        }`}
      >
        <Pencil className="h-5 w-5 text-foreground" />
        {!collapsed && <span className="text-sm font-medium">Compose</span>}
      </button>

      <nav className="flex flex-col gap-0.5">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const isActive = activeFolder === folder.id;
          const showCount = folder.id === "inbox" && unreadCount > 0;

          return (
            <button
              key={folder.id}
              onClick={() => onFolderChange(folder.id)}
              className={`flex items-center gap-4 mx-2 rounded-r-full py-1.5 transition-colors ${
                collapsed ? "justify-center px-3 rounded-full mx-3" : "px-6"
              } ${
                isActive
                  ? "bg-gmail-selected text-accent-foreground font-medium"
                  : "hover:bg-gmail-hover text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-accent-foreground" : ""}`} />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm">{folder.label}</span>
                  {showCount && (
                    <span className="text-xs font-medium">{unreadCount}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default GmailSidebar;
