import { Menu, Search, HelpCircle, Settings, LayoutGrid } from "lucide-react";

interface GmailHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleSidebar: () => void;
}

const GmailHeader = ({ searchQuery, onSearchChange, onToggleSidebar }: GmailHeaderProps) => {
  return (
    <header className="flex h-16 items-center gap-2 border-b border-border bg-card px-4">
      <button
        onClick={onToggleSidebar}
        className="rounded-full p-2 hover:bg-gmail-hover transition-colors"
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="flex items-center gap-2 mr-4">
        <svg viewBox="0 0 75 24" className="h-8 w-auto">
          <path d="M7.3 20.5V9.6l6 4.5 6-4.5v10.9H7.3z" fill="hsl(5, 81%, 56%)" />
          <path d="M1 5.2l6.3 4.7V20.5H3.6c-1.4 0-2.6-1.2-2.6-2.6V5.2z" fill="hsl(214, 100%, 50%)" />
          <path d="M19.3 20.5V9.9L25.6 5.2v12.7c0 1.4-1.2 2.6-2.6 2.6h-3.7z" fill="hsl(142, 53%, 45%)" />
          <path d="M1 5.2l12.3 9.3L25.6 5.2 13.3 14.5z" fill="hsl(5, 81%, 56%)" opacity="0.8" />
          <path d="M1 5.2C1 3.5 3 2.5 4.3 3.5l9 6.8 9-6.8c1.3-1 3.3 0 3.3 1.7L13.3 14.5 1 5.2z" fill="hsl(45, 97%, 54%)" />
        </svg>
        <span className="text-[22px] text-muted-foreground font-normal tracking-tight hidden sm:inline">Gmail</span>
      </div>

      <div className="flex-1 max-w-2xl">
        <div className="relative flex items-center rounded-full bg-secondary px-4 py-2.5 focus-within:bg-card focus-within:gmail-shadow transition-all">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Search mail"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-4">
        <button className="rounded-full p-2.5 hover:bg-gmail-hover transition-colors hidden sm:flex">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="rounded-full p-2.5 hover:bg-gmail-hover transition-colors hidden sm:flex">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="rounded-full p-2.5 hover:bg-gmail-hover transition-colors hidden sm:flex">
          <LayoutGrid className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gmail-compose flex items-center justify-center text-primary-foreground text-sm font-medium ml-2 cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
};

export default GmailHeader;
