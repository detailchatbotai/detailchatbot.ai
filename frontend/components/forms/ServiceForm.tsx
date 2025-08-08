'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { serviceAPI, handleAPIError } from '../../lib/api'

interface ServiceData {
  name: string
  description?: string
  price: number
  duration_minutes: number
}

interface ServiceFormProps {
  mode: 'create' | 'edit'
  serviceId?: string
  initialData?: ServiceData
  onSuccess?: () => void
}

export function ServiceForm({ mode, serviceId, initialData, onSuccess }: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceData>({
    name: '',
    description: '',
    price: 0,
    duration_minutes: 60,
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
      [name]: name === 'price' || name === 'duration_minutes' ? parseFloat(value) || 0 : value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Service name is required')
      return false
    }
    if (formData.price <= 0) {
      toast.error('Price must be greater than 0')
      return false
    }
    if (formData.duration_minutes <= 0) {
      toast.error('Duration must be greater than 0 minutes')
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
        ...formData,
        description: formData.description?.trim() || undefined
      }

      if (isEdit && serviceId) {
        await serviceAPI.updateService(serviceId, submitData)
        toast.success('Service updated successfully!')
      } else {
        await serviceAPI.createService(submitData)
        toast.success('Service created successfully!')
      }

      onSuccess?.()
      router.push('/services')
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
          {isEdit ? 'Edit Service' : 'Create New Service'}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {isEdit 
            ? 'Update your service information and pricing'
            : 'Add a new service offering for your business'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Service Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Service Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="e.g., Full Car Detail"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="99.00"
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration_minutes" className="block text-sm font-semibold text-gray-700 mb-2">
              Duration (minutes) *
            </label>
            <input
              type="number"
              id="duration_minutes"
              name="duration_minutes"
              value={formData.duration_minutes}
              onChange={handleInputChange}
              required
              min="1"
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="60"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Service Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-50"
              placeholder="Describe what this service includes and any special details..."
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
              isEdit ? 'Update Service' : 'Create Service'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}