'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { WidgetConfigForm } from '../../components/forms/WidgetConfigForm'
import { chatWidgetAPI, handleAPIError } from '../../lib/api'

export default function WidgetPage() {
  const [embedCode, setEmbedCode] = useState<string>('')
  const [loadingEmbed, setLoadingEmbed] = useState(false)

  const fetchEmbedCode = async () => {
    setLoadingEmbed(true)
    try {
      const data = await chatWidgetAPI.getWidgetEmbed()
      setEmbedCode(data.embed_script)
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setLoadingEmbed(false)
    }
  }

  useEffect(() => {
    fetchEmbedCode()
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      toast.success('Embed code copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy embed code')
    }
  }

  return (
    <DashboardLayout 
      title="Chat Widget"
      subtitle="Configure and embed your AI chatbot"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Chat Widget', href: '/widget' }
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Configuration Form */}
        <WidgetConfigForm onSuccess={fetchEmbedCode} />

        {/* Documentation Quick Links */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
              <p className="text-sm text-gray-600">Check out our comprehensive guides and documentation</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/docs/widget-integration">
                <motion.button
                  className="bg-white text-blue-600 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all border border-blue-200 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🌐 Integration Guide
                </motion.button>
              </Link>
              <Link href="/docs/getting-started">
                <motion.button
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-700 transition-all text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📚 Getting Started
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Embed Code Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Embed Code
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Copy and paste this code into your website's HTML to add the chat widget
            </p>
          </div>

          {loadingEmbed ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Code Display */}
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{embedCode || 'Configure your widget first to generate embed code'}</code>
                </pre>
                
                {embedCode && (
                  <motion.button
                    onClick={copyToClipboard}
                    className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Copy
                  </motion.button>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  How to install:
                </h3>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Copy the embed code above</li>
                  <li>2. Paste it into your website's HTML, just before the closing &lt;/body&gt; tag</li>
                  <li>3. Save and publish your website</li>
                  <li>4. The chat widget will appear on your site automatically</li>
                </ol>
              </div>

              {!embedCode && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h3 className="font-semibold text-yellow-900 mb-1">
                    Configuration Required
                  </h3>
                  <p className="text-sm text-yellow-800">
                    Please save your widget configuration above to generate the embed code.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Preview Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Widget Preview
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              This is how your chat widget will look on your website
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 min-h-[200px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🤖</span>
              </div>
              <p className="font-medium">Widget Preview</p>
              <p className="text-sm mt-1">
                Live preview will be available in a future update
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}