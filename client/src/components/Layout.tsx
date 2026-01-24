import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "首页" },
    { href: "/business-for-sale", label: "生意转让" },
    { href: "/industrial-warehouse", label: "工业/仓库" },
    { href: "/office-retail", label: "办公/商铺" },
    { href: "/success-stories", label: "真实案例" },
    { href: "/market-insights", label: "资源/博客" },
    { href: "/about", label: "关于 Steven" },
    { href: "/contact", label: "联系我们" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-md border-border/40 py-3 shadow-sm"
            : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-sm font-bold text-xl tracking-tighter group-hover:bg-primary/90 transition-colors">
                S
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "font-bold text-lg leading-none tracking-tight transition-colors",
                  isScrolled || isMobileMenuOpen ? "text-foreground" : "text-foreground"
                )}>
                  宝爸Steven
                </span>
                <span className={cn(
                  "text-xs uppercase tracking-widest font-medium transition-colors",
                  isScrolled || isMobileMenuOpen ? "text-muted-foreground" : "text-muted-foreground"
                )}>
                  洛杉矶商业地产
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-1 cursor-pointer",
                    location === link.href
                      ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button size="sm" className="ml-4 font-medium">
                预约咨询
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "text-xl font-medium block py-2 border-b border-border/40 cursor-pointer",
                    location === link.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <Button className="w-full" size="lg">
                预约咨询
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 mt-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-primary flex items-center justify-center rounded-sm font-bold text-lg">S</div>
              <span className="font-bold text-xl">宝爸Steven</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              深耕洛杉矶商业地产，专注生意转让、仓库买卖与租赁。为您提供最专业的市场分析与投资建议。
            </p>
            <div className="pt-4">
              <span className="text-xs font-semibold tracking-widest uppercase opacity-70 block mb-2">Powered By</span>
              <span className="font-bold text-lg tracking-tight">RE/MAX GALAXY</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">快速导航</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/business-for-sale"><span className="hover:text-white transition-colors cursor-pointer">生意转让</span></Link></li>
              <li><Link href="/industrial-warehouse"><span className="hover:text-white transition-colors cursor-pointer">工业/仓库</span></Link></li>
              <li><Link href="/office-retail"><span className="hover:text-white transition-colors cursor-pointer">办公/商铺</span></Link></li>
              <li><Link href="/success-stories"><span className="hover:text-white transition-colors cursor-pointer">真实案例</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">联系方式</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 opacity-70" />
                <span>Rowland Heights / Chino Hills<br />Los Angeles, CA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 opacity-70" />
                <span>(626) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 opacity-70" />
                <span>steven@remax-galaxy.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">关注我们</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              订阅我们的市场简报，获取最新的洛杉矶商业地产资讯。
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="bg-primary-foreground/10 border border-primary-foreground/20 rounded px-3 py-2 text-sm w-full placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50 text-white"
              />
              <Button variant="secondary" size="sm">订阅</Button>
            </div>
          </div>
        </div>
        <div className="container mt-16 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Steven Commercial Real Estate. All rights reserved. DRE# 01234567</p>
        </div>
      </footer>
    </div>
  );
}
