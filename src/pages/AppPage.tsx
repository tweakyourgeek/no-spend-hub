import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getChallengeData,
  startChallenge,
  hasStartedChallenge,
  ChallengeData,
} from "@/lib/challenge-data";
import AppHome from "@/components/app/AppHome";
import AppData from "@/components/app/AppData";
import AppPatterns from "@/components/app/AppPatterns";
import AppJournal from "@/components/app/AppJournal";
import AppTools from "@/components/app/AppTools";
import { Home, BarChart3, Sparkles, BookOpen, Wrench, Settings, Menu, X } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "data", label: "My Data", icon: BarChart3 },
  { id: "patterns", label: "Patterns", icon: Sparkles },
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "tools", label: "Tools", icon: Wrench },
];

export default function AppPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [data, setData] = useState<ChallengeData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!hasStartedChallenge()) {
      const newData = startChallenge();
      setData(newData);
    } else {
      setData(getChallengeData());
    }
  }, []);

  const refreshData = () => setData(getChallengeData());

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card p-4 fixed h-full">
        <p className="font-display text-lg font-semibold text-primary mb-8">No Spend Collective</p>
        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <Settings size={18} />
          Back to Site
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14 flex items-center justify-between px-4">
        <p className="font-display text-base font-semibold text-primary">NSC</p>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <div className="bg-card w-60 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-lg font-semibold text-primary mb-8">No Spend Collective</p>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-60 pt-14 md:pt-0">
        <div className="max-w-3xl mx-auto p-6">
          {activeTab === "home" && <AppHome data={data} onUpdate={refreshData} />}
          {activeTab === "data" && <AppData data={data} />}
          {activeTab === "patterns" && <AppPatterns data={data} />}
          {activeTab === "journal" && <AppJournal data={data} />}
          {activeTab === "tools" && <AppTools />}
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <tab.icon size={18} />
            <span className="text-[10px] font-body font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
