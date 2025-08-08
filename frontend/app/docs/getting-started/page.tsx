'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardLayout } from '../../../components/layout/DashboardLayout'

export default function GettingStartedDocsPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up for Chatbot.ai and verify your email",
      icon: "👤",
      color: "from-blue-500 to-indigo-600",
      content: [
        "Sign up with your business email address",
        "Check your email and click the verification link",
        "Complete your profile setup",
        "Choose your initial subscription plan"
      ],
      tips: [
        "Use your business email for better organization",
        "Check spam folder if verification email doesn't arrive",
        "Free plan includes basic features to get started"
      ]
    },
    {
      title: "Set Up Your Shop",
      description: "Add your business information and details",
      icon: "🏪",
      color: "from-green-500 to-emerald-600",
      content: [
        "Navigate to 'My Shop' from the dashboard",
        "Fill in your business name and description",
        "Add contact information (phone, email, website)",
        "Save your shop profile"
      ],
      tips: [
        "Use a clear, descriptive business name",
        "Include keywords your customers might search for",
        "Keep your description concise but informative"
      ]
    },
    {
      title: "Add Your Services",
      description: "Define what services your business offers",
      icon: "⚙️",
      color: "from-purple-500 to-pink-600",
      content: [
        "Go to 'Services' from the dashboard",
        "Click 'Add New Service' to create your first service",
        "Include service name, description, price, and duration",
        "Add multiple services as needed"
      ],
      tips: [
        "Be specific about what each service includes",
        "Use clear pricing to avoid customer confusion",
        "Update service descriptions regularly"
      ]
    },
    {
      title: "Create FAQs",
      description: "Prepare common questions and answers",
      icon: "❓",
      color: "from-yellow-500 to-orange-600",
      content: [
        "Access 'FAQs' from your dashboard",
        "Add frequently asked questions about your business",
        "Provide clear, helpful answers",
        "Cover topics like pricing, booking, policies, and procedures"
      ],
      tips: [
        "Think from your customer's perspective",
        "Include questions about booking and cancellation policies",
        "Update FAQs based on actual customer inquiries"
      ]
    },
    {
      title: "Configure Your Chat Widget",
      description: "Customize your AI chatbot appearance and behavior",
      icon: "🤖",
      color: "from-cyan-500 to-blue-600",
      content: [
        "Navigate to 'Chat Widget' in your dashboard",
        "Choose widget position (bottom-left or bottom-right)",
        "Select theme (light or dark) and primary color",
        "Customize greeting message and placeholder text",
        "Add business context to help the AI understand your services"
      ],
      tips: [
        "Choose colors that match your brand",
        "Write welcoming, professional greeting messages",
        "Include specific details about your business in the context"
      ]
    },
    {
      title: "Install on Your Website",
      description: "Add the widget to your website",
      icon: "🌐",
      color: "from-indigo-500 to-purple-600",
      content: [
        "Copy the embed code from your widget configuration",
        "Paste the code before the closing </body> tag on your website",
        "Test the widget on your live site",
        "Verify it appears correctly on mobile devices"
      ],
      tips: [
        "Test on different browsers and devices",
        "Check that the widget doesn't interfere with existing site functionality",
        "Monitor initial conversations to fine-tune responses"
      ]
    }
  ]

  return (
    <DashboardLayout 
      title="Getting Started Guide"
      subtitle="Complete step-by-step guide to set up your AI chatbot"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Getting Started', href: '/docs/getting-started' }
      ]}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">Setup Progress</h3>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                      currentStep === index
                        ? 'bg-primary-100 border-2 border-primary-300'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{step.icon}</span>
                      <div>
                        <div className={`text-sm font-semibold ${
                          currentStep === index ? 'text-primary-700' : 'text-gray-900'
                        }`}>
                          Step {index + 1}
                        </div>
                        <div className={`text-xs ${
                          currentStep === index ? 'text-primary-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Current Step Detail */}
            <motion.div
              key={currentStep}
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${steps[currentStep].color} rounded-xl flex items-center justify-center mr-4`}>
                    <span className="text-white font-bold text-xl">{steps[currentStep].icon}</span>
                  </div>
                  <div>
                    <div className="text-sm text-primary-600 font-semibold">
                      Step {currentStep + 1} of {steps.length}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
                  </div>
                </div>
                <p className="text-lg text-gray-600">{steps[currentStep].description}</p>
              </div>

              {/* Step Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                      <span className="text-blue-600 text-xs">📋</span>
                    </span>
                    What to do
                  </h3>
                  <ul className="space-y-3">
                    {steps[currentStep].content.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center mr-2">
                      <span className="text-yellow-600 text-xs">💡</span>
                    </span>
                    Pro Tips
                  </h3>
                  <ul className="space-y-3">
                    {steps[currentStep].tips.map((tip, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <span className="text-yellow-500 mr-3 mt-1">★</span>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <motion.button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: currentStep === 0 ? 1 : 1.02 }}
                  whileTap={{ scale: currentStep === 0 ? 1 : 0.98 }}
                >
                  Previous Step
                </motion.button>

                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === steps.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700'
                  }`}
                  whileHover={{ scale: currentStep === steps.length - 1 ? 1 : 1.02 }}
                  whileTap={{ scale: currentStep === steps.length - 1 ? 1 : 0.98 }}
                >
                  Next Step
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Access</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/shops/view">
                  <motion.div
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-green-600">🏪</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">My Shop</h4>
                    <p className="text-sm text-gray-600">Manage business info</p>
                  </motion.div>
                </Link>

                <Link href="/services">
                  <motion.div
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-purple-600">⚙️</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Services</h4>
                    <p className="text-sm text-gray-600">Add your offerings</p>
                  </motion.div>
                </Link>

                <Link href="/faqs">
                  <motion.div
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-yellow-600">❓</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">FAQs</h4>
                    <p className="text-sm text-gray-600">Common questions</p>
                  </motion.div>
                </Link>

                <Link href="/widget">
                  <motion.div
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-cyan-600">🤖</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Chat Widget</h4>
                    <p className="text-sm text-gray-600">Configure chatbot</p>
                  </motion.div>
                </Link>

                <Link href="/docs/widget-integration">
                  <motion.div
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-indigo-600">🌐</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Integration</h4>
                    <p className="text-sm text-gray-600">Website setup guide</p>
                  </motion.div>
                </Link>

                <Link href="/subscription">
                  <motion.div
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-blue-600">💳</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Subscription</h4>
                    <p className="text-sm text-gray-600">Manage your plan</p>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Support Section */}
            <motion.div
              className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl shadow-lg p-6 lg:p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🆘</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                <p className="text-white/90 mb-6">
                  Our team is here to help you get the most out of your chatbot setup
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Support
                  </motion.button>
                  <motion.button
                    className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Documentation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}