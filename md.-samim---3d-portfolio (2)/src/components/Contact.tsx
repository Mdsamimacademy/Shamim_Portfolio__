import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Profile } from '../types';
import { saveContactMessage } from '../lib/db';

interface ContactProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please key in all required fields!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const messageId = `msg_${Date.now()}`;
      await saveContactMessage({
        id: messageId,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString()
      });

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Automatically vanish success banner after 4 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 4000);

    } catch (e) {
      console.error(e);
      setError("Failed to record message. Please verify database rules or connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-indigo-50/10 border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-600 uppercase mb-3 block animate-pulse"
          >
            [ GET iN TOUCH ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none"
          >
            Contact <span className="text-outline">Me</span>
          </motion.h3>
        </div>

        {/* Bento Side-by-side elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Contact Details Panel Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6 text-left"
          >
            <div className="bg-white/70 border border-slate-200 p-6 rounded-2xl backdrop-blur-md space-y-6 shadow-sm">
              <h4 className="text-md font-display font-black text-slate-900 uppercase tracking-tight mb-2">Reach Out Directly</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                Feel free to drop any inquiries or requests for machine learning setups, technical writing columns, or full-stack integrations.
              </p>

              {/* Links and addresses */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-100 mt-1">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-mono font-bold tracking-wider uppercase">EMAIL OVERVIEW</span>
                    <a href={`mailto:${profile.email || "tamjidulislamsamim@gmail.com"}`} className="text-slate-700 text-xs sm:text-sm font-bold font-mono hover:text-cyan-600 transition-colors break-all">
                      {profile.email || "tamjidulislamsamim@gmail.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-100 mt-1">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-mono font-bold tracking-wider uppercase">PHONE TELEPHONY</span>
                    <a href={`tel:${profile.phone || "+8801743597989"}`} className="text-slate-700 text-xs sm:text-sm font-bold font-mono hover:text-cyan-600 transition-colors">
                      {profile.phone || "+8801743597989"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-100 mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-mono font-bold tracking-wider uppercase">LOCATION STATION</span>
                    <span className="text-slate-700 text-xs sm:text-sm font-bold">
                      Dhaka, Bangladesh
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Anchors inside widget */}
              <div className="flex gap-3 pt-6 border-t border-slate-100 text-slate-400">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2.5 rounded-xl bg-slate-100 border border-slate-205 border-slate-200 text-slate-500 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors cursor-pointer"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2.5 rounded-xl bg-slate-100 border border-slate-205 border-slate-200 text-slate-500 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors cursor-pointer"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Form Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white/70 border border-slate-200 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-sm"
          >
            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5 font-sans">
                  <label htmlFor="contact-name" className="text-[10px] font-mono text-slate-450 text-slate-500 uppercase tracking-widest block font-bold mb-1.5">Visitor Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="ENTER YOUR NAME"
                    className="w-full bg-white border border-slate-200 hover:border-slate-350 hover:border-slate-300 focus:border-cyan-500 focus:outline-none rounded-xl py-3 px-4 text-xs font-sans text-slate-800 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 font-sans">
                  <label htmlFor="contact-email" className="text-[10px] font-mono text-slate-450 text-slate-500 uppercase tracking-widest block font-bold mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="NAME@EXAMPLE.COM"
                    className="w-full bg-white border border-slate-200 hover:border-slate-350 hover:border-slate-300 focus:border-cyan-500 focus:outline-none rounded-xl py-3 px-4 text-xs font-sans text-slate-800 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5 font-sans">
                <label htmlFor="contact-subject" className="text-[10px] font-mono text-slate-455 text-slate-500 uppercase tracking-widest block font-bold mb-1.5">Subject Matter *</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="INQUIRY OR PROJECT DISCUSSION"
                  className="w-full bg-white border border-slate-200 hover:border-slate-350 hover:border-slate-300 focus:border-cyan-500 focus:outline-none rounded-xl py-3 px-4 text-xs font-sans text-slate-800 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5 font-sans">
                <label htmlFor="contact-message" className="text-[10px] font-mono text-slate-455 text-slate-500 uppercase tracking-widest block font-bold mb-1.5">Message Body *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="KEY IN YOUR MESSAGE DETAILS..."
                  className="w-full bg-white border border-slate-200 hover:border-slate-350 hover:border-slate-300 focus:border-cyan-500 focus:outline-none rounded-xl py-3 px-4 text-xs font-sans text-slate-800 transition-colors resize-none"
                />
              </div>

              <AnimatePresence>
                {/* Status messages banners */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-200 text-cyan-705 text-cyan-700 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Your message was sent successfully! Samim will address it soon.</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-250 border-rose-200 text-rose-700 text-xs font-semibold"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit trigger button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={loading}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-[11px] uppercase tracking-wider rounded-xl active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-lg flex items-center gap-2"
                >
                  {loading ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5 font-bold" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
