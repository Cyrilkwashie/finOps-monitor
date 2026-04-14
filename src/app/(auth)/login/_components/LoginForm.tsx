'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Shield,
  Server,
} from 'lucide-react'
import { InputField } from './InputField'

interface FieldErrors {
  email?: string
  password?: string
}

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [authError, setAuthError] = useState<boolean | null>(null)

  // Escape key clears authError
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && authError) {
        setAuthError(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [authError])

  const validate = useCallback((): boolean => {
    const errors: FieldErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }, [email, password])

  const handleSubmit = async () => {
    setAuthError(null)
    if (!validate()) return
    setIsLoading(true)
    await new Promise<void>((r) => setTimeout(r, 2000))
    if (!email.endsWith('@finops.com')) {
      setAuthError(true)
      setIsLoading(false)
      return
    }
    router.push('/dashboard')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="w-full max-w-85 mx-auto">
      {/* Form Header */}
      <div>
        <span className="inline-block bg-finops-steel/8 text-finops-steel text-[10px] px-2.5 py-1 rounded-full border border-finops-steel/15 mb-4">
          Secure Sign In
        </span>
        <h1 className="text-xl font-medium text-finops-dark">Welcome back</h1>
        <p className="text-xs text-gray-400 mt-1">
          Sign in to your FinOps Monitor account
        </p>
      </div>

      {/* Form Fields */}
      <div className="mt-8 flex flex-col gap-4" onKeyDown={handleKeyDown}>
        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@finops.com"
          icon={<Mail size={14} />}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (fieldErrors.email)
              setFieldErrors((prev) => ({ ...prev, email: undefined }))
          }}
          error={fieldErrors.email}
        />
        <InputField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={<Lock size={14} />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-300 hover:text-gray-500 transition-colors duration-150 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          }
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (fieldErrors.password)
              setFieldErrors((prev) => ({ ...prev, password: undefined }))
          }}
          error={fieldErrors.password}
        />
      </div>

      {/* Options Row */}
      <div className="flex justify-between items-center mt-3">
        <button
          type="button"
          onClick={() => setRememberMe((prev) => !prev)}
          className="flex items-center gap-1.5 cursor-pointer"
          aria-pressed={rememberMe}
        >
          <span
            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 transition-colors duration-150 ${
              rememberMe
                ? 'bg-finops-steel border-finops-steel'
                : 'bg-white border-finops-silver'
            }`}
          >
            {rememberMe && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                <path
                  d="M1 3L3 5L7 1"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className="text-[10px] text-gray-400">Remember me</span>
        </button>
        <a href="#" className="text-[10px] text-finops-steel hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`mt-6 w-full h-11 bg-finops-steel text-finops-cream text-xs font-medium rounded-md hover:bg-finops-dark transition-colors duration-150 flex items-center justify-center gap-2 ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-3.5 h-3.5 rounded-full border-2 border-finops-cream/30 border-t-finops-cream animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight size={14} />
          </>
        )}
      </button>

      {/* Error Banner */}
      {authError && (
        <div
          className="bg-red-50 border border-red-100 rounded-md px-3 py-2 mt-3 flex items-center gap-2"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={13} className="text-red-400 shrink-0" />
          <span className="text-[10px] text-red-500">
            Invalid credentials. Please try again.
          </span>
        </div>
      )}

      {/* Form Footer */}
      <div className="mt-8 pt-6 border-t border-finops-silver">
        <p className="text-[10px] text-gray-400 text-center">
          Need access?{' '}
          <a href="#" className="text-finops-steel hover:underline">
            Contact your administrator →
          </a>
        </p>
        <div className="flex gap-4 justify-center mt-4">
          <span className="flex items-center gap-1">
            <Lock size={11} className="text-gray-300" aria-hidden="true" />
            <span className="text-[10px] text-gray-300">256-bit SSL</span>
          </span>
          <span className="flex items-center gap-1">
            <Shield size={11} className="text-gray-300" aria-hidden="true" />
            <span className="text-[10px] text-gray-300">SOC 2</span>
          </span>
          <span className="flex items-center gap-1">
            <Server size={11} className="text-gray-300" aria-hidden="true" />
            <span className="text-[10px] text-gray-300">Encrypted</span>
          </span>
        </div>
      </div>
    </div>
  )
}
