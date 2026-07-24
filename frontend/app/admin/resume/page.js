'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiUploadCloud, FiDownload, FiCheckCircle, FiRefreshCw, FiEye } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';
import { resumeService } from '@/services/api';

export default function AdminResume() {
  const [downloadCount, setDownloadCount] = useState(142);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeResume, setActiveResume] = useState('Vansh_Sunil_Chauhan_Resume_2026.pdf');
  const fileInputRef = useRef(null);

  const handleSelectFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadSuccess(false);
      try {
        const formData = new FormData();
        formData.append('file', file);
        await resumeService.upload(formData);
        setTimeout(() => {
          setIsUploading(false);
          setUploadSuccess(true);
          setActiveResume(file.name);
          setTimeout(() => setUploadSuccess(false), 4000);
        }, 800);
      } catch {
        setIsUploading(false);
      }
    }
  };

  const handleFileDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadSuccess(false);
      try {
        const formData = new FormData();
        formData.append('file', file);
        await resumeService.upload(formData);
        setTimeout(() => {
          setIsUploading(false);
          setUploadSuccess(true);
          setActiveResume(file.name);
          setTimeout(() => setUploadSuccess(false), 4000);
        }, 800);
      } catch {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            Resume <span className="gold-gradient-text">Management</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Update active CV file, monitor download analytics, and preview document
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: File Manager & Drag Drop Upload */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active File Card */}
          <div className="glass-card p-6 rounded-[24px] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-luxury-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-[18px] bg-goldAccent/10 text-goldAccent flex items-center justify-center shrink-0">
                <FiFileText className="w-7 h-7" />
              </div>
              <div>
                <span className="block font-heading text-lg text-luxuryWhite">{activeResume}</span>
                <span className="block font-button text-xs text-emeraldAccent">Active on Public Portfolio • PDF</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 font-button text-xs">
              <button
                onClick={() => resumeService.view()}
                className="px-4 py-2.5 rounded-[14px] bg-goldAccent/10 hover:bg-goldAccent/20 text-goldAccent font-semibold transition-colors flex items-center space-x-2"
              >
                <FiEye className="w-4 h-4" />
                <span>View PDF</span>
              </button>
              <button
                onClick={() => resumeService.download()}
                className="px-4 py-2.5 rounded-[14px] bg-white/5 hover:bg-white/10 text-luxuryWhite transition-colors flex items-center space-x-2"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Upload / Replace Area */}
          <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-4">
            <h3 className="font-heading text-xl text-luxuryWhite">Upload or Replace Resume</h3>
            <p className="font-body text-xs text-luxuryMuted">
              Replacing the resume file automatically updates the download link for visitors on the main website.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleSelectFile}
              accept=".pdf"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="p-10 rounded-[20px] bg-[#121212] border-2 border-dashed border-white/15 hover:border-goldAccent/50 transition-colors text-center space-y-3 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-goldAccent/10 text-goldAccent flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <FiUploadCloud className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-lg text-luxuryWhite">
                {isUploading ? 'Deploying Document...' : 'Drag & drop new PDF here'}
              </h4>
              <p className="font-button text-xs text-luxuryMuted">
                or <span className="text-goldAccent font-semibold underline">Click to browse local files</span> (Max size 10MB)
              </p>
            </div>

            {uploadSuccess && (
              <div className="p-4 rounded-[16px] bg-emeraldAccent/10 border border-emeraldAccent/30 text-emeraldAccent text-xs font-button flex items-center space-x-2">
                <FiCheckCircle className="w-4 h-4" />
                <span>New resume deployed successfully! Public visitors can now download the latest version.</span>
              </div>
            )}
          </div>

          {/* PDF Live Viewer Box */}
          <div className="glass-card p-6 rounded-[24px] border border-white/10 space-y-4 shadow-luxury-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading text-xl text-luxuryWhite flex items-center space-x-2">
                <FiEye className="w-5 h-5 text-goldAccent" />
                <span>Live Document Preview</span>
              </h3>
              <button
                onClick={() => resumeService.view()}
                className="font-button text-xs text-goldAccent hover:underline flex items-center space-x-1"
              >
                <span>Open in Full Tab</span>
                <FiEye className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-full h-[520px] rounded-[16px] overflow-hidden bg-[#121212] border border-white/10 relative">
              <iframe
                src="http://localhost:5000/api/resume/view"
                className="w-full h-full border-none"
                title="Resume PDF Preview"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Download Counter Card & Stats */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-6 shadow-luxury-shadow">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl text-luxuryWhite">Download Counter Card</h3>
              <FiDownload className="w-6 h-6 text-goldAccent" />
            </div>

            <div className="p-6 rounded-[20px] bg-[#121212] border border-white/5 space-y-2 text-center">
              <span className="font-heading text-5xl md:text-6xl text-goldAccent font-bold block">
                {downloadCount}
              </span>
              <span className="font-button text-xs text-luxuryMuted uppercase tracking-wider block">
                Verified Public Downloads
              </span>
            </div>

            <div className="space-y-3 font-button text-xs text-luxuryGray pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span>Top Download Region:</span>
                <span className="text-luxuryWhite font-semibold">Mumbai, India</span>
              </div>
              <div className="flex justify-between">
                <span>Last Downloaded:</span>
                <span className="text-luxuryWhite font-semibold">45 minutes ago</span>
              </div>
              <div className="flex justify-between">
                <span>Conversion Rate:</span>
                <span className="text-emeraldAccent font-semibold">1.14% of visitors</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
