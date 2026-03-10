import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-xl font-bold text-primary">
          No Spend Collective
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="font-body font-medium text-base text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#patterns" className="font-body font-medium text-base text-muted-foreground hover:text-foreground transition-colors">
            Patterns
          </a>
          <a href="#pricing" className="font-body font-medium text-base text-muted-foreground hover:text-foreground transition-colors">
            Join
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app" className="btn-pill-primary text-base px-6 py-3">
            Start Free →
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-cream/95 backdrop-blur-md border-b border-border px-4 pb-4 pt-2 space-y-1">
          <a href="#how-it-works" onClick={() => setOpen(false)} className="block font-body font-medium text-base text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-muted transition-colors">
            How It Works
          </a>
          <a href="#patterns" onClick={() => setOpen(false)} className="block font-body font-medium text-base text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-muted transition-colors">
            Patterns
          </a>
          <a href="#pricing" onClick={() => setOpen(false)} className="block font-body font-medium text-base text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-muted transition-colors">
            Join
          </a>
        </div>
      )}
    </nav>
  );
}
