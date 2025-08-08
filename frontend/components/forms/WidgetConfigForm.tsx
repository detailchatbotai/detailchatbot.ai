'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { chatWidgetAPI, handleAPIError } from '../../lib/api'

interface WidgetConfigData {
  position?: "bottom-left" | "bottom-right"
  theme?: "light" | "dark"
  primary_color?: string
  greeting?: string
  placeholder?: string
  show_branding?: boolean
}

interface ChatConfigData {
  user_context?: string
}

interface WidgetConfigFormProps {
  onSuccess?: () => void
}

export function WidgetConfigForm({ onSuccess }: WidgetConfigFormProps) {
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfigData>({
    position: "bottom-right",
    theme: "light",
    primary_color: "#3B82F6",
    greeting: "Hi! How can we help you with your services?",
    placeholder: "Ask about pricing, availability, or how we work...",
    show_branding: true,
  })
  
  const [chatConfig, setChatConfig] = useState<ChatConfigData>({
    user_context: "",
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasConfig, setHasConfig] = useState({ widget: false, chat: false })

  useEffect(() => {
    fetchConfigs()
  }, [])

  const fetchConfigs = async () => {
    try {
      // Try to get existing configs
      try {
        const widget = await chatWidgetAPI.getWidgetConfig()
        setWidgetConfig(widget)
        setHasConfig(prev => ({ ...prev, widget: true }))
      } catch (error) {
        setHasConfig(prev => ({ ...prev, widget: false }))
      }

      try {
        const chat = await chatWidgetAPI.getChatConfig()
        setChatConfig({ user_context: chat.user_context || '' })
        setHasConfig(prev => ({ ...prev, chat: true }))
      } catch (error) {
        setHasConfig(prev => ({ ...prev, chat: false }))
      }
    } catch (error) {
      // Configs don't exist, use defaults
    } finally {
      setLoading(false)
    }
  }

  const handleWidgetChange = (field: keyof WidgetConfigData, value: any) => {
    setWidgetConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleChatChange = (field: keyof ChatConfigData, value: any) => {
    setChatConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save widget config
      if (hasConfig.widget) {
        await chatWidgetAPI.updateWidgetConfig(widgetConfig)
      } else {
        await chatWidgetAPI.createWidgetConfig(widgetConfig)
      }

      // Save chat config
      if (hasConfig.chat) {
        await chatWidgetAPI.updateChatConfig(chatConfig)
      } else {
        await chatWidgetAPI.createChatConfig(chatConfig)
      }

      toast.success('Widget configuration saved successfully!')
      onSuccess?.()
      await fetchConfigs() // Refresh to get latest data
    } catch (error) {
      toast.error(handleAPIError(error))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
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
          Widget Configuration
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Customize your chat widget appearance and behavior
        </p>
      </div>

      <div className="space-y-6">
        {/* Widget Appearance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Position */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Position
              </label>
              <select
                value={widgetConfig.position}
                onChange={(e) => handleWidgetChange('position', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={widgetConfig.theme}
                onChange={(e) => handleWidgetChange('theme', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Primary Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={widgetConfig.primary_color}
                  onChange={(e) => handleWidgetChange('primary_color', e.target.value)}
                  className="w-16 h-12 rounded-xl border border-gray-300"
                />
                <input
                  type="text"
                  value={widgetConfig.primary_color}
                  onChange={(e) => handleWidgetChange('primary_color', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            {/* Show Branding */}
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={widgetConfig.show_branding}
                  onChange={(e) => handleWidgetChange('show_branding', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-sm font-semibold text-gray-700">
                  Show "Powered by Chatbot.ai"
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Widget Messages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages</h3>
          <div className="space-y-4">
            
            {/* Greeting */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Greeting Message
              </label>
              <input
                type="text"
                value={widgetConfig.greeting}
                onChange={(e) => handleWidgetChange('greeting', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Hi! How can we help you with your services?"
              />
            </div>

            {/* Placeholder */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Input Placeholder
              </label>
              <input
                type="text"
                value={widgetConfig.placeholder}
                onChange={(e) => handleWidgetChange('placeholder', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Ask about pricing, availability, or how we work..."
              />
            </div>
          </div>
        </div>

        {/* Chat Behavior */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Chat Behavior</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Context (optional)
            </label>
            <textarea
              value={chatConfig.user_context}
              onChange={(e) => handleChatChange('user_context', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Tell the AI about your business, services, policies, or any specific information it should know when chatting with customers..."
            />
            <p className="mt-2 text-xs text-gray-500">
              This helps the AI provide more relevant responses about your business.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <motion.button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Saving...
              </div>
            ) : (
              'Save Configuration'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}