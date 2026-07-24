'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle, FiLoader } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';
import { messagesService } from '@/services/api';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await messagesService.send(data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-button text-xs font-semibold text-goldAccent uppercase tracking-widest px-4 py-1.5 rounded-full glass-card border border-goldAccent/30"
          >
            GET IN TOUCH
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl text-luxuryWhite font-light"
          >
            Start a <span className="gold-gradient-text">Conversation</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-goldAccent to-emeraldAccent rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-6 shadow-luxury-shadow">
              <h3 className="font-heading text-2xl text-luxuryWhite font-medium">
                Direct Contact Information
              </h3>
              <p className="font-body text-luxuryGray text-sm font-light leading-relaxed">
                Whether you have an inquiry regarding data analytics, web engineering, or potential roles, feel free to reach out.
              </p>

              <div className="space-y-6 pt-4">
                {/* Phone */}
                <div className="flex items-center space-x-4 p-4 rounded-[20px] bg-[#121212] border border-white/5 hover:border-goldAccent/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-goldAccent/10 text-goldAccent flex items-center justify-center shrink-0">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-button text-[10px] text-luxuryMuted uppercase tracking-wider">Phone / WhatsApp</span>
                    <a href="tel:9321445712" className="font-heading text-lg text-luxuryWhite hover:text-goldAccent transition-colors">
                      +91 93214 45712
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4 p-4 rounded-[20px] bg-[#121212] border border-white/5 hover:border-emeraldAccent/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-emeraldAccent/10 text-emeraldAccent flex items-center justify-center shrink-0">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-button text-[10px] text-luxuryMuted uppercase tracking-wider">Email Address</span>
                    <a href="mailto:vanshchauhand@gmail.com" className="font-heading text-base md:text-lg text-luxuryWhite hover:text-emeraldAccent transition-colors break-all">
                      vanshchauhand@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4 p-4 rounded-[20px] bg-[#121212] border border-white/5 hover:border-goldAccent/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-goldAccent/10 text-goldAccent flex items-center justify-center shrink-0">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-button text-[10px] text-luxuryMuted uppercase tracking-wider">Current Location</span>
                    <span className="font-heading text-lg text-luxuryWhite">
                      Mumbai, Maharashtra, India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 glass-card p-8 md:p-10 rounded-[24px] border border-white/10 shadow-luxury-shadow"
          >
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emeraldAccent/20 text-emeraldAccent flex items-center justify-center mx-auto shadow-emerald-glow">
                  <FiCheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-3xl text-luxuryWhite">Message Dispatched!</h3>
                <p className="font-body text-luxuryGray text-sm max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been routed to Vansh Chauhan. Expect a reply shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block font-button text-xs uppercase tracking-wider text-luxuryGray">
                      Your Name <span className="text-goldAccent">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alexander Vance"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-5 py-4 rounded-[16px] bg-[#121212] border border-white/10 text-luxuryWhite placeholder-luxuryMuted focus:outline-none focus:border-goldAccent transition-colors text-sm font-body"
                    />
                    {errors.name && <span className="text-xs text-red-400 font-button">{errors.name.message}</span>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block font-button text-xs uppercase tracking-wider text-luxuryGray">
                      Your Email <span className="text-goldAccent">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alexander@company.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
                      })}
                      className="w-full px-5 py-4 rounded-[16px] bg-[#121212] border border-white/10 text-luxuryWhite placeholder-luxuryMuted focus:outline-none focus:border-goldAccent transition-colors text-sm font-body"
                    />
                    {errors.email && <span className="text-xs text-red-400 font-button">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block font-button text-xs uppercase tracking-wider text-luxuryGray">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry, Data Analytics, Hiring..."
                    {...register('subject')}
                    className="w-full px-5 py-4 rounded-[16px] bg-[#121212] border border-white/10 text-luxuryWhite placeholder-luxuryMuted focus:outline-none focus:border-goldAccent transition-colors text-sm font-body"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block font-button text-xs uppercase tracking-wider text-luxuryGray">
                    Message <span className="text-goldAccent">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="How can I assist your project or organization?"
                    {...register('message', { required: 'Message body is required' })}
                    className="w-full px-5 py-4 rounded-[16px] bg-[#121212] border border-white/10 text-luxuryWhite placeholder-luxuryMuted focus:outline-none focus:border-goldAccent transition-colors text-sm font-body resize-none"
                  />
                  {errors.message && <span className="text-xs text-red-400 font-button">{errors.message.message}</span>}
                </div>

                {/* Submit CTA */}
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-[24px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <FiLoader className="w-5 h-5 animate-spin" />
                      <span>Transmitting...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <FiSend className="w-4 h-4" />
                      <span>Send Transmission</span>
                    </span>
                  )}
                </MagneticButton>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
