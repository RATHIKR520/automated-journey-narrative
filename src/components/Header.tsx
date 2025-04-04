
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "About", href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Skills", href: "#skills" },
  { title: "Education", href: "#education" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    // Only add the listener if the menu is open
    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Add/remove body class to prevent scrolling and blur content
  useEffect(() => {
    if (mobileMenuOpen) {
      // Use direct DOM class manipulation instead of @apply
      document.body.classList.add('overflow-hidden');
      // Only blur the main content and footer, not the mobile menu itself
      document.getElementById('main-content')?.classList.add('blur-sm');
      document.getElementById('footer')?.classList.add('blur-sm');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.getElementById('main-content')?.classList.remove('blur-sm');
      document.getElementById('footer')?.classList.remove('blur-sm');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.getElementById('main-content')?.classList.remove('blur-sm');
      document.getElementById('footer')?.classList.remove('blur-sm');
    };
  }, [mobileMenuOpen]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
      isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <a 
          href="#" 
          className="text-2xl font-display font-bold tracking-tighter relative group"
        >
          <span className="relative">My Portfolio</span>
          {isMobile && (
            <Sparkles 
              size={16} 
              className="absolute -top-1 -right-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-medium text-sm hover:text-primary transition-colors relative group"
            >
              {item.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button - prevent event bubbling */}
        <button 
          className="md:hidden text-foreground focus:outline-none z-50 relative overflow-hidden"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          <div className="relative">
            {mobileMenuOpen ? (
              <X size={24} className="animate-scale" />
            ) : (
              <Menu size={24} className="transition-transform hover:scale-110 duration-200" />
            )}
          </div>
        </button>
      </div>
      
      {/* Mobile Menu - Enhanced visibility for menu items */}
      {mobileMenuOpen && (
        <div className={cn(
          "fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md pt-20",
          "flex flex-col items-center justify-start"
        )}>
          <div className="container mx-auto flex flex-col items-center pt-10">
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-display text-2xl font-bold text-foreground hover:text-primary transition-colors stagger-item"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    animationDelay: `${0.1 + index * 0.1}s`,
                    textShadow: '0 0 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {item.title}
                  <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-primary"></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Improved decorative elements for mobile menu - better visibility */}
          <div className="absolute bottom-10 left-8">
            <Sparkles 
              className="text-blue-600 animate-pulse" 
              size={32}
              strokeWidth={3}
            />
          </div>
          <div className="absolute top-32 right-8">
            <Sparkles 
              className="text-blue-700 animate-float" 
              size={24}
              strokeWidth={3} 
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
