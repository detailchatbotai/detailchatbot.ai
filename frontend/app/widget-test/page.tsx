'use client'

import { useEffect } from 'react'

export default function WidgetTestPage() {
  useEffect(() => {
    // Set up the widget config
    (window as any).ChatbotAiConfig = {
      shopId: "ba8b63f7-c3ec-46ea-84e1-b056f8866bc0",
      position: "bottom-right",
      theme: "dark",
      primaryColor: "#3B82F6",
      greeting: "Hi! How can we help you with your detailing services?",
      placeholder: "Ask about pricing, packages, or booking...",
      showBranding: true
    }

    // Load the widget script from your backend
    const script = document.createElement('script')
    script.src = 'http://localhost:8000/api/v1/widget/widget.js'
    script.async = true
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      // Use the widget's cleanup function if available
      if ((window as any).DetailChatbotWidget?.destroy) {
        (window as any).DetailChatbotWidget.destroy()
      }
      
      // Remove the script
      const existingScript = document.querySelector('script[src="http://localhost:8000/api/v1/widget/widget.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fake detailing shop header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/detailchatbot.png" 
                alt="DetailChatbot.ai" 
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">Elite Auto Detailing</h1>
                <p className="text-blue-100">Professional Car Care Services</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100">Call us: (555) 123-4567</p>
              <p className="text-blue-100">Phoenix, AZ</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Premium Auto Detailing Services
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Transform your vehicle with our professional detailing services. From basic washes to ceramic coating, we make your car look brand new.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  ✓
                </span>
                Professional ceramic coating
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  ✓
                </span>
                Paint correction and polishing
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  ✓
                </span>
                Interior and exterior detailing
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <h4 className="font-semibold">Basic Wash & Wax</h4>
                  <p className="text-gray-600 text-sm">Exterior wash and protective wax</p>
                </div>
                <span className="text-blue-600 font-bold">$45</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <h4 className="font-semibold">Premium Detail</h4>
                  <p className="text-gray-600 text-sm">Complete interior and exterior detail</p>
                </div>
                <span className="text-blue-600 font-bold">$125</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <h4 className="font-semibold">Ceramic Coating</h4>
                  <p className="text-gray-600 text-sm">9H hardness ceramic protection</p>
                </div>
                <span className="text-blue-600 font-bold">$350</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <h4 className="font-semibold">Paint Correction</h4>
                  <p className="text-gray-600 text-sm">Multi-stage paint restoration</p>
                </div>
                <span className="text-blue-600 font-bold">$250</span>
              </div>
            </div>
          </div>
        </div>

        {/* Widget Test Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Live Widget Test</h3>
          <p className="text-green-700 mb-4">
            This is your real DetailChatbot.ai widget connected to your backend! 
            Look for the chat widget in the bottom-right corner and test the AI conversations.
          </p>
          <div className="text-sm text-green-600">
            <p><strong>Backend Integration:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Widget Source: <code>http://localhost:8000/api/v1/widget/widget.js</code></li>
              <li>Chat API: <code>http://localhost:8000/api/v1/chat/&#123;shopId&#125;/public</code></li>
              <li>Shop ID: ba8b63f7-c3ec-46ea-84e1-b056f8866bc0</li>
              <li>Real AI Responses: Connected to your OpenAI integration</li>
              <li>Auto Detailing Context: Uses your shop's services and FAQs</li>
            </ul>
          </div>
        </div>

        {/* More content to show scrolling */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4">Why Choose Us?</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• 10+ years experience</li>
              <li>• Eco-friendly products</li>
              <li>• Mobile service available</li>
              <li>• 100% satisfaction guarantee</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4">Operating Hours</h4>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8AM - 6PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>9AM - 4PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-600">
              <p>📞 (555) 123-4567</p>
              <p>📧 info@eliteautodetail.com</p>
              <p>📍 123 Main St, Phoenix, AZ</p>
              <p>🌐 www.eliteautodetail.com</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Elite Auto Detailing. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Powered by DetailChatbot.ai</p>
        </div>
      </footer>
    </div>
  )
}