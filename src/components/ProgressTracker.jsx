import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2, Trophy, Clock, Flame, Sparkles, BookMarked, Award } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

export default function ProgressTracker({ syllabusTracks, onToggleTopic }) {
  const [activeTab, setActiveTab] = useState('all');

  // Compute stats across all tracks
  const totalTopics = syllabusTracks.reduce((acc, tr) => acc + tr.topics.length, 0);
  const completedTopics = syllabusTracks.reduce(
    (acc, tr) => acc + tr.topics.filter((t) => t.completed).length,
    0
  );
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const handleCheckboxClick = (trackId, topicId, wasCompleted) => {
    onToggleTopic(trackId, topicId);
    if (!wasCompleted) {
      // If marking as completed and overall reaches 100% or significant step
      if (completedTopics + 1 === totalTopics) {
        fireConfetti();
      }
    }
  };

  const displayedTracks =
    activeTab === 'all'
      ? syllabusTracks
      : syllabusTracks.filter((t) => t.id === activeTab);

  return (
    <section id="tracker" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-3">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-300" />
              <span>Personalized Learning Journey</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Syllabus & Milestone Mastery Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Track your daily self-study topics, maintain your learning streak, and earn verified competence badges as you progress through primary and secondary curriculums.
            </p>
          </div>

          {/* Overall Progress Gauge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-5 min-w-[280px]">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900/60 border-2 border-indigo-400">
              <span className="text-xl font-black text-indigo-300">{overallPercentage}%</span>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-300">Overall Syllabus Progress</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {completedTopics} of {totalTopics} Topics
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 mt-1 font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>5-Day Study Streak Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span>Core Curriculum Completion</span>
            <span>{overallPercentage}% Ready</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-amber-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs by Subject Track */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Tracks ({totalTopics})
        </button>
        {syllabusTracks.map((tr) => {
          const trCompleted = tr.topics.filter((t) => t.completed).length;
          return (
            <button
              key={tr.id}
              onClick={() => setActiveTab(tr.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tr.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tr.subject}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tr.id ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {trCompleted}/{tr.topics.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Syllabus Track Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedTracks.map((track) => {
          const trackCompleted = track.topics.filter((t) => t.completed).length;
          const trackPct = Math.round((trackCompleted / track.topics.length) * 100);
          const isMastered = trackPct === 100;

          return (
            <div
              key={track.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Track Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Subject Track
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {track.subject}
                    </h3>
                  </div>

                  {/* Badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    isMastered
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    <Award className={`w-3.5 h-3.5 ${isMastered ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                    <span>{track.badge}</span>
                  </div>
                </div>

                {/* Track Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
                    <span>{trackCompleted} of {track.topics.length} mastered</span>
                    <span className="font-bold text-slate-700">{trackPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${track.color}`}
                      style={{ width: `${trackPct}%` }}
                    />
                  </div>
                </div>

                {/* Topics Checklist */}
                <div className="space-y-2.5">
                  {track.topics.map((topic) => {
                    return (
                      <div
                        key={topic.id}
                        onClick={() => handleCheckboxClick(track.id, topic.id, topic.completed)}
                        className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          topic.completed
                            ? 'bg-slate-50/70 border-slate-200/70 text-slate-500'
                            : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800 hover:bg-indigo-50/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="focus:outline-none shrink-0"
                            aria-label={topic.completed ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {topic.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            )}
                          </button>
                          <span className={`text-xs sm:text-sm font-medium ${
                            topic.completed ? 'line-through text-slate-400' : ''
                          }`}>
                            {topic.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-normal shrink-0 ml-2">
                          <Clock className="w-3 h-3" />
                          <span>{topic.estimatedTime}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer achievement note */}
              {isMastered && (
                <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Module Completed! Verified certificate ready for download.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
