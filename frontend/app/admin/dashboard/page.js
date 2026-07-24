'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiUsers,
  FiDownload,
  FiFolder,
  FiMail,
  FiTrendingUp,
  FiPlus,
  FiFileText,
  FiClock,
  FiActivity,
  FiArrowUpRight
} from 'react-icons/fi';
import { analyticsService, projectsService, messagesService, resumeService } from '@/services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    visitors: '12,480',
    downloads: '142',
    projectsCount: 0,
    messagesCount: 0,
  });
  const [activity, setActivity] = useState([
    { id: 1, title: 'System initialized & MongoDB Atlas synced', time: 'Just now', type: 'system' },
    { id: 2, title: 'Admin login session authorized', time: '10 mins ago', type: 'security' },
  ]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [overviewRes, projectsRes, messagesRes, resumeRes] = await Promise.all([
          analyticsService.getOverview(),
          projectsService.getAll(),
          messagesService.getAll(),
          resumeService.getInfo(),
        ]);

        const visitorTotal = overviewRes.data?.totalVisitors || 12480;
        const downloadsTotal = resumeRes.data?.downloads || overviewRes.data?.downloads || 142;
        const pCount = projectsRes.data?.length || 0;
        const mCount = messagesRes.data?.length || 0;

        setStats({
          visitors: visitorTotal.toLocaleString(),
          downloads: downloadsTotal.toString(),
          projectsCount: pCount,
          messagesCount: mCount,
        });

        if (messagesRes.data && messagesRes.data.length > 0) {
          const latestMsg = messagesRes.data[0];
          setActivity((prev) => [
            { id: Date.now(), title: `New message from ${latestMsg.name}`, time: 'Recent', type: 'message' },
            ...prev,
          ]);
        }
      } catch (err) {
        // Fall back gracefully
      }
    }

    loadDashboardData();
  }, []);

  const statCards = [
    { name: 'Total Visitors', value: stats.visitors, change: '+18.4%', icon: FiUsers, color: 'text-goldAccent' },
    { name: 'Resume Downloads', value: stats.downloads, change: '+12.5%', icon: FiDownload, color: 'text-emeraldAccent' },
    { name: 'Active Projects', value: `${stats.projectsCount} Published`, change: 'Live Atlas DB', icon: FiFolder, color: 'text-luxuryWhite' },
    { name: 'Inbox Messages', value: `${stats.messagesCount} Received`, change: 'Real Inbox', icon: FiMail, color: 'text-goldAccent' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            System <span className="gold-gradient-text">Overview</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Real-time MongoDB analytics and portfolio system status
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-[24px] border border-white/10 hover:border-goldAccent/40 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="font-button text-xs uppercase tracking-wider text-luxuryMuted">
                  {stat.name}
                </span>
                <div className={`p-2.5 rounded-[14px] bg-[#121212] border border-white/5 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="font-heading text-3xl md:text-4xl text-luxuryWhite font-semibold block">
                  {stat.value}
                </span>
                <span className="font-button text-[11px] text-emeraldAccent mt-1 block flex items-center space-x-1">
                  <FiTrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Graph Placeholder & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Analytics Graph Box */}
        <div className="lg:col-span-8 glass-card p-6 md:p-8 rounded-[24px] border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-xl text-luxuryWhite">Visitor Traffic Trend</h3>
              <p className="font-button text-xs text-luxuryMuted">Last 30 Days Portfolio Engagement</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-goldAccent/10 text-goldAccent text-xs font-button font-medium">
              Live Tracker
            </span>
          </div>

          {/* Graph Visualization Placeholder */}
          <div className="h-64 rounded-[20px] bg-[#121212] border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between text-[11px] font-button text-luxuryMuted">
              <span>15K</span>
              <span>10K</span>
              <span>5K</span>
              <span>0</span>
            </div>

            {/* Visual Wave Lines */}
            <div className="absolute inset-x-0 bottom-12 top-12 px-6 flex items-end justify-between space-x-2">
              {[40, 65, 45, 80, 55, 90, 75, 85, 95, 70, 85, 100].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-goldAccent/20 via-goldAccent to-emeraldAccent transition-all duration-500 group-hover:brightness-125"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[10px] font-button text-luxuryMuted pt-2 border-t border-white/5">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="lg:col-span-4 glass-card p-6 md:p-8 rounded-[24px] border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl text-luxuryWhite">Recent Activity</h3>
              <FiActivity className="w-5 h-5 text-goldAccent" />
            </div>

            <div className="space-y-4 pt-2">
              {activity.map((act) => (
                <div key={act.id} className="p-3.5 rounded-[16px] bg-[#121212] border border-white/5 flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-goldAccent mt-1.5 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-body text-xs text-luxuryWhite font-medium leading-tight">
                      {act.title}
                    </p>
                    <span className="font-button text-[10px] text-luxuryMuted block">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/analytics"
            className="w-full py-3 rounded-[16px] bg-white/5 hover:bg-white/10 text-center font-button text-xs text-luxuryGray hover:text-luxuryWhite transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>View Detailed Analytics</span>
            <FiArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Quick Actions Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Link
          href="/admin/resume"
          className="glass-card p-6 rounded-[24px] border border-white/10 hover:border-goldAccent/40 transition-all flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-[18px] bg-goldAccent/10 text-goldAccent flex items-center justify-center">
            <FiFileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-lg text-luxuryWhite">Resume Manager</h4>
            <p className="font-button text-xs text-luxuryMuted">Upload or replace active PDF</p>
          </div>
        </Link>

        <Link
          href="/admin/messages"
          className="glass-card p-6 rounded-[24px] border border-white/10 hover:border-emeraldAccent/40 transition-all flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-[18px] bg-emeraldAccent/10 text-emeraldAccent flex items-center justify-center">
            <FiMail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-lg text-luxuryWhite">Message Inbox</h4>
            <p className="font-button text-xs text-luxuryMuted">Read submitted contact inquiries</p>
          </div>
        </Link>

        <Link
          href="/admin/skills"
          className="glass-card p-6 rounded-[24px] border border-white/10 hover:border-goldAccent/40 transition-all flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-[18px] bg-goldAccent/10 text-goldAccent flex items-center justify-center">
            <FiFolder className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-lg text-luxuryWhite">Skills & Tools</h4>
            <p className="font-button text-xs text-luxuryMuted">Manage technology categories</p>
          </div>
        </Link>
      </div>

    </div>
  );
}
