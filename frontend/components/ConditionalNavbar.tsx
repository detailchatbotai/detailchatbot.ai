'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Show navbar ONLY on landing page and specific public pages
  const publicRoutes = ['/', '/pricing', '/about', '/contact']
  const shouldShowNavbar = publicRoutes.includes(pathname)
  
  // Don't show navbar on any dashboard, auth, or app pages
  if (!shouldShowNavbar) {
    return null
  }
  
  return <Navbar />
}