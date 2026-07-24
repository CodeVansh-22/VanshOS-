'use client';

import { motion } from 'framer-motion';
import { FiBarChart2, FiGlobe, FiSmartphone, FiMonitor, FiDownload, FiEye, FiTrendingUp } from 'react-icons/fi';

const countryStats = [
  { country: 'India (Mumbai & Tech Hubs)', percentage: 68, count: '8,486' },
  { country: 'United States', percentage: 18, count: '2,246' },
  { country: 'United Kingdom', percentage: 8, count: '998' },
  { country: 'Germany & EU', percentage: 6, count: '750' },
];

const deviceStats = [
  { device: 'Desktop & Laptop', percentage: 62, icon: FiMonitor, color: 'text-goldAccent' },
  { device: 'Mobile Devices', percentage: 34, icon: FiSmartphone, color: 'text-emeraldAccent' },
  { device: 'Tablets', percentage: 4, icon: FiSmartphone, color: 'text-luxuryWhite' },
];

const browserStats = [
  { name: 'Chrome', percentage: 64 },
  { name: 'Safari', percentage: 22 },
  { name: 'Firefox', percentage: 9 },
  { name: 'Edge & Others', percentage: 5 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            System <span className="gold-gradient-text">Analytics</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Deep dive into geographic origin, browser technology, and conversion stats
          </p>
        </div>
      </div>

      {/* Overview Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-[24px] border border-white/10 space-y-2">
          <span className="font-button text-xs uppercase tracking-wider text-luxuryMuted">Total Unique Visitors</span>
          <span className="font-heading text-3xl text-luxuryWhite font-semibold block">12,480</span>
          <span className="font-button text-[11px] text-emeraldAccent flex items-center space-x-1">
            <FiTrendingUp className="w-3 h-3" />
            <span>+18.4% this month</span>
          </span>
        </div>

        <div className="glass-card p-6 rounded-[24px] border border-white/10 space-y-2">
          <span className="font-button text-xs uppercase tracking-wider text-luxuryMuted">Resume Downloads</span>
          <span className="font-heading text-3xl text-goldAccent font-semibold block">142</span>
          <span className="font-button text-[11px] text-emeraldAccent flex items-center space-x-1">
            <FiTrendingUp className="w-3 h-3" />
            <span>+12.5% conversion</span>
          </span>
        </div>

        <div className="glass-card p-6 rounded-[24px] border border-white/10 space-y-2">
          <span className="font-button text-xs uppercase tracking-wider text-luxuryMuted">Project Views</span>
          <span className="font-heading text-3xl text-emeraldAccent font-semibold block">3,820</span>
          <span className="font-button text-[11px] text-luxuryMuted">Across portfolio cards</span>
        </div>

        <div className="glass-card p-6 rounded-[24px] border border-white/10 space-y-2">
          <span className="font-button text-xs uppercase tracking-wider text-luxuryMuted">Avg Session Duration</span>
          <span className="font-heading text-3xl text-luxuryWhite font-semibold block">2m 45s</span>
          <span className="font-button text-[11px] text-emeraldAccent">High engagement</span>
        </div>
      </div>

      {/* Country Breakdown & Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Countries Chart Box */}
        <div className="lg:col-span-7 glass-card p-8 rounded-[24px] border border-white/10 space-y-6 shadow-luxury-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-xl text-luxuryWhite">Geographic Visitor Breakdown</h3>
              <p className="font-button text-xs text-luxuryMuted">Top traffic origin countries</p>
            </div>
            <FiGlobe className="w-6 h-6 text-goldAccent" />
          </div>

          <div className="space-y-4 pt-2">
            {countryStats.map((item) => (
              <div key={item.country} className="space-y-1">
                <div className="flex justify-between font-button text-xs text-luxuryWhite">
                  <span>{item.country}</span>
                  <span className="text-goldAccent font-semibold">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-goldAccent to-emeraldAccent"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices & Browsers Box */}
        <div className="lg:col-span-5 glass-card p-8 rounded-[24px] border border-white/10 space-y-6 shadow-luxury-shadow">
          <div>
            <h3 className="font-heading text-xl text-luxuryWhite">Devices & Hardware</h3>
            <p className="font-button text-xs text-luxuryMuted">Platform distribution</p>
          </div>

          <div className="space-y-4">
            {deviceStats.map((dev) => {
              const Icon = dev.icon;
              return (
                <div key={dev.device} className="p-4 rounded-[18px] bg-[#121212] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${dev.color}`} />
                    <span className="font-button text-xs text-luxuryWhite">{dev.device}</span>
                  </div>
                  <span className="font-heading text-lg font-bold text-luxuryWhite">{dev.percentage}%</span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="font-button text-xs uppercase tracking-wider text-luxuryMuted mb-3">Top Browsers</h4>
            <div className="grid grid-cols-2 gap-3">
              {browserStats.map((b) => (
                <div key={b.name} className="p-3 rounded-[14px] bg-[#121212] flex justify-between font-button text-xs">
                  <span className="text-luxuryGray">{b.name}</span>
                  <span className="text-goldAccent font-bold">{b.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
