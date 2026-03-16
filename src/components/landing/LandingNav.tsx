import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  const navLinkClass =
    "font-body font-medium text-base text-muted-foreground hover:text-foreground transition-colors";
  const mobileLinkClass =
    "block font-body font-medium text-base text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-muted transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-xl font-bold text-primary">
          No Spend Collective
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className={navLinkClass}>
            How It Works
          </a>
          <Link to="/lab" className={navLinkClass}>
            The Lab
          </Link>
          <a href="#opt-in" className={navLinkClass}>
            Join Free
          </a>
        </div>
        <div className="flex items-center gap-3">
          {/* TODO: Wire up Login destination */}
          <button
            className="btn-pill border-2 px-6 py-2 text-base hidden md:inline-flex"
            style={{ borderColor: "#3B3B58", color: "#3B3B58" }}
          >
            Login →
          </button>
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
          <a href="#how-it-works" onClick={() => setOpen(false)} className={mobileLinkClass}>
            How It Works
          </a>
          <Link to="/lab" onClick={() => setOpen(false)} className={mobileLinkClass}>
            The Lab
          </Link>
          <a href="#opt-in" onClick={() => setOpen(false)} className={mobileLinkClass}>
            Join Free
          </a>
          {/* TODO: Wire up Login destination */}
          <button
            onClick={() => setOpen(false)}
            className="btn-pill border-2 w-full px-6 py-3 text-base mt-2"
            style={{ borderColor: "#3B3B58", color: "#3B3B58" }}
          >
            Login →
          </button>
        </div>
      )}
    </nav>
  );
}
