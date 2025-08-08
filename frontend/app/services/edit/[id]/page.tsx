'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../../../components/layout/DashboardLayout'
import { ServiceForm } from '../../../../components/forms/ServiceForm'
import { serviceAPI, handleAPIError } from '../../../../lib/api'

interface ServiceData {
  name: string
  description?: string
  price: number
  duration_minutes: number
}

export default function EditServicePage() {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Get all services and find the one we need
        const services = await serviceAPI.getServices()
        const service = services.find(s => s.id === serviceId)
        
        if (!service) {
          toast.error('Service not found')
          router.push('/services')
          return
        }

        setServiceData({
          name: service.name,
          description: service.description,
          price: service.price,
          duration_minutes: service.duration_minutes,
        })
      } catch (error) {
        toast.error(handleAPIError(error))
        router.push('/services')
      } finally {
        setLoading(false)
      }
    }

    if (serviceId) {
      fetchService()
    }
  }, [serviceId, router])

  if (loading) {
    return (
      <DashboardLayout title="Edit Service">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!serviceData) {
    return (
      <DashboardLayout title="Service Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600">Service not found. Please create a service first.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Edit Service"
      subtitle="Update your service information and pricing"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/services' },
        { label: 'Edit', href: `/services/edit/${serviceId}` }
      ]}
    >
      <ServiceForm 
        mode="edit" 
        serviceId={serviceId}
        initialData={serviceData}
      />
    </DashboardLayout>
  )
}