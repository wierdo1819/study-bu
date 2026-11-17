import React from 'react';
import { Heart, Globe, Shield, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & SDG 4 Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 text-white flex items-center justify-center font-black">
                E
              </div>
              <span className="text-white font-black text-lg tracking-tight">EduConnect</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#c5192d] text-white">
                SDG 4
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              EduConnect is a community-driven digital resource hub built in support of United Nations Sustainable Development Goal 4: Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Open-access materials licensed under</span>
              <span className="text-slate-300 font-semibold underline">CC BY-NC-SA 4.0</span>
            </div>
          </div>

          {/* Quick Hub Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Platform Views
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                  Resource Hub (Library)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-white transition-colors">
                  Interactive Practice Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:text-white transition-colors">
                  Syllabus Milestone Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">
                  NGO Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Curriculums */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('resources')}>
                Mathematics (Primary & Middle)
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('resources')}>
                Science & Ecology
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('resources')}>
                Digital Literacy & Coding
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('resources')}>
                English ESL & Storytelling
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('resources')}>
                Offline Printable Workbooks
              </li>
            </ul>
          </div>

          {/* Partner NGOs */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Community Partners
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>UNESCO Open Learning</li>
              <li>Teach For All Global Network</li>
              <li>Pratham Digital Learning</li>
              <li>SDG Action Campaign</li>
              <li>Room to Read Literacy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Built with care for global learners</span>
            <span>•</span>
            <span className="text-slate-400">WCAG 2.1 AA Accessible</span>
          </div>

          <div>
            © {new Date().getFullYear()} EduConnect Initiative. Empowering grassroots education worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
}
