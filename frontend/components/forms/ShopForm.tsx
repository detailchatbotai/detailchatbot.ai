'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { shopAPI, handleAPIError } from '../../lib/api'

interface ShopData {
  business_name: string
  description?: string
  phone_number?: string
  email?: string
  website?: string
}

interface ShopFormProps {
  mode: 'create' | 'edit'
  initialData?: ShopData
  onSuccess?: () => void
}

export function ShopForm({ mode, initialData, onSuccess }: ShopFormProps) {
  const [formData, setFormData] = useState<ShopData>({
    business_name: '',
    description: '',
    phone_number: '',
    email: '',
    website: '',
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
    if (!formData.business_name.trim()) {
      toast.error('Business name is required')
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
        business_name: formData.business_name.trim(),
        description: formData.description?.trim() || undefined,
        phone_number: formData.phone_number?.trim() || undefined,
        email: formData.email?.trim() || undefined,
        website: formData.website?.trim() || undefined
      }

      if (isEdit) {
        await shopAPI.updateShop(submitData)
        toast.success('Shop updated successfully!')
      } else {
        await shopAPI.createShop(submitData)
        toast.success('Shop created successfully!')
      }

      onSuccess?.()
      router.push('/shops/view')
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
          {isEdit ? 'Edit Your Shop' : 'Create Your Shop'}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {isEdit 
            ? 'Update your shop information and settings'
            : 'Tell us about your business to get started with AI chatbots'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Business Name */}
          <div className="md:col-span-2">
            <label htmlFor="business_name" className="block text-sm font-semibold text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="e.g., Elite Auto Detailing"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Business Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="contact@yourshop.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Website */}
          <div className="md:col-span-2">
            <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
              Website (optional)
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website || ''}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="https://yourshop.com"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Business Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="Describe your business services and what makes you special..."
            />
          </div>
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
              isEdit ? 'Update Shop' : 'Create Shop'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}