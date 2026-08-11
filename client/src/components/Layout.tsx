import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { startLogin } from "@/const";
import { BookOpen, Compass, Home, MessageCircle, TrendingUp, Zap, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/courses", label: "Courses", icon: BookOpen },
  { path: "/situations", label: "Situations", icon: Compass },
  { path: "/professor", label: "Professor", icon: User },
  { path: "/chat", label: "Chat", icon: MessageCircle },
  { path: "/progress", label: "Progress", icon: TrendingUp },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mutate: logout } = trpc.auth.logout.useMutation({
    onSuccess: () => { window.location.href = "/"; },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full pt-flag-stripe flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">PT</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-['Playfair_Display'] font-bold text-primary text-lg leading-none">
                Português
              </span>
              <span className="block text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                A1 — C2
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = path === "/" ? location === "/" : location.startsWith(path);
              return (
                <Link key={path} href={path}>
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                </Link>
              );
            })}
          </nav>

          {/* Auth + Mobile toggle */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                        {(user.name ?? "U").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium text-foreground/80 max-w-[100px] truncate">
                      {user.name ?? "Learner"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex"
                onClick={() => startLogin()}
              >
                Sign In
              </Button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = path === "/" ? location === "/" : location.startsWith(path);
              return (
                <Link key={path} href={path}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-muted"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                </Link>
              );
            })}
            {!isAuthenticated && (
              <Button
                className="w-full mt-2 bg-primary text-primary-foreground"
                onClick={() => { startLogin(); setMobileOpen(false); }}
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1 page-enter">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-sidebar text-sidebar-foreground py-6 mt-auto">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full pt-flag-stripe" />
            <span className="font-['Playfair_Display'] font-semibold">Português A1–C2</span>
          </div>
          <p className="text-sidebar-foreground/60 text-center">
            Learn Portuguese from beginner to mastery — powered by AI
          </p>
          <div className="flex items-center gap-1 text-sidebar-foreground/60">
            <Zap className="w-3.5 h-3.5 text-secondary" />
            <span>AI-Powered Learning</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
