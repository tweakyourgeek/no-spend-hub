import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-xl font-semibold text-primary">
          No Spend Collective
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="font-body font-medium text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#patterns" className="font-body font-medium text-sm text-muted-foreground hover:text-foreground transition-colors">
            Patterns
          </a>
          <a href="#pricing" className="font-body font-medium text-sm text-muted-foreground hover:text-foreground transition-colors">
            Join
          </a>
        </div>
        <Link to="/app" className="btn-pill-primary text-sm px-6 py-2">
          Start Free →
        </Link>
      </div>
    </nav>
  );
}
