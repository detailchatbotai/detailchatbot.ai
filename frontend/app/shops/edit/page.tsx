'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../../components/layout/DashboardLayout'
import { ShopForm } from '../../../components/forms/ShopForm'
import { shopAPI, handleAPIError } from '../../../lib/api'

export default function EditShopPage() {
  const [shopData, setShopData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shop = await shopAPI.getMyShop()
        setShopData(shop)
      } catch (error) {
        toast.error(handleAPIError(error))
        router.push('/shops/create')
      } finally {
        setLoading(false)
      }
    }

    fetchShop()
  }, [router])

  if (loading) {
    return (
      <DashboardLayout title="Edit Shop">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!shopData) {
    return (
      <DashboardLayout title="Shop Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600">Shop not found. Please create a shop first.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Edit Shop"
      subtitle="Update your business information and settings"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'My Shop', href: '/shops/view' },
        { label: 'Edit', href: '/shops/edit' }
      ]}
    >
      <ShopForm 
        mode="edit" 
        initialData={shopData}
      />
    </DashboardLayout>
  )
}