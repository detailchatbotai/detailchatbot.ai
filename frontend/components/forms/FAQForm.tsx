'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { faqAPI, handleAPIError } from '../../lib/api'

interface FAQData {
  question: string
  answer: string
}

interface FAQFormProps {
  mode: 'create' | 'edit'
  faqId?: string
  initialData?: FAQData
  onSuccess?: () => void
}

export function FAQForm({ mode, faqId, initialData, onSuccess }: FAQFormProps) {
  const [formData, setFormData] = useState<FAQData>({
    question: '',
    answer: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isEdit = mode === 'edit'

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.question.trim()) {
      toast.error('Question is required')
      return false
    }
    if (formData.question.length > 500) {
      toast.error('Question must be 500 characters or less')
      return false
    }
    if (!formData.answer.trim()) {
      toast.error('Answer is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      const submitData = {
        question: formData.question.trim(),
        answer: formData.answer.trim()
      }

      if (isEdit && faqId) {
        await faqAPI.updateFAQ(faqId, submitData)
        toast.success('FAQ updated successfully!')
      } else {
        await faqAPI.createFAQ(submitData)
        toast.success('FAQ created successfully!')
      }

      onSuccess?.()
      router.push('/faqs')
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {isEdit ? 'Edit FAQ' : 'Create New FAQ'}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {isEdit 
            ? 'Update your frequently asked question and answer'
            : 'Add a new FAQ to help customers get quick answers'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Question */}
        <div>
          <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-2">
            Question *
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            required
            maxLength={500}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
            placeholder="e.g., What are your business hours?"
          />
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.question.length}/500 characters
          </div>
        </div>

        {/* Answer */}
        <div>
          <label htmlFor="answer" className="block text-sm font-semibold text-gray-700 mb-2">
            Answer *
          </label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            required
            disabled={loading}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
            placeholder="Provide a detailed answer to help your customers..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <motion.button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                {isEdit ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              isEdit ? 'Update FAQ' : 'Create FAQ'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}