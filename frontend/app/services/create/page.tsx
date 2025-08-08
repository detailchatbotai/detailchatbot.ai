'use client'

import { DashboardLayout } from '../../../components/layout/DashboardLayout'
import { ServiceForm } from '../../../components/forms/ServiceForm'

export default function CreateServicePage() {
  return (
    <DashboardLayout 
      title="Create Service"
      subtitle="Add a new service offering for your business"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/services' },
        { label: 'Create', href: '/services/create' }
      ]}
    >
      <ServiceForm mode="create" />
    </DashboardLayout>
  )
}