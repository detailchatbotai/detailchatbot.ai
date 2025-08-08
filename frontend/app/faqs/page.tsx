'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { faqAPI, handleAPIError } from '../../lib/api'

interface FAQ {
  id: string
  shop_id: string
  question: string
  answer: string
  created_at: string
  updated_at: string
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const data = await faqAPI.getFAQs()
      setFaqs(data)
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFAQ = async (faqId: string, question: string) => {
    const truncatedQuestion = question.length > 50 ? question.slice(0, 50) + '...' : question
    if (!confirm(`Are you sure you want to delete "${truncatedQuestion}"? This action cannot be undone.`)) {
      return
    }

    setDeleting(faqId)
    try {
      await faqAPI.deleteFAQ(faqId)
      toast.success('FAQ deleted successfully')
      setFaqs(faqs.filter(f => f.id !== faqId))
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setDeleting(null)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  if (loading) {
    return (
      <DashboardLayout title="FAQs">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="FAQs"
      subtitle="Manage your frequently asked questions"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'FAQs', href: '/faqs' }
      ]}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}
            </h3>
            <p className="text-gray-600">Help customers get quick answers to common questions</p>
          </div>
          <Link href="/faqs/create">
            <motion.button
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New FAQ
            </motion.button>
          </Link>
        </div>

        {/* FAQs List */}
        {faqs.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-primary-600 text-3xl">❓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No FAQs Yet</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create your first FAQ to help customers get instant answers to common questions about your business.
            </p>
            <Link href="/faqs/create">
              <motion.button
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Your First FAQ
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">❓</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {truncateText(faq.answer, 200)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/faqs/edit/${faq.id}`}>
                        <motion.button
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ✏️
                        </motion.button>
                      </Link>
                      <motion.button
                        onClick={() => handleDeleteFAQ(faq.id, faq.question)}
                        disabled={deleting === faq.id}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        whileHover={{ scale: deleting === faq.id ? 1 : 1.1 }}
                        whileTap={{ scale: deleting === faq.id ? 1 : 0.9 }}
                      >
                        {deleting === faq.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                        ) : (
                          '🗑️'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}