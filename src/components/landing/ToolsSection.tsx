export default function ToolsSection() {
  const tools = [
    { icon: "📊", title: "Spreadsheet Pack", desc: "9 tabs. Auto-calculated. Streak counters. Because data is more fun with charts." },
    { icon: "🤖", title: "17 Custom GPTs", desc: "Including 'Talk Me Out of This Purchase' — which does exactly that." },
    { icon: "📓", title: "30-Day Journal", desc: "Daily check-ins designed around pattern recognition, not guilt." },
    { icon: "🎯", title: "Pattern Quiz", desc: "4 minutes. Free. Will haunt you (in the best way)." },
  ];

  const pillars = ["Self", "Time", "Money", "Voice", "Systems", "Relationships", "Community", "Purpose"];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
        <div>
          <p className="section-label mb-3">Your Toolkit</p>
          <h2 className="display-heading text-3xl mb-8">Everything you need. Nothing you don't.</h2>
          <div className="space-y-6">
            {tools.map((t) => (
              <div key={t.title} className="flex gap-4">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="font-body font-medium text-foreground">{t.title}</p>
                  <p className="body-text text-sm">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-soft" style={{ background: "hsl(var(--sage-light))" }}>
          <p className="section-label mb-2" style={{ color: "hsl(var(--sage-dark))" }}>Coming Soon</p>
          <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">The Alignment Lab</h3>
          <p className="body-text text-sm mb-6">
            The No Spend Challenge is one experiment inside a bigger framework.
            Money is just where we're starting.
          </p>
          <div className="flex flex-wrap gap-2">
            {pillars.map((p) => (
              <span key={p} className="chip-sage">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
