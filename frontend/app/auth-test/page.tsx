'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthTestPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setStatus(`❌ Sign up error: ${error.message}`)
      } else {
        setStatus('✅ Sign up successful! Check your email for confirmation.')
      }
    } catch (err) {
      setStatus(`❌ Sign up failed: ${err}`)
    }
  }

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setStatus(`❌ Login error: ${error.message}`)
        setAccessToken('')
      } else {
        setStatus('✅ Login successful!')
        setAccessToken(data.session?.access_token || '')
      }
    } catch (err) {
      setStatus(`❌ Login failed: ${err}`)
      setAccessToken('')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Auth Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Email:
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleSignUp}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
        
        <button
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>

      {status && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
          <strong>Status:</strong> {status}
        </div>
      )}

      {accessToken && (
        <div>
          <label>
            <strong>Access Token:</strong>
            <br />
            <textarea
              value={accessToken}
              readOnly
              rows={10}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '4px',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            />
          </label>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Copy this token to test backend endpoints in Swagger/Postman
          </p>
        </div>
      )}
    </div>
  )
}



