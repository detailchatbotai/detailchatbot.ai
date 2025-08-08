'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { serviceAPI, handleAPIError } from '../../lib/api'

interface Service {
  id: string
  shop_id: string
  name: string
  description?: string
  price: number
  duration_minutes: number
  created_at: string
  updated_at: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await serviceAPI.getServices()
      setServices(data)
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteService = async (serviceId: string, serviceName: string) => {
    if (!confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      return
    }

    setDeleting(serviceId)
    try {
      await serviceAPI.deleteService(serviceId)
      toast.success('Service deleted successfully')
      setServices(services.filter(s => s.id !== serviceId))
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setDeleting(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
  }

  if (loading) {
    return (
      <DashboardLayout title="Services">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Services"
      subtitle="Manage your service offerings"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/services' }
      ]}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {services.length} Service{services.length !== 1 ? 's' : ''}
            </h3>
            <p className="text-gray-600">Manage your business services and pricing</p>
          </div>
          <Link href="/services/create">
            <motion.button
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Service
            </motion.button>
          </Link>
        </div>

        {/* Services List */}
        {services.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-primary-600 text-3xl">⚙️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Services Yet</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start by adding your first service offering. This helps customers understand what you provide and enables AI chatbot interactions.
            </p>
            <Link href="/services/create">
              <motion.button
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Your First Service
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">⚙️</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/services/edit/${service.id}`}>
                      <motion.button
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✏️
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => handleDeleteService(service.id, service.name)}
                      disabled={deleting === service.id}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      whileHover={{ scale: deleting === service.id ? 1 : 1.1 }}
                      whileTap={{ scale: deleting === service.id ? 1 : 0.9 }}
                    >
                      {deleting === service.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                      ) : (
                        '🗑️'
                      )}
                    </motion.button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                
                {service.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-green-600 font-semibold">
                    <span className="text-lg mr-1">💰</span>
                    {formatPrice(service.price)}
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span className="text-lg mr-1">⏱️</span>
                    {formatDuration(service.duration_minutes)}
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