'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Mike Rodriguez',
    business: 'Elite Auto Detailing',
    location: 'Phoenix, AZ',
    quote: 'Our chatbot increased booking requests by 300% in the first month. It handles all the basic questions so we can focus on delivering amazing service.',
    avatar: 'MR',
    metric: '+300%',
    metricLabel: 'Booking Increase',
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    name: 'Sarah Chen',
    business: 'AC Masters HVAC',
    location: 'Dallas, TX', 
    quote: 'The AI knows our services better than some of our competitors! It qualifies leads perfectly and only sends us serious customers.',
    avatar: 'SC',
    metric: '95%',
    metricLabel: 'Lead Quality',
    gradient: 'from-accent-500 to-accent-600'
  },
  {
    name: 'Tommy Williams',
    business: 'Rapid Rooter Plumbing',
    location: 'Miami, FL',
    quote: 'Game changer for our emergency calls. The chatbot captures urgent requests even when we\'re on other jobs. Revenue up 45% this quarter.',
    avatar: 'TW',
    metric: '+45%',
    metricLabel: 'Revenue Growth',
    gradient: 'from-primary-600 to-accent-700'
  }
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-primary-100 text-primary-700 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold">💬 Success Stories</span>
          </motion.div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Real Results from
            <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of service businesses already using our chatbots to 
            grow their customer base and boost revenue.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Background gradient effect */}
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${testimonial.gradient}`}></div>
                
                {/* Quote icon */}
                <div className="absolute -top-4 right-8">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>

                {/* Metric badge */}
                <div className="mb-6">
                  <div className={`inline-flex items-center bg-gradient-to-r ${testimonial.gradient} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                    <span className="text-2xl mr-2">{testimonial.metric}</span>
                    <span>{testimonial.metricLabel}</span>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
                    <span className="text-white font-bold text-lg">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-primary-600 font-semibold">
                      {testimonial.business}
                    </div>
                    <div className="text-sm text-gray-500">
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 rounded-3xl p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-1 text-yellow-300 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.svg 
                  key={i} 
                  className="w-8 h-8 fill-current" 
                  viewBox="0 0 20 20"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Rated 4.9/5 stars by 500+ business owners
            </h3>
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">250%</div>
                <div className="text-white/80">Avg. Lead Increase</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80">AI Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}