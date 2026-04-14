'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertTriangle, Activity } from 'lucide-react'

export function LoginRight() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields to continue.')
      return
    }
    setIsLoading(true)
    await new Promise<void>((r) => setTimeout(r, 1200))
    router.push('/dashboard')
  }

  return (
    <div className="flex-1 bg-white dark:bg-[#1e293b] flex flex-col justify-center px-8 py-12 lg:px-12 transition-colors">
      {/* Mobile-only logo */}
      <div className="flex items-center gap-2.5 mb-10 lg:hidden">
        <div className="bg-[#002244] dark:bg-[#2dd4bf]/10 rounded-lg p-1.5 inline-flex">
          <Activity size={18} className="text-white dark:text-[#2dd4bf]" />
        </div>
        <span className="text-sm font-semibold text-[#002244] dark:text-[#e2e8f0]">
          FinOps<span className="text-teal-600 dark:text-teal-400"> Monitor</span>
        </span>
      </div>

      <div className="w-full max-w-sm mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-400 font-medium mb-2">
            Welcome Back
          </p>
          <h1 className="text-3xl font-extrabold text-[#002244] dark:text-[#e2e8f0]">
            Sign in to your account
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#94a3b8] mt-2">
            Enter your credentials to access the platform.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            {/* Error banner */}
            {error && (
              <div
                className="flex items-start gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-[0.625rem] px-3 py-2.5"
                role="alert"
              >
                <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0] mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#94a3b8] pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@finops.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError() }}
                  className="w-full h-11 pl-9 pr-3 text-sm text-[#0a0a0a] dark:text-[#e2e8f0] bg-white dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] placeholder:text-gray-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#002244] dark:focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#002244]/20 dark:focus:ring-[#2dd4bf]/20 transition-all duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#0a0a0a] dark:text-[#e2e8f0]"
                >
                  Password
                </label>
                <a href="#" className="text-[10px] text-[#002244] dark:text-teal-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#94a3b8] pointer-events-none"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError() }}
                  className="w-full h-11 pl-9 pr-10 text-sm text-[#0a0a0a] dark:text-[#e2e8f0] bg-white dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] rounded-[0.625rem] placeholder:text-gray-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#002244] dark:focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#002244]/20 dark:focus:ring-[#2dd4bf]/20 transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#94a3b8] hover:text-[#0a0a0a] dark:hover:text-[#e2e8f0] transition-colors duration-150 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-2 w-full h-11 rounded-[0.625rem] text-sm font-semibold text-white flex items-center justify-center gap-2 transition-colors duration-150 ${
                isLoading
                  ? 'bg-[#002244]/70 cursor-not-allowed'
                  : 'bg-[#002244] hover:bg-[#001833] cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#e5e5e5] dark:bg-[#334155]" />
          <span className="text-[10px] text-[#737373] dark:text-[#94a3b8] uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-[#e5e5e5] dark:bg-[#334155]" />
        </div>

        {/* Google button */}
        <button
          type="button"
          className="w-full h-11 rounded-[0.625rem] border border-[#e5e5e5] dark:border-[#334155] flex items-center justify-center gap-2.5 text-sm font-medium text-[#0a0a0a] dark:text-[#e2e8f0] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-150 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
            <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Footer note */}
        <p className="text-center text-[10px] text-[#a3a3a3] dark:text-[#475569] mt-8">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-[#737373] dark:hover:text-[#94a3b8]">Terms</a> and
          {' '}
          <a href="#" className="underline hover:text-[#737373] dark:hover:text-[#94a3b8]">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}
