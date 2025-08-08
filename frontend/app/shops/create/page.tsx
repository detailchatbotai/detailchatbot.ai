'use client'

import { DashboardLayout } from '../../../components/layout/DashboardLayout'
import { ShopForm } from '../../../components/forms/ShopForm'

export default function CreateShopPage() {
  return (
    <DashboardLayout 
      title="Create Shop"
      subtitle="Set up your business profile to start using AI chatbots"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Create Shop', href: '/shops/create' }
      ]}
    >
      <ShopForm mode="create" />
    </DashboardLayout>
  )
}