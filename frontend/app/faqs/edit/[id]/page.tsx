'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../../../components/layout/DashboardLayout'
import { FAQForm } from '../../../../components/forms/FAQForm'
import { faqAPI, handleAPIError } from '../../../../lib/api'

interface FAQData {
  question: string
  answer: string
}

export default function EditFAQPage() {
  const [faqData, setFaqData] = useState<FAQData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const faqId = params.id as string

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        // Get all FAQs and find the one we need
        const faqs = await faqAPI.getFAQs()
        const faq = faqs.find(f => f.id === faqId)
        
        if (!faq) {
          toast.error('FAQ not found')
          router.push('/faqs')
          return
        }

        setFaqData({
          question: faq.question,
          answer: faq.answer,
        })
      } catch (error) {
        toast.error(handleAPIError(error))
        router.push('/faqs')
      } finally {
        setLoading(false)
      }
    }

    if (faqId) {
      fetchFAQ()
    }
  }, [faqId, router])

  if (loading) {
    return (
      <DashboardLayout title="Edit FAQ">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!faqData) {
    return (
      <DashboardLayout title="FAQ Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600">FAQ not found. Please create a new FAQ.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Edit FAQ"
      subtitle="Update your frequently asked question"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Edit', href: `/faqs/edit/${faqId}` }
      ]}
    >
      <FAQForm 
        mode="edit" 
        faqId={faqId}
        initialData={faqData}
      />
    </DashboardLayout>
  )
}