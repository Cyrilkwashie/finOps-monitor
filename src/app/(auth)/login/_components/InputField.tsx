'use client'

import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputFieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  icon: React.ReactNode
  rightElement?: React.ReactNode
  error?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputField({
  id,
  label,
  type,
  placeholder,
  icon,
  rightElement,
  error,
  value,
  onChange,
}: InputFieldProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1.5"
      >
        {label}
      </label>
      <div className="relative flex items-center group">
        <span className="absolute left-3 text-gray-300 group-focus-within:text-finops-steel transition-colors duration-150 pointer-events-none shrink-0">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-describedby={errorId}
          aria-invalid={error ? true : undefined}
          className={cn(
            'w-full h-11 bg-white border rounded-md pl-9 text-xs text-gray-700 placeholder-gray-300',
            'focus:outline-none focus:ring-1 transition-colors duration-150',
            rightElement ? 'pr-9' : 'pr-3',
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
              : 'border-finops-silver focus:border-finops-steel focus:ring-finops-steel/20'
          )}
        />
        {rightElement && (
          <span className="absolute right-3">{rightElement}</span>
        )}
      </div>
      {error && (
        <p
          id={errorId}
          className="text-[10px] text-red-400 mt-1 flex items-center gap-1"
          role="alert"
        >
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}
