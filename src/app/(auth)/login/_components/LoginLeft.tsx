'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Activity } from 'lucide-react'

const slides = [
  {
    src: '/images/slide-2.jpg',
    tag: 'REAL-TIME MONITORING',
    headline: 'SOD, POD, and EOD —\nevery operation tracked.',
    body: 'Track every banking procedure from start of day through close, across all client banks.',
  },
  {
    src: '/images/slide-1.jpg',
    tag: 'MULTI-BANK COVERAGE',
    headline: 'Every bank.\nOne unified view.',
    body: 'Manage operations across all client institutions from a single command center.',
  },
  {
    src: '/images/slide-3.jpg',
    tag: 'AUDIT READY',
    headline: 'Complete logs.\nZero surprises.',
    body: 'Full procedure history and audit trails always available for compliance and review.',
  },
]

export function LoginLeft() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <div className="relative lg:w-[52%] min-h-[380px] bg-[#002244] overflow-hidden">
      {/* Slide background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[400ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.src}
            fill
            alt=""
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Navy gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#002244]/80 via-[#002244]/60 to-[#002244]/90"
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#001122] to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col p-8 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 inline-flex">
            <Activity size={20} className="text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white">FinOps</span>
            <span className="text-sm font-semibold text-teal-300"> Monitor</span>
          </div>
        </div>

        {/* Slide text */}
        <div className="flex-1 flex flex-col justify-center mt-8">
          {/* Tag pill */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-teal-300 font-medium">
              {slide.tag}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight whitespace-pre-line mb-4">
            {slide.headline}
          </h2>

          {/* Body */}
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            {slide.body}
          </p>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-7 h-2 bg-teal-400'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <span className="text-[10px] text-white/30">
            Trusted by financial institutions worldwide
          </span>
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[10px] text-white/30">Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}
