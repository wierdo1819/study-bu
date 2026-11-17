import React, { useState } from 'react';
import { BookOpen, CheckSquare, HelpCircle, Shield, Menu, X, Sparkles, HeartHandshake, Wifi, Download } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, offlineDownloadsCount }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'resources', label: 'Resource Hub', icon: BookOpen },
    { id: 'quiz', label: 'Practice Quiz', icon: HelpCircle },
    { id: 'tracker', label: 'Progress Tracker', icon: CheckSquare },
    { id: 'admin', label: 'NGO Admin', icon: Shield }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <span className="text-base">E</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  EduConnect
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#c5192d] text-white tracking-wider">
                  SDG 4
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 hidden sm:block">
                Open-Access Web Resource Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/70">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action / Offline Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Offline Ready</span>
            </div>

            <button
              onClick={() => handleNavClick('resources')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>Saved ({offlineDownloadsCount})</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Low Bandwidth Active
            </span>
            <span className="font-semibold text-slate-700">
              {offlineDownloadsCount} Resources Offline
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
