'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import Link from 'next/link'

export function Hero() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-accent-500 to-primary-700 overflow-hidden">
      {/* Optimized background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-2xl will-change-transform"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300/10 rounded-full blur-2xl will-change-transform"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-success-300/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white text-sm font-medium">🚀 Beta Launch - DetailChatbot.ai</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Boost Your
              <span className="block bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Auto Detailing
              </span>
              Business with AI
            </h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Convert more leads into bookings with an intelligent AI chatbot designed 
              specifically for auto detailing shops. Handle inquiries 24/7 and never miss a customer again.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/auth/register">
                <button 
                  className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  Join Beta Now →
                </button>
              </Link>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center lg:justify-start gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Beta</div>
                <div className="text-white/70 text-sm">Early Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-white/70 text-sm">Auto Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-white/70 text-sm">Auto Detailing</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="text-sm text-gray-500 ml-auto">Chatbot Live Demo</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary-500 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                      Hi! I need my car detailed this weekend. What are your prices?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                      Hi! I'd be happy to help! We offer several detailing packages:
                      <br/>• Basic: $50
                      <br/>• Premium: $80
                      <br/>• Full Service: $120
                      <br/><br/>What type of vehicle do you have?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary-500 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                      I have an SUV. Can you do it Saturday?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-md max-w-xs flex items-center gap-2">
                      <div className="animate-pulse flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">AI is typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}