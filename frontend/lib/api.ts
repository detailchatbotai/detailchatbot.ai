import { supabase } from './supabase'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// Debug: log the API URL being used
console.log('API_BASE_URL:', API_BASE_URL)

// Get auth token from Supabase
async function getAuthToken(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) {
    throw new Error('No authentication token found')
  }
  return session.access_token
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken()
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData.detail || `HTTP ${response.status}: ${response.statusText}`
    
    // Enhanced error for subscription issues
    if (response.status === 403 && errorMessage.includes('subscription')) {
      throw new Error('Active subscription required to access this feature')
    }
    
    throw new Error(errorMessage)
  }

  return response.json()
}

// Shop API endpoints
export const shopAPI = {
  // Get current user's shop
  getMyShop: async () => {
    return apiRequest<{
      id: string
      business_name: string
      description?: string
      phone_number?: string
      email?: string
      website?: string
      owner_id: string
    }>('/api/v1/shops/me')
  },

  // Create new shop
  createShop: async (shopData: {
    business_name: string
    description?: string
    phone_number?: string
    email?: string
    website?: string
  }) => {
    return apiRequest('/api/v1/shops', {
      method: 'POST',
      body: JSON.stringify(shopData),
    })
  },

  // Update shop
  updateShop: async (shopData: {
    business_name: string
    description?: string
    phone_number?: string
    email?: string
    website?: string
  }) => {
    return apiRequest('/api/v1/shops/me', {
      method: 'PUT',
      body: JSON.stringify(shopData),
    })
  },

  // Delete shop
  deleteShop: async () => {
    return apiRequest('/api/v1/shops/me', {
      method: 'DELETE',
    })
  },
}

// Service API endpoints
export const serviceAPI = {
  // Get services for current user's shop
  getServices: async () => {
    return apiRequest<Array<{
      id: string
      shop_id: string
      name: string
      description?: string
      price: number
      duration_minutes: number
      created_at: string
      updated_at: string
    }>>('/api/v1/services/')
  },

  // Create new service
  createService: async (serviceData: {
    name: string
    description?: string
    price: number
    duration_minutes: number
  }) => {
    return apiRequest('/api/v1/services/', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    })
  },

  // Update service
  updateService: async (serviceId: string, serviceData: {
    name: string
    description?: string
    price: number
    duration_minutes: number
  }) => {
    return apiRequest(`/api/v1/services/${serviceId}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    })
  },

  // Delete service
  deleteService: async (serviceId: string) => {
    return apiRequest(`/api/v1/services/${serviceId}`, {
      method: 'DELETE',
    })
  },
}

// FAQ API endpoints
export const faqAPI = {
  // Get FAQs for current user's shop
  getFAQs: async () => {
    return apiRequest<Array<{
      id: string
      shop_id: string
      question: string
      answer: string
      created_at: string
      updated_at: string
    }>>('/api/v1/faqs/')
  },

  // Create new FAQ
  createFAQ: async (faqData: {
    question: string
    answer: string
  }) => {
    return apiRequest('/api/v1/faqs/', {
      method: 'POST',
      body: JSON.stringify(faqData),
    })
  },

  // Update FAQ
  updateFAQ: async (faqId: string, faqData: {
    question: string
    answer: string
  }) => {
    return apiRequest(`/api/v1/faqs/${faqId}`, {
      method: 'PUT',
      body: JSON.stringify(faqData),
    })
  },

  // Delete FAQ
  deleteFAQ: async (faqId: string) => {
    return apiRequest(`/api/v1/faqs/${faqId}`, {
      method: 'DELETE',
    })
  },
}

// Subscription API endpoints
export const subscriptionAPI = {
  // Get current user's subscription
  getMySubscription: async () => {
    return apiRequest<{
      plan_name: string
      is_active: boolean
      started_at: string
      canceled_at?: string
    }>('/api/v1/subscriptions/me')
  },

  // Activate free subscription
  activateFreePlan: async () => {
    return apiRequest('/api/v1/subscriptions/activate-free', {
      method: 'POST',
    })
  },

  // Cancel current subscription
  cancelSubscription: async () => {
    return apiRequest('/api/v1/subscriptions/cancel', {
      method: 'POST',
    })
  },
}

// User API endpoints
export const userAPI = {
  // Delete current user account
  deleteAccount: async () => {
    return apiRequest('/api/v1/users/me', {
      method: 'DELETE',
    })
  },
}

// Chat Widget API endpoints
export const chatWidgetAPI = {
  // Get chat config
  getChatConfig: async () => {
    return apiRequest<{
      id: string
      shop_id: string
      user_context?: string
      system_prompt: string
      created_at: string
      updated_at: string
    }>('/api/v1/chat-config/')
  },

  // Create chat config
  createChatConfig: async (configData: {
    user_context?: string
  }) => {
    return apiRequest('/api/v1/chat-config/', {
      method: 'POST',
      body: JSON.stringify(configData),
    })
  },

  // Update chat config
  updateChatConfig: async (configData: {
    user_context?: string
  }) => {
    return apiRequest('/api/v1/chat-config/', {
      method: 'PUT',
      body: JSON.stringify(configData),
    })
  },

  // Get widget config
  getWidgetConfig: async () => {
    return apiRequest<{
      id: string
      shop_id: string
      position: "bottom-left" | "bottom-right"
      theme: "light" | "dark"
      primary_color: string
      greeting: string
      placeholder: string
      show_branding: boolean
      created_at: string
      updated_at: string
    }>('/api/v1/chat-config/widget-config')
  },

  // Create widget config
  createWidgetConfig: async (configData: {
    position?: "bottom-left" | "bottom-right"
    theme?: "light" | "dark"
    primary_color?: string
    greeting?: string
    placeholder?: string
    show_branding?: boolean
  }) => {
    return apiRequest('/api/v1/chat-config/widget-config', {
      method: 'POST',
      body: JSON.stringify(configData),
    })
  },

  // Update widget config
  updateWidgetConfig: async (configData: {
    position?: "bottom-left" | "bottom-right"
    theme?: "light" | "dark"
    primary_color?: string
    greeting?: string
    placeholder?: string
    show_branding?: boolean
  }) => {
    return apiRequest('/api/v1/chat-config/widget-config', {
      method: 'PUT',
      body: JSON.stringify(configData),
    })
  },

  // Get widget embed code
  getWidgetEmbed: async () => {
    return apiRequest<{
      embed_script: string
    }>('/api/v1/widget/embed')
  },
}

// Generic error handler for API calls
export const handleAPIError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}