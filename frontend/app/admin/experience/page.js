'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBriefcase,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiMapPin,
  FiX,
  FiCheckCircle
} from 'react-icons/fi';
import { experienceService } from '@/services/api';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    employmentType: 'Internship',
    status: 'Present',
    startDate: '',
    endDate: 'Present',
    currentlyWorking: true,
    location: 'Remote',
    description: '',
  });

  const loadExperiences = async () => {
    setIsLoading(true);
    const res = await experienceService.getAll();
    setExperiences(Array.isArray(res?.data) ? res.data : []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = typeof window !== 'undefined' ? localStorage.getItem('vanshos_admin_token') : null;
    if (!token) {
      alert('JWT Admin session missing or expired. Please login to save to MongoDB Atlas.');
      window.location.href = '/admin/login';
      return;
    }

    if (selectedExp) {
      await experienceService.update(selectedExp.id || selectedExp._id, formData);
    } else {
      await experienceService.create(formData);
    }

    setIsAddModalOpen(false);
    setSelectedExp(null);
    setFormData({
      title: '',
      company: '',
      employmentType: 'Internship',
      status: 'Present',
      startDate: '',
      endDate: 'Present',
      currentlyWorking: true,
      location: 'Remote',
      description: '',
    });
    loadExperiences();
  };

  const handleDelete = async (id) => {
    await experienceService.delete(id);
    setExperiences((prev) => (Array.isArray(prev) ? prev : []).filter((e) => (e.id || e._id) !== id));
    loadExperiences();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            Work <span className="gold-gradient-text">Experience</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Manage professional roles, internships, and career history records in MongoDB Atlas
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedExp(null);
            setFormData({
              title: '',
              company: '',
              employmentType: 'Internship',
              status: 'Present',
              startDate: '',
              endDate: 'Present',
              currentlyWorking: true,
              location: 'Remote',
              description: '',
            });
            setIsAddModalOpen(true);
          }}
          className="px-5 py-3 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow hover:scale-[1.02] transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 py-12 text-center text-luxuryMuted font-button text-xs animate-pulse">
            Loading experience records...
          </div>
        ) : experiences.length > 0 ? (
          experiences.map((exp, idx) => {
            const expId = exp.id || exp._id;
            const descriptions = Array.isArray(exp.description)
              ? exp.description
              : typeof exp.description === 'string'
              ? exp.description.split('\n').filter(Boolean)
              : [];

            return (
              <div
                key={expId ? `${expId}_${idx}` : `exp_${idx}`}
                className="glass-card p-6 rounded-[24px] border border-white/10 space-y-4 shadow-luxury-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[16px] bg-goldAccent/10 text-goldAccent flex items-center justify-center">
                      <FiBriefcase className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emeraldAccent/10 text-emeraldAccent font-button text-xs font-semibold">
                      {exp.employmentType || 'Internship'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-luxuryWhite font-medium">{exp.title}</h3>
                    <p className="font-button text-xs text-goldAccent font-semibold">{exp.company}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-button text-luxuryMuted pt-1">
                    <span className="flex items-center space-x-1">
                      <FiCalendar className="w-3.5 h-3.5 text-goldAccent" />
                      <span>{exp.startDate} – {exp.endDate || 'Present'}</span>
                    </span>
                    {exp.location && (
                      <span className="flex items-center space-x-1">
                        <FiMapPin className="w-3.5 h-3.5 text-emeraldAccent" />
                        <span>{exp.location}</span>
                      </span>
                    )}
                  </div>

                  {descriptions.length > 0 && (
                    <ul className="space-y-1.5 pt-3 border-t border-white/5 font-body text-xs text-luxuryGray font-light">
                      {descriptions.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <FiCheckCircle className="w-3.5 h-3.5 text-emeraldAccent shrink-0 mt-0.5" />
                          <span>{desc.replace(/^•\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setSelectedExp(exp);
                      setFormData({
                        title: exp.title || '',
                        company: exp.company || '',
                        employmentType: exp.employmentType || 'Internship',
                        status: exp.status || 'Present',
                        startDate: exp.startDate || '',
                        endDate: exp.endDate || 'Present',
                        currentlyWorking: Boolean(exp.currentlyWorking),
                        location: exp.location || 'Remote',
                        description: descriptions.join('\n'),
                      });
                      setIsAddModalOpen(true);
                    }}
                    className="p-2 rounded-[10px] bg-white/5 hover:bg-white/10 text-luxuryWhite transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(expId)}
                    className="p-2 rounded-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 py-12 text-center text-luxuryMuted font-button text-xs glass-card rounded-[24px] border border-white/10">
            No work experience records found. Click "Add Experience" to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Experience Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
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
              className="w-full max-w-lg glass-card p-8 rounded-[24px] border border-white/10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-heading text-2xl text-luxuryWhite">
                  {selectedExp ? 'Edit Work Experience' : 'Add Work Experience'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-luxuryMuted hover:text-luxuryWhite">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 font-body text-xs">
                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. AI Web Developer Intern"
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. InAmigos Foundation"
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-button text-luxuryGray uppercase tracking-wider">Employment Type</label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-button text-luxuryGray uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Remote / Mumbai"
                      className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-button text-luxuryGray uppercase tracking-wider">Start Date</label>
                    <input
                      type="text"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      placeholder="e.g. 2024"
                      className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-button text-luxuryGray uppercase tracking-wider">End Date</label>
                    <input
                      type="text"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      placeholder="Present"
                      className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Description / Responsibilities (One per line)</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Developing responsive web applications...&#10;Working with AI tools..."
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end space-x-3 border-t border-white/10 font-button">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-[12px] bg-white/5 text-luxuryWhite"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-[12px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-bold uppercase"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
