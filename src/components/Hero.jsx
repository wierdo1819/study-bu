import React from 'react';
import { BookOpen, ShieldCheck, ArrowRight, Sparkles, GraduationCap, Globe, Users, HeartHandshake, CheckCircle2, FileText, Check } from 'lucide-react';
import { IMPACT_METRICS, SDG_INFO } from '../data/initialData';

export default function Hero({ onExploreClick, onAdminClick, onQuizClick }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-indigo-500/10 to-emerald-400/10 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SDG 4 Quality Education Mission Ribbon */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white shadow-sm border border-slate-200/80 text-slate-800 hover:border-indigo-300 transition-all">
            <span className="w-5 h-5 rounded-md bg-[#c5192d] text-white flex items-center justify-center font-black text-[11px] shadow-sm">
              4
            </span>
            <span className="text-[#c5192d] font-bold">UN SDG 4:</span>
            <span className="text-slate-600">Quality, Equitable & Inclusive Education for All</span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Empowering Community Education through{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Digital Access
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
            EduConnect bridges the digital divide with verified, low-bandwidth study materials, interactive practice quizzes, and syllabus trackers designed for grassroots classrooms, self-learners, and community tutors.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-300/50 hover:shadow-indigo-400/50 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Resources</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onQuizClick}
              className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Practice Quiz</span>
            </button>

            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl border border-slate-300 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <HeartHandshake className="w-4 h-4 text-indigo-600" />
              <span>NGO Admin Portal</span>
            </button>
          </div>

          {/* Key Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% Free & Open-Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Optimized for Low-Bandwidth</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Community NGO Verified</span>
            </div>
          </div>
        </div>

        {/* Impact Counter Cards */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-indigo-600 font-extrabold text-2xl sm:text-3xl tracking-tight">
              {IMPACT_METRICS.totalResources}+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
              Curated Open Resources
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Workbooks, STEM guides & audio notes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-emerald-600 font-extrabold text-2xl sm:text-3xl tracking-tight">
              {IMPACT_METRICS.activeStudents}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
              Active Learners Reached
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Across underserved regional clusters
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-amber-500 font-extrabold text-2xl sm:text-3xl tracking-tight">
              {IMPACT_METRICS.quizzesCompleted}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
              Self-Assessments Completed
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              With immediate pedagogical feedback
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-rose-600 font-extrabold text-2xl sm:text-3xl tracking-tight">
              {IMPACT_METRICS.partnerNGOs}+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
              Grassroots NGO Partners
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Reviewing and updating curriculums
            </p>
          </div>
        </div>

        {/* SDG 4 Quality Education Mission Spotlight Card */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c5192d] text-white flex items-center justify-center font-black text-2xl shadow-md">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  United Nations Sustainable Development Goal 4
                </h3>
                <p className="text-xs text-slate-500">
                  {SDG_INFO.subtitle}
                </p>
              </div>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 text-[#c5192d] border border-rose-200">
              Agenda 2030 Commitment
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SDG_INFO.targets.map((tgt) => (
              <div key={tgt.code} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 hover:bg-slate-100/70 transition-colors">
                <div className="text-xs font-black text-[#c5192d] mb-1">
                  Target {tgt.code}
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">
                  {tgt.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {tgt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
