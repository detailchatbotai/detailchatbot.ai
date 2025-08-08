'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

interface Breadcrumb {
  label: string
  href: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

export function DashboardLayout({ children, title, subtitle, breadcrumbs }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/auth/login')
          return
        }
        setUser(session.user)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/auth/login')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Signed out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Dashboard Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center h-16 border-b border-gray-100">
            <Link href="/dashboard" className="flex items-center group">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src="/detailchatbot.png" 
                  alt="DetailChatbot.ai" 
                  className="w-8 h-8 mr-3 rounded-full"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  DetailChatbot.ai
                </span>
              </motion.div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden sm:block">
                {user.email}
              </span>
              <motion.button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Out
              </motion.button>
            </div>
          </div>
          
          {/* Page Title Section */}
          <div className="py-6">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="mb-4">
                <ol className="flex items-center space-x-2 text-sm">
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && (
                        <span className="text-gray-400 mx-2">/</span>
                      )}
                      <Link 
                        href={breadcrumb.href}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {breadcrumb.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {title || 'Dashboard'}
                </h1>
                {subtitle && (
                  <p className="text-gray-600 mt-2">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}