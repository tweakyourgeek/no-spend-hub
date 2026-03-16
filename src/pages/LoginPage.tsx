import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/lab");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="font-display text-xl font-bold text-primary block text-center mb-8"
        >
          No Spend Collective
        </Link>

        <div className="card-soft p-8" style={{ background: "#FFFFFF" }}>
          <h1
            className="font-display text-2xl font-semibold text-center mb-2"
            style={{ color: "#2D2D4A" }}
          >
            Welcome back
          </h1>
          <p className="body-text text-sm text-center text-muted-foreground mb-8">
            Log in to access your member tools.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="btn-pill-primary w-full py-3 text-base font-body font-medium"
            >
              {loading ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="body-text text-sm text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium underline underline-offset-4 hover:text-foreground"
              style={{ color: "#9B5586" }}
            >
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link
            to="/"
            className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
