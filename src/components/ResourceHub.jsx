import React, { useState, useMemo } from 'react';
import ResourceCard from './ResourceCard';
import { Search, Filter, BookOpen, Layers, Sparkles, X, Check, Bookmark, FileText } from 'lucide-react';

const SUBJECTS = ['All Subjects', 'Mathematics', 'Science', 'Digital Literacy', 'English'];
const GRADES = ['All Grades', 'Primary', 'Middle', 'Secondary'];
const FILE_TYPES = ['All Types', 'PDF', 'Link'];

export default function ResourceHub({
  resources,
  bookmarks,
  onViewResource,
  onDownloadResource,
  onToggleBookmark
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedFileType, setSelectedFileType] = useState('All Types');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'popular' | 'title'

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // Search query matches title, description, subject, or partnerOrg
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        (item.partnerOrg && item.partnerOrg.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

      // Subject filter
      const matchesSubject =
        selectedSubject === 'All Subjects' || item.subject === selectedSubject;

      // Grade filter
      const matchesGrade =
        selectedGrade === 'All Grades' || item.gradeLevel === selectedGrade;

      // File type filter
      const matchesFileType =
        selectedFileType === 'All Types' || item.fileType === selectedFileType;

      // Bookmarks only filter
      const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(item.id);

      return (
        matchesSearch &&
        matchesSubject &&
        matchesGrade &&
        matchesFileType &&
        matchesBookmark
      );
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.downloads || 0) - (a.downloads || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // default newest
      return new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0);
    });
  }, [
    resources,
    searchQuery,
    selectedSubject,
    selectedGrade,
    selectedFileType,
    showOnlyBookmarks,
    sortBy,
    bookmarks
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All Subjects');
    setSelectedGrade('All Grades');
    setSelectedFileType('All Types');
    setShowOnlyBookmarks(false);
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedSubject !== 'All Subjects' ||
    selectedGrade !== 'All Grades' ||
    selectedFileType !== 'All Types' ||
    showOnlyBookmarks;

  return (
    <section id="library" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Access Study Library</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Curated Free Educational Resources
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Community-reviewed, zero-cost textbooks, interactive guides, and worksheets aligned with UN SDG 4 for inclusive digital learning.
          </p>
        </div>

        {/* Bookmarks toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
              showOnlyBookmarks
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-white' : ''}`} />
            <span>Bookmarked ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 mb-8 space-y-4">
        {/* Search input & Sort */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword (e.g. Fractions, Photosynthesis, Coding)..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Latest Uploads</option>
              <option value="popular">Most Popular</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Badges & Dropdowns */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </span>

            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {SUBJECTS.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>

            {/* Grade Level Selector */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {GRADES.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>

            {/* File Type Selector */}
            <select
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {FILE_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Filter Status & Reset */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredResources.length}</strong> of {resources.length}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline transition-colors"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Resource Cards */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onView={onViewResource}
              onDownload={onDownloadResource}
              onBookmark={onToggleBookmark}
              isBookmarked={bookmarks.includes(resource.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            No matching resources found
          </h3>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            We couldn't find any learning materials matching your filter criteria. Try adjusting your search query or grade levels.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
}
