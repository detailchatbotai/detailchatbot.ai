'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { subscriptionAPI, userAPI, handleAPIError } from '../../lib/api'
import { useRouter } from 'next/navigation'

interface Subscription {
  plan_name: string
  is_active: boolean
  started_at: string
  canceled_at?: string
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const data = await subscriptionAPI.getMySubscription()
      setSubscription(data)
      setHasSubscription(true)
    } catch (error) {
      // No subscription found
      setHasSubscription(false)
      setSubscription(null)
    } finally {
      setLoading(false)
    }
  }

  const handleActivateFreePlan = async () => {
    setActionLoading(true)
    try {
      await subscriptionAPI.activateFreePlan()
      toast.success('Free plan activated successfully!')
      await fetchSubscription()
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setActionLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
      return
    }

    setActionLoading(true)
    try {
      await subscriptionAPI.cancelSubscription()
      toast.success('Subscription canceled successfully')
      await fetchSubscription()
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to permanently delete your account? This action cannot be undone and will delete all your data.')) {
      return
    }

    setActionLoading(true)
    try {
      await userAPI.deleteAccount()
      toast.success('Account deleted successfully')
      router.push('/')
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setActionLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPlanDisplayName = (planName: string) => {
    return planName.charAt(0).toUpperCase() + planName.slice(1) + ' Plan'
  }

  if (loading) {
    return (
      <DashboardLayout title="Subscription">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Subscription"
      subtitle="Manage your subscription plan and billing"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Subscription', href: '/subscription' }
      ]}
    >
      <div className="max-w-4xl mx-auto">
        {/* No Subscription State */}
        {!hasSubscription && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-primary-600 text-3xl">💳</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Active Subscription</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Activate your free plan to start using AI chatbot features for your business.
            </p>
            <motion.button
              onClick={handleActivateFreePlan}
              disabled={actionLoading}
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: actionLoading ? 1 : 1.02 }}
              whileTap={{ scale: actionLoading ? 1 : 0.98 }}
            >
              {actionLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Activating...
                </div>
              ) : (
                'Activate Free Plan'
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Active Subscription State */}
        {hasSubscription && subscription && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                  subscription.is_active 
                    ? 'bg-gradient-to-br from-green-500 to-green-600' 
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                  <span className="text-white font-bold text-xl">💳</span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {getPlanDisplayName(subscription.plan_name)}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      subscription.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subscription.is_active ? 'Active' : 'Canceled'}
                    </span>
                  </div>
                </div>
              </div>

              {subscription.is_active && (
                <motion.button
                  onClick={handleCancelSubscription}
                  disabled={actionLoading}
                  className="w-full sm:w-auto px-4 py-2 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
                  whileHover={{ scale: actionLoading ? 1 : 1.02 }}
                  whileTap={{ scale: actionLoading ? 1 : 0.98 }}
                >
                  {actionLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2" />
                      Canceling...
                    </div>
                  ) : (
                    'Cancel Subscription'
                  )}
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Started</h3>
                <p className="text-gray-900">{formatDate(subscription.started_at)}</p>
              </div>
              
              {subscription.canceled_at && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Canceled</h3>
                  <p className="text-gray-900">{formatDate(subscription.canceled_at)}</p>
                </div>
              )}
            </div>

            {!subscription.is_active && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400 text-xl">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Subscription Canceled
                    </h3>
                    <p className="mt-2 text-sm text-yellow-700">
                      Your subscription has been canceled. You will lose access to premium features.
                      You can reactivate by contacting support or upgrading to a paid plan.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Danger Zone */}
        <motion.div
          className="mt-8 bg-red-50 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-red-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
          <p className="text-red-700 mb-4">
            Once you delete your account, there is no going back. This will permanently delete your account and all associated data.
          </p>
          <motion.button
            onClick={handleDeleteAccount}
            disabled={actionLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: actionLoading ? 1 : 1.02 }}
            whileTap={{ scale: actionLoading ? 1 : 0.98 }}
          >
            {actionLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Deleting Account...
              </div>
            ) : (
              'Delete Account Permanently'
            )}
          </motion.button>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}