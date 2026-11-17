import React from 'react';
import { FileText, ExternalLink, Download, Eye, Bookmark, Calendar, Building2, Star } from 'lucide-react';

export default function ResourceCard({ resource, onView, onDownload, onBookmark, isBookmarked }) {
  const isPdf = resource.fileType === 'PDF';

  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'Mathematics':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Science':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Digital Literacy':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'English':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getGradeBadge = (grade) => {
    switch (grade) {
      case 'Primary':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Middle':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Secondary':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative top border highlight */}
      <div className={`absolute top-0 left-0 right-0 h-1 transition-colors ${
        resource.subject === 'Mathematics' ? 'bg-blue-500' :
        resource.subject === 'Science' ? 'bg-emerald-500' :
        resource.subject === 'Digital Literacy' ? 'bg-violet-500' : 'bg-amber-500'
      }`} />

      <div>
        {/* Top meta tags */}
        <div className="flex items-center justify-between gap-2 mb-3 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getSubjectColor(resource.subject)}`}>
              {resource.subject}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getGradeBadge(resource.gradeLevel)}`}>
              {resource.gradeLevel}
            </span>
          </div>

          <button
            onClick={() => onBookmark(resource.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Save to Bookmarks"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2 leading-snug">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {resource.description}
        </p>

        {/* Info Meta: NGO & Date */}
        <div className="space-y-1.5 text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{resource.partnerOrg || 'EduConnect Partner'}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{resource.uploadDate}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{resource.rating || '4.9'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          {isPdf ? (
            <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 text-[11px] font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>PDF</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 text-[11px] font-bold">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>WEB</span>
            </div>
          )}
          <span className="text-[11px] text-slate-400">{resource.fileSize}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onView(resource)}
            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200 hover:border-indigo-200"
            title="Preview Study Guide"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDownload(resource)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            title="Download / Open"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
