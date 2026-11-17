import React from 'react';
import { X, Download, Bookmark, Share2, BookOpen, ExternalLink, ShieldCheck, Check } from 'lucide-react';

export default function ResourcePreviewModal({ resource, isOpen, onClose, onDownload, onBookmark, isBookmarked }) {
  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden transition-all transform animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              {resource.subject}
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Grade: {resource.gradeLevel}
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              {resource.fileType} • {resource.fileSize}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold leading-snug">
            {resource.title}
          </h3>

          <div className="flex items-center gap-2 mt-3 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified by <strong>{resource.partnerOrg || 'UN Partner NGO'}</strong></span>
            <span>•</span>
            <span>Uploaded: {resource.uploadDate}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Description & Learning Outcomes</h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {resource.description}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Study Module Snapshot</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              "{resource.contentPreview || 'Full pedagogical study guide, inclusive diagrams, low-bandwidth audio transcript, and graded self-assessment exercises aligned with national curriculums.'}"
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Core Competencies & Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {(resource.tags || ['Foundations', 'Self-Paced', 'SDG4']).map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span><strong>Offline Friendly:</strong> Once downloaded, this resource requires zero internet access.</span>
            </div>
            <span className="font-semibold text-emerald-700">{resource.downloads + 1} students accessed</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookmark(resource.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                isBookmarked 
                  ? 'bg-amber-50 text-amber-700 border-amber-300' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              {isBookmarked ? 'Saved to Bookmarks' : 'Bookmark'}
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Resource study link copied to clipboard!');
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDownload(resource);
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Download / Save Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
