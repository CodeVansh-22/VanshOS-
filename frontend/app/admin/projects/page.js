'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFolder,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiGithub,
  FiExternalLink,
  FiUploadCloud,
  FiCheck,
  FiX,
  FiStar,
  FiImage
} from 'react-icons/fi';
import { projectsService } from '@/services/api';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Application',
    description: '',
    github: '',
    demo: '',
    featured: false,
    image: '',
    imageName: '',
  });

  const loadProjects = async () => {
    setIsLoading(true);
    const res = await projectsService.getAll();
    setProjects(Array.isArray(res?.data) ? res.data : []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
          imageName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateOrUpdateProject = async (e) => {
    e.preventDefault();
    if (selectedProject) {
      await projectsService.update(selectedProject.id, formData);
    } else {
      await projectsService.create(formData);
    }
    setIsAddModalOpen(false);
    setSelectedProject(null);
    setFormData({ title: '', category: 'Web Application', description: '', github: '', demo: '', featured: false, image: '', imageName: '' });
    loadProjects();
  };

  const handleDeleteProject = async () => {
    if (selectedProject) {
      await projectsService.delete(selectedProject.id);
      setIsDeleteModalOpen(false);
      setSelectedProject(null);
      loadProjects();
    }
  };

  const safeProjects = Array.isArray(projects) ? projects : [];
  const filteredProjects = safeProjects.filter((p) =>
    (p.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            Project <span className="gold-gradient-text">Management</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Create, update, toggle featured status, and publish projects to MongoDB Atlas
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProject(null);
            setFormData({ title: '', category: 'Web Application', description: '', github: '', demo: '', featured: false, image: '', imageName: '' });
            setIsAddModalOpen(true);
          }}
          className="px-5 py-3 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow hover:scale-[1.02] transition-all"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Filter bar */}
      <div className="glass-card p-4 rounded-[20px] border border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3 bg-[#121212] px-4 py-2.5 rounded-[14px] border border-white/10 w-72 md:w-96">
          <FiSearch className="w-4 h-4 text-luxuryMuted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by title..."
            className="bg-transparent text-xs text-luxuryWhite placeholder-luxuryMuted focus:outline-none w-full font-body"
          />
        </div>

        <div className="text-xs font-button text-luxuryMuted">
          Showing <span className="text-goldAccent font-semibold">{filteredProjects.length}</span> projects
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass-card rounded-[24px] border border-white/10 overflow-hidden shadow-luxury-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-xs">
            <thead className="bg-[#121212] border-b border-white/10 font-button uppercase text-[11px] text-luxuryMuted tracking-wider">
              <tr>
                <th className="py-4 px-6">Project Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Featured</th>
                <th className="py-4 px-6">Links</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-luxuryMuted font-button animate-pulse">
                    Loading projects from MongoDB Atlas...
                  </td>
                </tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-heading text-sm text-luxuryWhite font-medium">
                      {project.title}
                    </td>
                    <td className="py-4 px-6 text-luxuryGray">{project.category || 'Web Application'}</td>
                    <td className="py-4 px-6">
                      {project.featured ? (
                        <span className="px-2.5 py-1 rounded-full bg-goldAccent/10 text-goldAccent text-[10px] font-button font-semibold flex items-center space-x-1 w-fit">
                          <FiStar className="w-3 h-3 fill-goldAccent" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-luxuryMuted">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-3 text-luxuryMuted">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-luxuryWhite">
                            <FiGithub className="w-4 h-4" />
                          </a>
                        )}
                        {(project.liveDemo || project.demo) && (
                          <a
                            href={project.liveDemo || project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-goldAccent"
                            title="Visit Live Demo"
                          >
                            <FiExternalLink className="w-4 h-4 text-goldAccent" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-luxuryMuted">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Recent'}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setFormData(project);
                          setIsAddModalOpen(true);
                        }}
                        className="p-2 rounded-[10px] bg-white/5 hover:bg-white/10 text-luxuryWhite transition-colors"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 rounded-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-luxuryMuted font-button">
                    No projects found in database. Click "Add New Project" to create your first project.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-xl glass-card p-8 rounded-[24px] border border-white/10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-heading text-2xl text-luxuryWhite">
                  {selectedProject ? 'Edit Project' : 'Create New Project'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-luxuryMuted hover:text-luxuryWhite">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateOrUpdateProject} className="space-y-4 font-body text-xs">
                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Sales Analytics Platform"
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Category</label>
                  <select
                    value={formData.category || 'Web Application'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Python Script">Python Script</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly describe key architecture and technologies..."
                    className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm resize-none"
                  />
                </div>

                {/* Cover Image Upload Area */}
                <div className="space-y-1">
                  <label className="font-button text-luxuryGray uppercase tracking-wider">Cover Image Upload</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-6 rounded-[16px] bg-[#121212] border border-dashed border-white/20 text-center space-y-2 cursor-pointer hover:border-goldAccent/50 transition-colors relative"
                  >
                    {formData.image ? (
                      <div className="flex flex-col items-center space-y-2">
                        <img src={formData.image} alt="Preview" className="h-24 w-auto rounded-lg object-cover border border-goldAccent/40" />
                        <span className="text-xs text-goldAccent font-button font-semibold">{formData.imageName || 'Cover Image Selected'} (Click to change)</span>
                      </div>
                    ) : (
                      <>
                        <FiUploadCloud className="w-8 h-8 text-goldAccent mx-auto animate-bounce" />
                        <span className="block font-button text-luxuryMuted text-xs">
                          Drag & drop cover image or <span className="text-goldAccent underline font-semibold">click to browse</span>
                        </span>
                        <span className="block text-[10px] text-luxuryMuted">PNG, JPG, WEBP up to 5MB</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-button text-luxuryGray uppercase tracking-wider">GitHub Repository</label>
                    <input
                      type="url"
                      value={formData.github || ''}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-button text-luxuryGray uppercase tracking-wider">Live Demo Link</label>
                    <input
                      type="url"
                      value={formData.demo || formData.liveDemo || ''}
                      onChange={(e) => setFormData({ ...formData, demo: e.target.value, liveDemo: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
                    />
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={Boolean(formData.featured)}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-goldAccent cursor-pointer"
                  />
                  <label htmlFor="featured" className="font-button text-luxuryWhite text-xs cursor-pointer">
                    Highlight as Featured Project on Hero Showcase
                  </label>
                </div>

                <div className="pt-4 flex justify-end space-x-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-[14px] bg-white/5 hover:bg-white/10 text-luxuryWhite font-button text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-[14px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm glass-card p-6 rounded-[24px] border border-white/10 space-y-4 text-center">
              <h3 className="font-heading text-xl text-luxuryWhite">Delete Project?</h3>
              <p className="font-body text-xs text-luxuryMuted">
                Are you sure you want to remove <span className="text-luxuryWhite font-semibold">{selectedProject?.title}</span>? This action will delete the record from MongoDB Atlas.
              </p>
              <div className="flex justify-center space-x-3 pt-2 font-button text-xs">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-[12px] bg-white/5 text-luxuryWhite"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProject}
                  className="px-4 py-2 rounded-[12px] bg-red-500 text-white font-bold"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
