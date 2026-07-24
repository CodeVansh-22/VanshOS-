'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiTrash2, FiCornerUpLeft, FiCheckCircle, FiSearch, FiX, FiClock } from 'react-icons/fi';
import { messagesService } from '@/services/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  const loadMessages = async () => {
    setIsLoading(true);
    const res = await messagesService.getAll();
    const list = Array.isArray(res?.data) ? res.data : [];
    setMessages(list);
    if (list.length > 0 && !selectedMessage) {
      setSelectedMessage(list[0]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    await messagesService.delete(id);
    const safeMsgs = Array.isArray(messages) ? messages : [];
    const updated = safeMsgs.filter((m) => (m.id || m._id) !== id);
    setMessages(updated);
    if ((selectedMessage?.id || selectedMessage?._id) === id) {
      setSelectedMessage(updated[0] || null);
    }
    loadMessages();
  };

  const handleSelectMessage = async (msg) => {
    setSelectedMessage(msg);
    const id = msg.id || msg._id;
    if (msg.status === 'unread' && id) {
      await messagesService.updateStatus(id, 'read');
      setMessages((prev) =>
        (Array.isArray(prev) ? prev : []).map((m) => ((m.id || m._id) === id ? { ...m, status: 'read' } : m))
      );
    }
  };

  const safeMessages = Array.isArray(messages) ? messages : [];
  const filteredMessages = safeMessages.filter((m) =>
    filter === 'unread' ? m.status === 'unread' : true
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            Message <span className="gold-gradient-text">Inbox</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Review contact transmissions stored in MongoDB Atlas
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center space-x-2 font-button text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-[14px] transition-colors ${
              filter === 'all' ? 'bg-goldAccent text-darkBg font-bold' : 'glass-card text-luxuryGray'
            }`}
          >
            All Messages ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-[14px] transition-colors ${
              filter === 'unread' ? 'bg-goldAccent text-darkBg font-bold' : 'glass-card text-luxuryGray'
            }`}
          >
            Unread ({messages.filter((m) => m.status === 'unread').length})
          </button>
        </div>
      </div>

      {/* Inbox Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Message List */}
        <div className="lg:col-span-5 glass-card rounded-[24px] border border-white/10 overflow-hidden divide-y divide-white/5 shadow-luxury-shadow">
          {isLoading ? (
            <div className="p-12 text-center text-luxuryMuted font-button text-xs animate-pulse">
              Loading transmissions...
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => {
              const msgId = msg.id || msg._id;
              const isSelected = (selectedMessage?.id || selectedMessage?._id) === msgId;
              return (
                <div
                  key={msgId}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-5 cursor-pointer transition-colors space-y-2 ${
                    isSelected
                      ? 'bg-goldAccent/10 border-l-4 border-goldAccent'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-base text-luxuryWhite font-medium">
                      {msg.name}
                    </span>
                    {msg.status === 'unread' && (
                      <span className="px-2 py-0.5 rounded-full bg-goldAccent text-darkBg text-[10px] font-button font-bold">
                        NEW
                      </span>
                    )}
                  </div>
                  <h4 className="font-button text-xs text-luxuryGray truncate">{msg.subject || 'General Inquiry'}</h4>
                  <p className="font-body text-xs text-luxuryMuted line-clamp-2">{msg.message}</p>
                  <span className="font-button text-[10px] text-luxuryMuted block pt-1">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-luxuryMuted font-button text-xs">
              No transmissions in this folder.
            </div>
          )}
        </div>

        {/* Right Side: Message Detailed View Drawer */}
        <div className="lg:col-span-7 glass-card p-8 rounded-[24px] border border-white/10 space-y-6 shadow-luxury-shadow">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-heading text-2xl text-luxuryWhite">{selectedMessage.subject || 'General Inquiry'}</h3>
                  <div className="flex items-center space-x-2 font-button text-xs text-goldAccent mt-1">
                    <span>From: {selectedMessage.name}</span>
                    <span>({selectedMessage.email})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDelete(selectedMessage.id || selectedMessage._id)}
                    className="p-2.5 rounded-[12px] bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6 rounded-[20px] bg-[#121212] border border-white/5 font-body text-sm text-luxuryWhite leading-relaxed min-h-[160px]">
                {selectedMessage.message}
              </div>

              {/* Reply Badge / Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="px-6 py-3 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider inline-flex items-center space-x-2 shadow-gold-glow"
                >
                  <FiCornerUpLeft className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
                <span className="font-button text-xs text-luxuryMuted">
                  Received: {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'Recent'}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-luxuryMuted font-button text-xs">
              Select a message transmission from the left list to view details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
