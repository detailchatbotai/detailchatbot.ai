'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { shopAPI } from '../../lib/api'

export default function DashboardPage() {
  const [hasShop, setHasShop] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkShop = async () => {
      try {
        await shopAPI.getMyShop()
        setHasShop(true)
      } catch (error) {
        setHasShop(false)
      } finally {
        setLoading(false)
      }
    }

    checkShop()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  // If no shop exists, show create shop prompt
  if (hasShop === false) {
    return (
      <DashboardLayout 
        title="Welcome to Chatbot.ai"
        subtitle="Let's get your business set up with AI chatbots"
      >
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">🏪</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Create Your Shop First
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              To start using AI chatbots for your business, you'll need to create your shop profile first. 
              This helps our AI understand your business better.
            </p>
            <Link href="/shops/create">
              <motion.button
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Your Shop
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Dashboard"
      subtitle="Manage your chatbot and business settings"
    >
      <div className="space-y-8">
        {/* Quick Stats/Welcome Section */}
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl shadow-lg p-6 lg:p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
              <p className="text-white/90">
                Your AI chatbot is ready to help your customers. Let's manage your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/docs/getting-started">
                <motion.button
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📚 Getting Started
                </motion.button>
              </Link>
              <Link href="/widget">
                <motion.button
                  className="bg-white text-primary-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🤖 Configure Widget
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Main Navigation Cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Your Business</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Link href="/shops/view">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">🏪</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">My Shop</h2>
            <p className="text-gray-500">View and manage your business information</p>
            <div className="mt-4 text-primary-600 font-semibold text-sm">
              Manage Shop →
            </div>
          </motion.div>
        </Link>
        
        <Link href="/services">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">⚙️</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Services</h2>
            <p className="text-gray-500">Manage your service offerings</p>
            <div className="mt-4 text-primary-600 font-semibold text-sm">
              Manage Services →
            </div>
          </motion.div>
        </Link>
        
        <Link href="/faqs">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">❓</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">FAQs</h2>
            <p className="text-gray-500">Manage frequently asked questions</p>
            <div className="mt-4 text-primary-600 font-semibold text-sm">
              Manage FAQs →
            </div>
          </motion.div>
        </Link>
        
        <Link href="/subscription">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">💳</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Subscription</h2>
            <p className="text-gray-500">Manage your subscription plan</p>
            <div className="mt-4 text-primary-600 font-semibold text-sm">
              Manage Plan →
            </div>
          </motion.div>
        </Link>
        
        <Link href="/widget">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">🤖</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Chat Widget</h2>
            <p className="text-gray-500">Customize and embed your chatbot</p>
            <div className="mt-4 text-primary-600 font-semibold text-sm">
              Manage Widget →
            </div>
          </motion.div>
        </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}