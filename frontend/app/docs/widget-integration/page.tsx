'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '../../../components/layout/DashboardLayout'

export default function WidgetIntegrationDocsPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = async (text: string, stepIndex: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStep(stepIndex)
      setTimeout(() => setCopiedStep(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const codeExamples = {
    basic: `<!-- Basic HTML Integration -->
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    <h1>Welcome to My Business</h1>
    
    <!-- Widget embed code - place before closing </body> tag -->
    <script src="https://widget.chatbot.ai/embed.js" data-widget-id="your-widget-id"></script>
</body>
</html>`,

    wordpress: `/* WordPress Integration */
/* Add this to your theme's functions.php file */

function add_chatbot_widget() {
    ?>
    <script src="https://widget.chatbot.ai/embed.js" data-widget-id="your-widget-id"></script>
    <?php
}
add_action('wp_footer', 'add_chatbot_widget');

/* OR add directly to your theme's footer.php before </body> */`,

    shopify: `<!-- Shopify Integration -->
<!-- Go to: Online Store > Themes > Actions > Edit Code -->
<!-- Edit: Layout/theme.liquid -->
<!-- Add before closing </body> tag -->

<script src="https://widget.chatbot.ai/embed.js" data-widget-id="your-widget-id"></script>`,

    react: `// React/Next.js Integration
import { useEffect } from 'react'

export default function Layout({ children }) {
  useEffect(() => {
    // Load widget script
    const script = document.createElement('script')
    script.src = 'https://widget.chatbot.ai/embed.js'
    script.setAttribute('data-widget-id', 'your-widget-id')
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('[src="https://widget.chatbot.ai/embed.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return <div>{children}</div>
}`,

    googleTagManager: `<!-- Google Tag Manager Integration -->
<!-- Add this as a Custom HTML tag in GTM -->

<script>
(function() {
    var script = document.createElement('script');
    script.src = 'https://widget.chatbot.ai/embed.js';
    script.setAttribute('data-widget-id', 'your-widget-id');
    document.head.appendChild(script);
})();
</script>`
  }

  return (
    <DashboardLayout 
      title="Widget Integration Guide"
      subtitle="Complete guide to integrating your chatbot widget into any website"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Chat Widget', href: '/widget' },
        { label: 'Integration Guide', href: '/docs/widget-integration' }
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Quick Start */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Quick Start</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Get your chatbot widget running on your website in under 5 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-xl">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Configure</h3>
              <p className="text-sm text-gray-600">Set up your widget appearance and behavior in the dashboard</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Copy Code</h3>
              <p className="text-sm text-gray-600">Get your unique embed code from the widget page</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-xl">🌐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Install</h3>
              <p className="text-sm text-gray-600">Paste the code into your website before the closing body tag</p>
            </div>
          </div>
        </motion.div>

        {/* Platform Integrations */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">🔧</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Platform Integration Examples</h2>
            </div>
            <p className="text-gray-600">
              Step-by-step code examples for popular platforms and frameworks
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic HTML */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-orange-600 text-sm">📄</span>
                </span>
                Basic HTML Website
              </h3>
              <p className="text-gray-600 mb-4">
                For static HTML websites, add the script tag before the closing &lt;/body&gt; tag:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{codeExamples.basic}</code>
                </pre>
                <motion.button
                  onClick={() => copyToClipboard(codeExamples.basic, 0)}
                  className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedStep === 0 ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>

            {/* WordPress */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-sm">🔵</span>
                </span>
                WordPress
              </h3>
              <p className="text-gray-600 mb-4">
                Add the widget to your WordPress site using one of these methods:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{codeExamples.wordpress}</code>
                </pre>
                <motion.button
                  onClick={() => copyToClipboard(codeExamples.wordpress, 1)}
                  className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedStep === 1 ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>

            {/* Shopify */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">🛍️</span>
                </span>
                Shopify
              </h3>
              <p className="text-gray-600 mb-4">
                Add the widget to your Shopify store:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{codeExamples.shopify}</code>
                </pre>
                <motion.button
                  onClick={() => copyToClipboard(codeExamples.shopify, 2)}
                  className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedStep === 2 ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>

            {/* React/Next.js */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-cyan-600 text-sm">⚛️</span>
                </span>
                React / Next.js
              </h3>
              <p className="text-gray-600 mb-4">
                For React or Next.js applications:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{codeExamples.react}</code>
                </pre>
                <motion.button
                  onClick={() => copyToClipboard(codeExamples.react, 3)}
                  className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedStep === 3 ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>

            {/* Google Tag Manager */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600 text-sm">🏷️</span>
                </span>
                Google Tag Manager
              </h3>
              <p className="text-gray-600 mb-4">
                Deploy via Google Tag Manager:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{codeExamples.googleTagManager}</code>
                </pre>
                <motion.button
                  onClick={() => copyToClipboard(codeExamples.googleTagManager, 4)}
                  className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedStep === 4 ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Troubleshooting */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">🔍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Troubleshooting</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-red-400 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">Widget not appearing?</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Make sure the script is placed before the closing &lt;/body&gt; tag</li>
                <li>• Check that your widget is properly configured in the dashboard</li>
                <li>• Verify your widget embed code is up to date</li>
                <li>• Clear your browser cache and refresh the page</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-400 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">Widget positioning issues?</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Check your widget position setting (bottom-left vs bottom-right)</li>
                <li>• Ensure your website doesn't have conflicting z-index styles</li>
                <li>• Try adjusting the widget theme (light vs dark) for better visibility</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">Need help with custom styling?</h3>
              <p className="text-gray-600 text-sm">
                Contact our support team if you need help with custom CSS overrides or advanced integration scenarios.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Best Practices */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">💡</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Performance Tips</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Load the widget script asynchronously to avoid blocking page load
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Place the script at the bottom of your page for faster initial load
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Test on mobile devices to ensure responsive behavior
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">User Experience</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Choose widget colors that complement your brand
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Write clear, helpful greeting messages
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Keep your business context updated for better AI responses
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}