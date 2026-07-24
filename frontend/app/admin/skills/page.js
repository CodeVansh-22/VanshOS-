'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiPlus, FiTrash2, FiLayers, FiCode, FiDatabase, FiX, FiCheck } from 'react-icons/fi';
import { skillsService } from '@/services/api';

const defaultCategories = [
  { name: 'Web Development', count: 0, items: [] },
  { name: 'Data Analytics', count: 0, items: [] },
  { name: 'Programming Languages', count: 0, items: [] },
  { name: 'Tools & Databases', count: 0, items: [] },
];

export default function AdminSkills() {
  const [categories, setCategories] = useState(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Web Development', level: 'Advanced', icon: 'FiCode' });

  const loadSkills = async () => {
    setIsLoading(true);
    const res = await skillsService.getAll();
    const dbSkills = Array.isArray(res?.data) ? res.data : [];
    setCategories((prev) =>
      prev.map((cat) => {
        const catSkills = dbSkills.filter((s) => s && s.category === cat.name);
        return {
          ...cat,
          count: catSkills.length,
          items: catSkills,
        };
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleDeleteSkill = async (categoryName, skillId) => {
    await skillsService.delete(skillId);
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.name === categoryName) {
          return {
            ...cat,
            count: Math.max(0, cat.count - 1),
            items: cat.items.filter((item) => (item.id || item._id) !== skillId),
          };
        }
        return cat;
      })
    );
    loadSkills();
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('vanshos_admin_token') : null;
    if (!token) {
      alert('JWT Admin session missing or expired. Please login to save to MongoDB Atlas.');
      window.location.href = '/admin/login';
      return;
    }

    const skillItem = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category,
      level: newSkill.level,
      icon: newSkill.icon,
    };

    // 1. Instantly update UI optimistically
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.name === newSkill.category) {
          return {
            ...cat,
            count: cat.count + 1,
            items: [...cat.items, skillItem],
          };
        }
        return cat;
      })
    );

    setIsModalOpen(false);
    const addedSkillName = newSkill.name;
    setNewSkill({ name: '', category: 'Web Development', level: 'Advanced', icon: 'FiCode' });

    // 2. Persist to MongoDB Atlas API
    try {
      console.log('[Frontend] Transmitting skill to API:', skillItem);
      const res = await skillsService.create({
        name: skillItem.name,
        category: skillItem.category,
        level: skillItem.level,
        icon: skillItem.icon,
      });
      console.log('[Frontend] API Response:', res);
      if (res && res.data && (res.data._id || res.data.id)) {
        const mongoId = res.data._id || res.data.id;
        // Replace temporary id with real MongoDB _id
        setCategories((prev) =>
          prev.map((cat) => {
            if (cat.name === skillItem.category) {
              return {
                ...cat,
                items: cat.items.map((item) =>
                  item.name === addedSkillName ? { ...item, _id: mongoId, id: mongoId } : item
                ),
              };
            }
            return cat;
          })
        );
      }
    } catch (err) {
      console.error('[Frontend] Error creating skill:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            Skills & <span className="gold-gradient-text">Competencies</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Organize technology stack categories and skill items synchronized with MongoDB Atlas
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow hover:scale-[1.02] transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="glass-card p-6 rounded-[24px] border border-white/10 space-y-4 shadow-luxury-shadow"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-[14px] bg-goldAccent/10 text-goldAccent flex items-center justify-center">
                  <FiCpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-luxuryWhite">{cat.name}</h3>
                  <span className="font-button text-[10px] text-luxuryMuted uppercase tracking-wider">
                    {cat.items.length} Active Skills
                  </span>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="py-6 text-center text-xs text-luxuryMuted font-button animate-pulse">
                Loading category competencies...
              </div>
            ) : cat.items.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                {cat.items.map((item, idx) => (
                  <div
                    key={item._id || item.id ? `${item._id || item.id}_${idx}` : `${cat.name}_${item.name}_${idx}`}
                    className="p-3 rounded-[14px] bg-[#121212] border border-white/5 flex items-center justify-between group hover:border-goldAccent/30 transition-colors"
                  >
                    <div>
                      <span className="block font-heading text-sm text-luxuryWhite">{item.name}</span>
                      <span className="block font-button text-[10px] text-emeraldAccent">{item.level || 'Advanced'}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(cat.name, item.id || item._id)}
                      className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      title="Delete skill"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border border-dashed border-white/10 rounded-[16px]">
                <span className="font-button text-xs text-luxuryMuted">No skills added in this category yet.</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
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
                <h3 className="font-heading text-2xl text-luxuryWhite">Add New Skill</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-luxuryMuted hover:text-luxuryWhite">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddSkill} className="space-y-4 font-body text-xs">
                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="e.g. Next.js, Python, SQL, Tableau"
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Category Dropdown</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Tools & Databases">Tools & Databases</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Proficiency Level</label>
                  <select
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  >
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Proficient">Proficient</option>
                  </select>
                </div>

                {/* Icon Picker Placeholder */}
                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Icon Picker Placeholder</label>
                  <div className="grid grid-cols-4 gap-2 p-3 rounded-[14px] bg-[#121212] border border-white/10">
                    <button type="button" className="p-3 rounded-lg bg-goldAccent/20 text-goldAccent flex justify-center">
                      <FiCode className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-3 rounded-lg bg-white/5 text-luxuryMuted flex justify-center hover:text-luxuryWhite">
                      <FiDatabase className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-3 rounded-lg bg-white/5 text-luxuryMuted flex justify-center hover:text-luxuryWhite">
                      <FiCpu className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-3 rounded-lg bg-white/5 text-luxuryMuted flex justify-center hover:text-luxuryWhite">
                      <FiLayers className="w-5 h-5" />
                    </button>
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
                    Save Skill
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
