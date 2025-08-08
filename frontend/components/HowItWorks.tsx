'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Setup Your Detailing Shop',
    description: 'Tell us about your detailing services, pricing packages, and location details.',
    icon: '🏢',
    color: 'from-primary-500 to-primary-600'
  },
  {
    step: '02',
    title: 'AI Learns Auto Detailing',
    description: 'Our AI gets trained on auto detailing knowledge and your specific services to answer customer questions expertly.',
    icon: '🤖',
    color: 'from-primary-600 to-accent-500'
  },
  {
    step: '03',
    title: 'Add to Your Website',
    description: 'Customize your chatbot colors and branding, then embed it on your detailing website with one line of code.',
    icon: '🎨',
    color: 'from-accent-500 to-accent-600'
  },
  {
    step: '04',
    title: 'Book More Appointments',
    description: 'Your AI assistant handles inquiries, quotes prices, and schedules detailing appointments while you focus on cars.',
    icon: '📈',
    color: 'from-accent-600 to-primary-700'
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold">⚡ Quick Setup Process</span>
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Get Your DetailBot Live in
            <span className="block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Under 5 Minutes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No technical expertise required. Follow these simple steps to start 
            converting website visitors into detailing appointments.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full hover:bg-white/20 transition-all duration-300">
                  {/* Step number badge */}
                  <div className={`absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.step}
                  </div>
                  
                  <div className="pt-6">
                    <div className="text-5xl mb-6 text-center">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Animated arrow for desktop */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-4 z-20 transform -translate-y-1/2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-1">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg w-full hover:bg-slate-800 transition-colors duration-300">
              🚀 Get Your DetailBot Now
            </button>
          </div>
          <p className="text-gray-300 mt-4">Beta Access • Free to try • Perfect for detailing shops</p>
        </motion.div>
      </div>
    </section>
  )
}