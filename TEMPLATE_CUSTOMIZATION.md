# 🎨 Template Customization Guide

This guide helps you customize the Chatbot.ai template for your business after forking.

## 🏢 Branding Customization

### 1. Logo and App Name

**Frontend Changes:**

1. **Update App Name** in `frontend/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'YourBrand - AI Chatbots for Service Businesses', // Change this
  description: 'Create intelligent chatbots for your service business', // Change this
}
```

2. **Update Logo/Icon** in `frontend/components/ConditionalNavbar.tsx` and `frontend/components/layout/DashboardLayout.tsx`:
```typescript
// Replace emoji with your logo
<span className="text-white font-bold text-lg">🤖</span> // Change this
<span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
  YourBrand.ai // Change this
</span>
```

3. **Update Favicon**: Replace files in `frontend/public/`:
   - `favicon.ico`
   - `apple-touch-icon.png`
   - `icon.png`

### 2. Color Scheme

**Tailwind Colors** in `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',   // Light blue - change to your brand
        600: '#2563eb',  // Main blue - change to your brand
        700: '#1d4ed8',  // Dark blue - change to your brand
      },
      accent: {
        600: '#7c3aed',  // Purple accent - change to your brand
      }
    }
  }
}
```

### 3. Company Information

**Update Domain References:**
- `backend/app/main.py` - CORS origins
- `DEPLOYMENT.md` - example domains
- `frontend/components/layout/DashboardLayout.tsx` - powered by text

## 📝 Content Customization

### 1. Landing Page Content

Update `frontend/app/page.tsx` with your:
- Hero section copy
- Features list
- Testimonials
- Pricing information
- Company description

### 2. Default Widget Configuration

Update defaults in `frontend/components/forms/WidgetConfigForm.tsx`:
```typescript
const [widgetConfig, setWidgetConfig] = useState<WidgetConfigData>({
  position: "bottom-right",
  theme: "light",
  primary_color: "#3B82F6", // Your brand color
  greeting: "Hi! How can we help you with your services?", // Your greeting
  placeholder: "Ask about pricing, availability, or how we work...", // Your placeholder
  show_branding: true, // Set to false to remove "Powered by Chatbot.ai"
})
```

### 3. Email Templates

Update email templates in your Supabase project:
- Confirmation emails
- Password reset emails
- Welcome emails

## 🔧 Backend Customization

### 1. API Title and Description

Update `backend/app/main.py`:
```python
app = FastAPI(
    title="YourBrand API",  # Change this
    version="1.0.0",
    description="AI Chatbot API for YourBrand"  # Add this
)
```

### 2. Widget Branding

Update `backend/app/services/widget.py` if you want to customize the embed script branding.

## 🗄️ Database Customization

### 1. Add Custom Fields

To add custom fields to existing models:

1. Update model in `backend/app/models/`
2. Create migration: `alembic revision --autogenerate -m "add custom field"`
3. Run migration: `alembic upgrade head`
4. Update schema in `backend/app/schemas/`
5. Update API endpoints and frontend forms

### 2. Add New Features

Follow existing patterns:
1. Create model in `backend/app/models/`
2. Create schema in `backend/app/schemas/`
3. Create service in `backend/app/services/`
4. Create API router in `backend/app/api/v1/`
5. Add router to `backend/app/main.py`
6. Create frontend components and pages

## 🎯 Feature Customization

### 1. Remove Unused Features

To remove features you don't need:
1. Comment out router in `backend/app/main.py`
2. Remove navigation links from dashboard
3. Remove frontend pages/components

### 2. Add Industry-Specific Features

Examples for different industries:
- **Salons**: Appointment booking integration
- **Restaurants**: Menu display, order taking
- **Consulting**: Lead qualification forms
- **E-commerce**: Product catalog integration

## 🔐 Security Customization

### 1. Rate Limiting

Add rate limiting to `backend/app/main.py`:
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
```

### 2. Custom Authentication

Extend authentication in `backend/app/core/supabase_auth.py` for:
- Role-based access control
- Multi-tenant architecture
- Custom user metadata

## 📊 Analytics Customization

### 1. Add Analytics

Integrate with your preferred analytics:
- Google Analytics 4
- Mixpanel
- PostHog
- Custom analytics

### 2. Custom Metrics

Track business-specific metrics:
- Customer interactions
- Conversion rates
- Feature usage
- Revenue attribution

## 🚀 Deployment Customization

### 1. Custom Domains

- Update CORS origins for your domains
- Configure custom domains in Railway/Vercel
- Update environment variables

### 2. Environment-Specific Configuration

Create different configurations for:
- Development
- Staging  
- Production

## 📋 Customization Checklist

### Before Launch:
- [ ] Update all branding (name, logo, colors)
- [ ] Customize default widget configuration
- [ ] Update domain references
- [ ] Test email flows
- [ ] Configure custom domains
- [ ] Update analytics tracking
- [ ] Test all user flows
- [ ] Update documentation with your specifics

### Post-Launch:
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Implement industry-specific features
- [ ] Optimize conversion flows
- [ ] Scale infrastructure as needed

## 🆘 Support

When customizing this template:
1. Keep original folder structure
2. Follow existing code patterns
3. Test thoroughly after changes
4. Update documentation for your team
5. Consider creating a staging environment first

This template is designed to be fully customizable while maintaining the core chatbot functionality. Focus on your unique value proposition and industry-specific needs!