import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Shield, UploadCloud, Search, BookOpen, Download, Users, FileText, CheckCircle2, X } from 'lucide-react';

export default function AdminDashboard({
  resources,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  onViewResource
}) {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [isPasscodeError, setIsPasscodeError] = useState(false);

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    gradeLevel: 'Primary',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    partnerOrg: 'Teach For All Initiative',
    downloadUrl: '',
    contentPreview: '',
    tags: 'Curriculum, Free Access'
  });

  const handleOpenAddModal = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      subject: 'Mathematics',
      gradeLevel: 'Primary',
      fileType: 'PDF',
      fileSize: '3.0 MB',
      partnerOrg: 'Local NGO Partner',
      downloadUrl: '',
      contentPreview: '',
      tags: 'Foundations, Open Access'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      subject: resource.subject,
      gradeLevel: resource.gradeLevel,
      fileType: resource.fileType,
      fileSize: resource.fileSize || '2.0 MB',
      partnerOrg: resource.partnerOrg || 'Community Educator',
      downloadUrl: resource.downloadUrl || '',
      contentPreview: resource.contentPreview || '',
      tags: (resource.tags || []).join(', ')
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a resource title.');
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: editingResource ? editingResource.downloads : 0,
      rating: editingResource ? editingResource.rating : 5.0
    };

    if (editingResource) {
      onUpdateResource({ ...editingResource, ...payload });
    } else {
      onAddResource({
        id: `res-${Date.now()}`,
        ...payload
      });
    }

    setIsModalOpen(false);
  };

  const filteredResources = resources.filter((res) => {
    const term = searchTerm.toLowerCase();
    return (
      res.title.toLowerCase().includes(term) ||
      res.subject.toLowerCase().includes(term) ||
      (res.partnerOrg && res.partnerOrg.toLowerCase().includes(term))
    );
  });

  const totalDownloads = resources.reduce((acc, r) => acc + (r.downloads || 0), 0);

  return (
    <section id="admin" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>NGO Educator & Tutor Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Community Resource Management
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Publish verified, low-bandwidth open curriculum files and monitor real-time distribution metrics across regional community clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Resource</span>
          </button>
        </div>
      </div>

      {/* Platform Stats Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Live Resources</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{resources.length}</div>
            <div className="text-[11px] text-emerald-600 font-medium">100% Free & Open-Access</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Total Offline Downloads</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{totalDownloads.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-medium">+18% this month</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Active Students</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">14,820+</div>
            <div className="text-[11px] text-indigo-600 font-medium">19 Global Regions</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Partner Verification</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">42 NGOs</div>
            <div className="text-[11px] text-amber-600 font-medium">SDG 4 Compliant</div>
          </div>
        </div>
      </div>

      {/* Resource Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-slate-900 text-base">
            Uploaded Curriculums & Study Packs
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search table by title or NGO..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Title & Subject</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Partner NGO</th>
                <th className="py-3 px-4">Downloads</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredResources.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs">
                    <div className="font-bold truncate">{res.title}</div>
                    <div className="text-[11px] text-slate-500">{res.subject}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {res.gradeLevel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {res.fileType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 truncate max-w-[150px]">
                    {res.partnerOrg || 'EduConnect Partner'}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {res.downloads || 0}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onViewResource(res)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(res)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Resource"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${res.title}"?`)) {
                            onDeleteResource(res.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Resource"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden transition-all animate-in fade-in duration-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">
                  {editingResource ? 'Edit Resource' : 'Upload New Study Resource'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Visual Workbook for Fractions & Decimals"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short pedagogical summary for students and tutors..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Digital Literacy">Digital Literacy</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade Level</label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Middle">Middle</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Format Type</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="Link">Web Guide / Interactive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">File Size / Label</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="e.g. 2.4 MB"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Partner NGO / Author</label>
                <input
                  type="text"
                  value={formData.partnerOrg}
                  onChange={(e) => setFormData({ ...formData, partnerOrg: e.target.value })}
                  placeholder="e.g. Teach For All, Pratham Education"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Content Preview Snapshot</label>
                <textarea
                  rows={2}
                  value={formData.contentPreview}
                  onChange={(e) => setFormData({ ...formData, contentPreview: e.target.value })}
                  placeholder="Sample chapter notes, key equations, or practice prompts shown in preview..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all"
                >
                  {editingResource ? 'Save Changes' : 'Publish Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
