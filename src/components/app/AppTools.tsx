import { ExternalLink, Download } from "lucide-react";

const gpts = [
  { name: "Talk Me Out of This Purchase", desc: "Does exactly what it says." },
  { name: "Pattern Identifier", desc: "Helps you name what's driving a purchase urge." },
  { name: "No Spend Day Planner", desc: "Plans your day around free activities." },
  { name: "Spending Autopsy", desc: "Breaks down a purchase after the fact, without judgment." },
  { name: "The Enough Calculator", desc: "Helps you figure out what 'enough' looks like for any category." },
];

export default function AppTools() {
  return (
    <div className="space-y-8">
      <div>
        <p className="section-label mb-2">Tools</p>
        <h2 className="font-display text-3xl font-semibold text-foreground">Your Toolkit</h2>
      </div>

      {/* GPTs */}
      <div>
        <p className="font-body font-medium text-foreground mb-4">🤖 Custom GPTs</p>
        <div className="space-y-3">
          {gpts.map((gpt) => (
            <button
              key={gpt.name}
              className="card-soft w-full text-left flex items-center justify-between group hover:scale-[1.01] transition-transform"
            >
              <div>
                <p className="font-body font-medium text-sm text-foreground">{gpt.name}</p>
                <p className="font-body text-xs text-muted-foreground">{gpt.desc}</p>
              </div>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Downloads */}
      <div>
        <p className="font-body font-medium text-foreground mb-4">📊 Downloads</p>
        <button className="card-soft w-full text-left flex items-center justify-between group hover:scale-[1.01] transition-transform">
          <div>
            <p className="font-body font-medium text-sm text-foreground">Spreadsheet Pack</p>
            <p className="font-body text-xs text-muted-foreground">9 tabs. Auto-calculated. Streak counters.</p>
          </div>
          <Download size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Community */}
      <div>
        <p className="font-body font-medium text-foreground mb-4">🌐 Community</p>
        <button className="card-soft w-full text-left flex items-center justify-between group hover:scale-[1.01] transition-transform">
          <div>
            <p className="font-body font-medium text-sm text-foreground">Skool Community</p>
            <p className="font-body text-xs text-muted-foreground">Connect with other pattern-watchers.</p>
          </div>
          <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
}
