'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiPlus, FiUploadCloud, FiTrash2, FiX, FiCheck, FiEye } from 'react-icons/fi';
import { achievementsService } from '@/services/api';

const initialAchievements = [];

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewPdfUrl, setPreviewPdfUrl] = useState(null);
  const [newAch, setNewAch] = useState({ title: '', issuer: '', score: '', date: '', fileName: '' });
  const fileInputRef = useRef(null);

  const loadAchievements = async () => {
    setIsLoading(true);
    const res = await achievementsService.getAll();
    setAchievements(Array.isArray(res?.data) ? res.data : []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAch((prev) => ({ ...prev, fileName: file.name }));
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await achievementsService.upload(formData);
        if (res?.data?.url) {
          setNewAch((prev) => ({
            ...prev,
            certificateUrl: res.data.url,
            certificateImage: res.data.url,
            fileName: file.name
          }));
        } else if (res?.message) {
          alert(`Upload Notice: ${res.message}`);
        }
      } catch (err) {
        console.error('File upload error:', err);
        alert('File upload failed. Please verify admin session.');
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = typeof window !== 'undefined' ? localStorage.getItem('vanshos_admin_token') : null;
    if (!token) {
      alert('JWT Admin session missing or expired. Please login to save to MongoDB Atlas.');
      window.location.href = '/admin/login';
      return;
    }

    await achievementsService.create({
      title: newAch.title,
      issuer: newAch.issuer,
      score: newAch.score,
      date: newAch.date || '2026',
      certificateUrl: newAch.certificateUrl || newAch.fileName || '',
      fileName: newAch.fileName || '',
    });
    setIsModalOpen(false);
    setNewAch({ title: '', issuer: '', score: '', date: '', fileName: '', certificateUrl: '' });
    loadAchievements();
  };

  const handleDelete = async (id) => {
    await achievementsService.delete(id);
    setAchievements((prev) => (Array.isArray(prev) ? prev : []).filter((a) => (a.id || a._id) !== id));
    loadAchievements();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            Achievements & <span className="gold-gradient-text">Certificates</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Manage certified credentials, honors, and degree milestones
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow hover:scale-[1.02] transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, idx) => {
          const achId = item.id || item._id;
          return (
            <div
              key={achId ? `${achId}_${idx}` : `ach_${idx}`}
              className="glass-card p-6 rounded-[24px] border border-white/10 hover:border-goldAccent/40 transition-all space-y-4 shadow-luxury-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-goldAccent/10 text-goldAccent flex items-center justify-center">
                  <FiAward className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl text-luxuryWhite">{item.title}</h3>
                <p className="font-body text-xs text-luxuryGray">{item.issuer}</p>
                {(item.cgpa || item.score) && (
                  <span className="inline-block px-3 py-1 rounded-full bg-goldAccent/10 text-goldAccent font-button text-xs font-semibold">
                    {item.cgpa || item.score}
                  </span>
                )}
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-button text-luxuryMuted">
                <span>{item.date || '2026'}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const certTarget = item.certificateUrl || item.certificateImage;
                      if (certTarget && (certTarget.startsWith('/uploads/') || certTarget.startsWith('/api/'))) {
                        setPreviewPdfUrl(certTarget);
                      } else if (certTarget && (certTarget.startsWith('http://') || certTarget.startsWith('https://'))) {
                        window.open(certTarget, '_blank');
                      } else {
                        alert('No certificate file attached to this achievement yet. Click "+ ADD ACHIEVEMENT" and attach a PDF or image file.');
                      }
                    }}
                    className="p-2 rounded-[10px] bg-goldAccent/10 text-goldAccent hover:bg-goldAccent/20 transition-colors flex items-center space-x-1"
                    title="View Certificate Document"
                  >
                    <FiEye className="w-3.5 h-3.5" />
                    <span className="text-[10px]">PDF View</span>
                  </button>
                  <button
                    onClick={() => handleDelete(achId)}
                    className="p-2 rounded-[10px] bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md glass-card p-8 rounded-[24px] border border-white/10 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-heading text-2xl text-luxuryWhite">Add Achievement</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-luxuryMuted hover:text-luxuryWhite">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 font-body text-xs">
                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Achievement Title</label>
                  <input
                    type="text"
                    required
                    value={newAch.title}
                    onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                    placeholder="e.g. Data Analytics Specialization"
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Issuing Authority / University</label>
                  <input
                    type="text"
                    value={newAch.issuer}
                    onChange={(e) => setNewAch({ ...newAch, issuer: e.target.value })}
                    placeholder="e.g. YCMOU or Coursera"
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  />
                </div>

                {/* Certificate Upload Area */}
                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Certificate Upload (PDF / Image)</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-6 rounded-[16px] bg-[#121212] border border-dashed border-white/20 text-center space-y-2 cursor-pointer hover:border-goldAccent/50 transition-colors"
                  >
                    <FiUploadCloud className="w-8 h-8 text-goldAccent mx-auto" />
                    {newAch.fileName ? (
                      <span className="block font-button text-goldAccent text-xs font-semibold">
                        Selected: {newAch.fileName} (Click to change)
                      </span>
                    ) : (
                      <span className="block font-button text-luxuryMuted text-xs">
                        Drag certificate file or <span className="text-goldAccent underline font-semibold">click to browse</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3 border-t border-white/10 font-button">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-[12px] bg-white/5 text-luxuryWhite"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-[12px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-bold uppercase"
                  >
                    Save Achievement
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live PDF Viewer Modal Overlay */}
      <AnimatePresence>
        {previewPdfUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-4xl glass-card p-6 rounded-[24px] border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading text-xl text-luxuryWhite flex items-center space-x-2">
                  <FiEye className="w-5 h-5 text-goldAccent" />
                  <span>Certificate Document Viewer</span>
                </h3>
                <button
                  onClick={() => setPreviewPdfUrl(null)}
                  className="text-luxuryMuted hover:text-luxuryWhite p-1"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="w-full h-[600px] rounded-[16px] overflow-hidden bg-[#121212] border border-white/10">
                <iframe
                  src={
                    previewPdfUrl && (previewPdfUrl.startsWith('http://') || previewPdfUrl.startsWith('https://'))
                      ? previewPdfUrl
                      : previewPdfUrl && previewPdfUrl.startsWith('/uploads/')
                      ? `http://localhost:5000${previewPdfUrl}`
                      : 'http://localhost:5000/api/resume/view'
                  }
                  className="w-full h-full border-none"
                  title="Certificate Live Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
