import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResourceHub from './components/ResourceHub';
import QuizModule from './components/QuizModule';
import ProgressTracker from './components/ProgressTracker';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ResourcePreviewModal from './components/ResourcePreviewModal';
import Toast from './components/Toast';

import {
  INITIAL_RESOURCES,
  QUIZ_QUESTIONS,
  SYLLABUS_MILESTONES
} from './data/initialData';

export default function App() {
  // Navigation Active Tab: 'home' | 'resources' | 'quiz' | 'tracker' | 'admin'
  const [activeTab, setActiveTab] = useState('home');

  // Resources state with LocalStorage persistence
  const [resources, setResources] = useState(() => {
    try {
      const saved = localStorage.getItem('educonnect_resources');
      return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
    } catch (e) {
      return INITIAL_RESOURCES;
    }
  });

  // Bookmarks state with LocalStorage persistence
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('educonnect_bookmarks');
      return saved ? JSON.parse(saved) : ['res-1', 'res-3'];
    } catch (e) {
      return ['res-1', 'res-3'];
    }
  });

  // Offline downloads state with LocalStorage persistence
  const [offlineDownloads, setOfflineDownloads] = useState(() => {
    try {
      const saved = localStorage.getItem('educonnect_downloads');
      return saved ? JSON.parse(saved) : ['res-1'];
    } catch (e) {
      return ['res-1'];
    }
  });

  // Syllabus tracker state with LocalStorage persistence
  const [syllabusTracks, setSyllabusTracks] = useState(() => {
    try {
      const saved = localStorage.getItem('educonnect_syllabus');
      return saved ? JSON.parse(saved) : SYLLABUS_MILESTONES;
    } catch (e) {
      return SYLLABUS_MILESTONES;
    }
  });

  // Preview Modal state
  const [previewResource, setPreviewResource] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('educonnect_resources', JSON.stringify(resources));
    } catch (e) {
      console.warn('Failed to save resources to local storage', e);
    }
  }, [resources]);

  useEffect(() => {
    try {
      localStorage.setItem('educonnect_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks to local storage', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('educonnect_downloads', JSON.stringify(offlineDownloads));
    } catch (e) {
      console.warn('Failed to save downloads to local storage', e);
    }
  }, [offlineDownloads]);

  useEffect(() => {
    try {
      localStorage.setItem('educonnect_syllabus', JSON.stringify(syllabusTracks));
    } catch (e) {
      console.warn('Failed to save syllabus to local storage', e);
    }
  }, [syllabusTracks]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (resourceId) => {
    if (bookmarks.includes(resourceId)) {
      setBookmarks((prev) => prev.filter((id) => id !== resourceId));
      showToast('Removed resource from bookmarks.', 'info');
    } else {
      setBookmarks((prev) => [...prev, resourceId]);
      showToast('Resource saved to your bookmarks!', 'success');
    }
  };

  // Download simulation handler
  const handleDownloadResource = (resource) => {
    // Increment download count locally
    setResources((prev) =>
      prev.map((r) =>
        r.id === resource.id ? { ...r, downloads: (r.downloads || 0) + 1 } : r
      )
    );

    if (!offlineDownloads.includes(resource.id)) {
      setOfflineDownloads((prev) => [...prev, resource.id]);
    }

    showToast(
      `"${resource.title}" saved to local cache for offline reading!`,
      'success'
    );
  };

  // Toggle topic completed in progress tracker
  const handleToggleTopic = (trackId, topicId) => {
    setSyllabusTracks((prev) =>
      prev.map((track) => {
        if (track.id !== trackId) return track;
        return {
          ...track,
          topics: track.topics.map((t) => {
            if (t.id !== topicId) return t;
            const newCompleted = !t.completed;
            if (newCompleted) {
              showToast(`Completed: "${t.title}" (+25 XP)`, 'success');
            }
            return { ...t, completed: newCompleted };
          })
        };
      })
    );
  };

  // Admin add resource
  const handleAddResource = (newRes) => {
    setResources((prev) => [newRes, ...prev]);
    showToast(`Published new study resource: "${newRes.title}"`, 'success');
  };

  // Admin update resource
  const handleUpdateResource = (updatedRes) => {
    setResources((prev) =>
      prev.map((r) => (r.id === updatedRes.id ? updatedRes : r))
    );
    showToast(`Updated "${updatedRes.title}" successfully.`, 'success');
  };

  // Admin delete resource
  const handleDeleteResource = (resourceId) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
    setBookmarks((prev) => prev.filter((id) => id !== resourceId));
    setOfflineDownloads((prev) => prev.filter((id) => id !== resourceId));
    showToast('Resource removed from repository.', 'info');
  };

  // Scroll to top upon tab switch
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        offlineDownloadsCount={offlineDownloads.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreClick={() => handleTabChange('resources')}
              onAdminClick={() => handleTabChange('admin')}
              onQuizClick={() => handleTabChange('quiz')}
            />

            {/* Featured study materials snapshot on home */}
            <div className="bg-white border-y border-slate-200/80 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Community Spotlight
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                      Featured High-Impact Resources
                    </h2>
                  </div>
                  <button
                    onClick={() => handleTabChange('resources')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                  >
                    View All {resources.length} Resources →
                  </button>
                </div>

                <ResourceHub
                  resources={resources.slice(0, 4)}
                  bookmarks={bookmarks}
                  onViewResource={(r) => setPreviewResource(r)}
                  onDownloadResource={handleDownloadResource}
                  onToggleBookmark={handleToggleBookmark}
                />
              </div>
            </div>

            {/* Interactive Progress Teaser */}
            <div className="py-12 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Personalized Roadmap
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                      Track Your Learning Milestones
                    </h2>
                  </div>
                  <button
                    onClick={() => handleTabChange('tracker')}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1"
                  >
                    Open Full Tracker →
                  </button>
                </div>

                <ProgressTracker
                  syllabusTracks={syllabusTracks}
                  onToggleTopic={handleToggleTopic}
                />
              </div>
            </div>

            {/* Quick Practice Quiz Teaser */}
            <div className="bg-white border-t border-slate-200/80 py-12">
              <QuizModule
                questions={QUIZ_QUESTIONS}
                onQuizCompleted={(res) => {
                  showToast(
                    `Quiz finished! You scored ${res.score}/${res.total} in ${res.subject}!`,
                    'success'
                  );
                }}
              />
            </div>
          </>
        )}

        {activeTab === 'resources' && (
          <ResourceHub
            resources={resources}
            bookmarks={bookmarks}
            onViewResource={(r) => setPreviewResource(r)}
            onDownloadResource={handleDownloadResource}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizModule
            questions={QUIZ_QUESTIONS}
            onQuizCompleted={(res) => {
              showToast(
                `Quiz completed! ${res.score}/${res.total} correct in ${res.subject}!`,
                'success'
              );
            }}
          />
        )}

        {activeTab === 'tracker' && (
          <ProgressTracker
            syllabusTracks={syllabusTracks}
            onToggleTopic={handleToggleTopic}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            resources={resources}
            onAddResource={handleAddResource}
            onUpdateResource={handleUpdateResource}
            onDeleteResource={handleDeleteResource}
            onViewResource={(r) => setPreviewResource(r)}
          />
        )}
      </main>

      {/* Resource Detail & Preview Modal */}
      <ResourcePreviewModal
        resource={previewResource}
        isOpen={Boolean(previewResource)}
        onClose={() => setPreviewResource(null)}
        onDownload={handleDownloadResource}
        onBookmark={handleToggleBookmark}
        isBookmarked={previewResource ? bookmarks.includes(previewResource.id) : false}
      />

      {/* Footer */}
      <Footer onNavigate={handleTabChange} />
    </div>
  );
}
