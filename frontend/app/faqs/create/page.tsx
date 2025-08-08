'use client'

import { DashboardLayout } from '../../../components/layout/DashboardLayout'
import { FAQForm } from '../../../components/forms/FAQForm'

export default function CreateFAQPage() {
  return (
    <DashboardLayout 
      title="Create FAQ"
      subtitle="Add a new frequently asked question"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Create', href: '/faqs/create' }
      ]}
    >
      <FAQForm mode="create" />
    </DashboardLayout>
  )
}