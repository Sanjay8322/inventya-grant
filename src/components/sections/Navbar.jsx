import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ hideCta = false }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black shadow-sm' : 'bg-black'
    } border-b border-gray-800 h-20 flex items-center`}>
      <div className="max-w-6xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#00B7F5] rounded-md flex items-center justify-center">
            <span className="text-white font-black text-sm">I</span>
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">inventya</span>
            <span className="hidden md:block text-[10px] text-gray-500 font-medium uppercase tracking-widest">Grant Intelligence</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {!hideCta && (
            <button
              onClick={() => navigate('/assessment')}
              className="bg-[#00B7F5] hover:bg-[#009DDF] text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-200 text-sm uppercase tracking-wide shadow-md shadow-cyan-500/20 hover:-translate-y-0.5 transform"
            >
              Check My Eligibility
            </button>
          )}
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-[#00B7F5] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 right-0 bg-[#111827] border-b border-gray-800 shadow-lg p-6 md:hidden"
          >
            {!hideCta && (
              <button
                onClick={() => { navigate('/assessment'); setMobileOpen(false); }}
                className="w-full bg-[#00B7F5] text-white font-bold py-3 px-6 rounded-lg text-sm uppercase tracking-wide"
              >
                Check My Eligibility
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
