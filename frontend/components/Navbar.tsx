'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setMobileMenuOpen(false) // Close mobile menu when clicking a link
  }

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/detailchatbot.png" 
                  alt="DetailChatbot.ai" 
                  width={32}
                  height={32}
                  className="w-8 h-8 mr-2 rounded-full"
                  priority
                />
                <span className={`text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent ${
                  scrolled ? '' : 'text-white'
                }`}>
                  DetailChatbot.ai
                </span>
              </motion.div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['features', 'how-it-works', 'testimonials'].map((section, index) => (
                <motion.div key={section} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Link 
                    href={`#${section}`} 
                    className={`font-medium transition-all duration-300 hover:scale-105 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-primary-600' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {section === 'how-it-works' ? 'How It Works' : section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Desktop Auth Buttons */}
            <motion.div 
              className="hidden md:flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/auth/login">
                <motion.button
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
              
              <Link href="/auth/register">
                <motion.button
                  className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`px-4 pb-4 space-y-3 ${
                scrolled ? 'bg-white/95' : 'bg-slate-900/95'
              } backdrop-blur-lg border-t border-white/10`}>
                {['features', 'how-it-works', 'testimonials'].map((section) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link 
                      href={`#${section}`}
                      onClick={handleLinkClick}
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                        scrolled 
                          ? 'text-gray-700 hover:bg-primary-50 hover:text-primary-600' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {section === 'how-it-works' ? 'How It Works' : section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-3">
                  <Link href="/auth/login" onClick={handleLinkClick}>
                    <motion.button
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                        scrolled
                          ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                          : 'text-white bg-white/10 hover:bg-white/20'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  
                  <Link href="/auth/register" onClick={handleLinkClick}>
                    <motion.button
                      className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}