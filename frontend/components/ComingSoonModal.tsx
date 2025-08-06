'use client'

import { Modal } from './ui/Modal'
import { Button } from './ui/Button'

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'login' | 'register'
}

export function ComingSoonModal({ isOpen, onClose, type }: ComingSoonModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
          <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {type === 'login' ? 'Sign In' : 'Get Started'} - Coming Soon!
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          We're putting the finishing touches on our authentication system. 
          Join our waitlist to be notified when we launch!
        </p>
        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
          <Button className="flex-1">
            Join Waitlist
          </Button>
        </div>
      </div>
    </Modal>
  )
}