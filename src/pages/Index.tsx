import { useState, useMemo } from "react";
import GmailHeader from "@/components/GmailHeader";
import GmailSidebar from "@/components/GmailSidebar";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import EmailToolbar from "@/components/EmailToolbar";
import ComposeModal from "@/components/ComposeModal";
import { emails as initialEmails, Email } from "@/data/emails";

const Index = () => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [category, setCategory] = useState("primary");

  const filteredEmails = useMemo(() => {
    let result = emails;

    if (activeFolder === "starred") {
      result = result.filter((e) => e.starred);
    } else if (activeFolder === "inbox") {
      result = result.filter((e) => e.category === category);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.subject.toLowerCase().includes(q) ||
          e.from.toLowerCase().includes(q) ||
          e.snippet.toLowerCase().includes(q)
      );
    }

    return result;
  }, [emails, searchQuery, activeFolder, category]);

  const unreadCount = emails.filter((e) => !e.read).length;
  const selectedEmail = emails.find((e) => e.id === selectedEmailId);

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e))
    );
  };

  const handleStar = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e))
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <GmailHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-1 overflow-hidden">
        <GmailSidebar
          collapsed={sidebarCollapsed}
          activeFolder={activeFolder}
          onFolderChange={setActiveFolder}
          onCompose={() => setShowCompose(true)}
          unreadCount={unreadCount}
        />

        <main className="flex-1 overflow-hidden flex flex-col bg-card rounded-tl-2xl border-l border-t border-border">
          {selectedEmail ? (
            <EmailDetail
              email={selectedEmail}
              onBack={() => setSelectedEmailId(null)}
              onStar={handleStar}
            />
          ) : (
            <>
              <EmailToolbar
                total={filteredEmails.length}
                category={category}
                onCategoryChange={setCategory}
              />
              <div className="flex-1 overflow-auto">
                <EmailList
                  emails={filteredEmails}
                  selectedId={selectedEmailId}
                  onSelect={handleSelectEmail}
                  onStar={handleStar}
                />
              </div>
            </>
          )}
        </main>
      </div>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}
    </div>
  );
};

export default Index;
