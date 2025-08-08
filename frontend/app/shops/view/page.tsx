'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../../components/layout/DashboardLayout'
import { shopAPI, handleAPIError } from '../../../lib/api'

export default function ViewShopPage() {
  const [shopData, setShopData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shop = await shopAPI.getMyShop()
        setShopData(shop)
      } catch (error) {
        console.error('Shop fetch error:', error)
        // If shop doesn't exist, redirect to create
        router.push('/shops/create')
      } finally {
        setLoading(false)
      }
    }

    fetchShop()
  }, [router])

  const handleDeleteShop = async () => {
    if (!confirm('Are you sure you want to delete your shop? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      await shopAPI.deleteShop()
      toast.success('Shop deleted successfully')
      router.push('/shops/create')
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="My Shop">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!shopData) {
    return (
      <DashboardLayout title="No Shop Found">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-gray-400 text-2xl">🏪</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Shop Created Yet</h3>
          <p className="text-gray-600 mb-6">Create your shop to start using AI chatbots for your business.</p>
          <Link href="/shops/create">
            <motion.button
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Your Shop
            </motion.button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="My Shop"
      subtitle="Manage your business information and settings"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'My Shop', href: '/shops/view' }
      ]}
    >
      <div className="max-w-4xl mx-auto">
        {/* Shop Info Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Shop Header - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">🏪</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{shopData.business_name}</h2>
                <p className="text-gray-500 text-sm">Shop ID: {shopData.id}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/shops/edit" className="w-full sm:w-auto">
                <motion.button
                  className="w-full sm:w-auto px-4 py-2 border border-primary-300 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition-colors text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Edit Shop
                </motion.button>
              </Link>
              
              <motion.button
                onClick={handleDeleteShop}
                disabled={deleting}
                className="w-full sm:w-auto px-4 py-2 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
                whileHover={{ scale: deleting ? 1 : 1.02 }}
                whileTap={{ scale: deleting ? 1 : 0.98 }}
              >
                {deleting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2" />
                    Deleting...
                  </div>
                ) : (
                  'Delete Shop'
                )}
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-900">{shopData.description || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact Email</h3>
              <p className="text-gray-900">{shopData.email || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Phone</h3>
              <p className="text-gray-900">{shopData.phone_number || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Website</h3>
              <p className="text-gray-900">
                {shopData.website ? (
                  <a 
                    href={shopData.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    {shopData.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard">
              <motion.div
                className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-primary-600">📊</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Dashboard</h4>
                <p className="text-sm text-gray-600">View your overview</p>
              </motion.div>
            </Link>
            
            <motion.div
              className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-400">🤖</span>
              </div>
              <h4 className="font-semibold text-gray-500 mb-1">AI Chatbot</h4>
              <p className="text-sm text-gray-400">Coming soon</p>
            </motion.div>
            
            <motion.div
              className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-400">⚙️</span>
              </div>
              <h4 className="font-semibold text-gray-500 mb-1">Settings</h4>
              <p className="text-sm text-gray-400">Coming soon</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}