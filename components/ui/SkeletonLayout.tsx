'use client'

import { motion } from 'framer-motion'

export function SkeletonLayout() {
  return (
    <div
      className="fixed inset-0 z-[200] bg-[#08090A] overflow-y-auto overflow-x-hidden selection:none pointer-events-none"
      aria-live="polite"
      aria-label="Loading Neomagnesis AI"
      aria-busy="true"
    >
      <style jsx>{`
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(26, 29, 30, 0.4) 20%,
            rgba(45, 50, 52, 0.6) 50%,
            rgba(26, 29, 30, 0.4) 80%
          );
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
        .skeleton-copper {
          background: linear-gradient(
            90deg,
            rgba(200, 125, 85, 0.12) 20%,
            rgba(200, 125, 85, 0.28) 50%,
            rgba(200, 125, 85, 0.12) 80%
          );
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      {/* ── Skeleton Floating Centered Dock ── */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(15, 17, 18, 0.75)',
            border: '1px solid rgba(241, 239, 232, 0.08)',
            boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.5)',
            height: 46,
            minWidth: 460,
          }}
        >
          {/* Logo mark icon */}
          <div className="w-6 h-6 rounded-full skeleton-shimmer shrink-0" />
          <div className="w-px h-4 mx-1 bg-white/[0.08]" />
          {/* Nav items */}
          <div className="flex items-center gap-3 mx-2">
            {[48, 64, 76, 62, 54, 58].map((w, i) => (
              <div
                key={i}
                className="skeleton-shimmer rounded-full"
                style={{ width: w, height: 12, animationDelay: `${i * 0.06}s` }}
              />
            ))}
          </div>
          <div className="w-px h-4 mx-1 bg-white/[0.08]" />
          {/* Early Access button skeleton */}
          <div className="skeleton-copper rounded-full shrink-0" style={{ width: 92, height: 26 }} />
        </div>
      </div>

      {/* ── Skeleton Hero Section ── */}
      <div className="min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center max-w-[880px] mx-auto">
        {/* Eyebrow badge */}
        <div className="skeleton-shimmer rounded-full mb-7" style={{ width: 210, height: 28 }} />

        {/* 3D Core Visual Preview with Official Nucleus Mark */}
        <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/[0.06] animate-pulse" />
          <div className="w-24 h-24 relative opacity-60">
            <img
              src="/brand/nucleus-mark-white.png"
              alt=""
              width={96}
              height={90}
              className="w-full h-full object-contain pointer-events-none filter drop-shadow-[0_0_15px_rgba(200,125,85,0.4)]"
            />
          </div>
        </div>

        {/* Heading skeleton */}
        <div className="flex flex-col items-center gap-3 mb-5">
          <div className="skeleton-shimmer rounded-lg" style={{ width: 'clamp(260px, 50vw, 480px)', height: 48 }} />
        </div>

        {/* Subtitle skeleton */}
        <div className="skeleton-shimmer rounded-md mb-6" style={{ width: 'clamp(220px, 40vw, 360px)', height: 22 }} />

        {/* Description lines */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="skeleton-shimmer rounded" style={{ width: 'clamp(280px, 60vw, 520px)', height: 14 }} />
          <div className="skeleton-shimmer rounded" style={{ width: 'clamp(220px, 45vw, 380px)', height: 14 }} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="skeleton-copper rounded-full" style={{ width: 170, height: 44 }} />
          <div className="skeleton-shimmer rounded-full" style={{ width: 160, height: 44 }} />
        </div>

        {/* System Triad */}
        <div className="flex items-center justify-center gap-8 mt-16">
          <div className="skeleton-shimmer rounded" style={{ width: 90, height: 12 }} />
          <div className="skeleton-shimmer rounded" style={{ width: 110, height: 12 }} />
          <div className="skeleton-shimmer rounded" style={{ width: 100, height: 12 }} />
        </div>
      </div>

      {/* ── Skeleton Body Sections ── */}
      <div className="max-w-[1200px] mx-auto px-6 space-y-28 pb-32">
        {/* Philosophy Skeleton */}
        <div className="space-y-6 pt-12 border-t border-[#232726]">
          <div className="skeleton-shimmer rounded" style={{ width: 140, height: 12 }} />
          <div className="skeleton-shimmer rounded" style={{ width: 340, height: 32 }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-shimmer rounded-2xl p-6" style={{ height: 200 }} />
            ))}
          </div>
        </div>

        {/* Architecture Skeleton */}
        <div className="space-y-6 pt-12 border-t border-[#232726]">
          <div className="skeleton-shimmer rounded" style={{ width: 160, height: 12 }} />
          <div className="skeleton-shimmer rounded" style={{ width: 380, height: 32 }} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <div className="skeleton-shimmer rounded-2xl" style={{ height: 300 }} />
            <div className="skeleton-shimmer rounded-2xl" style={{ height: 300 }} />
          </div>
        </div>

        {/* Early Access Skeleton */}
        <div className="space-y-6 pt-12 border-t border-[#232726]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="skeleton-shimmer rounded" style={{ width: 160, height: 12 }} />
              <div className="skeleton-shimmer rounded" style={{ width: 280, height: 32 }} />
              <div className="skeleton-shimmer rounded" style={{ width: 220, height: 16 }} />
              <div className="skeleton-copper rounded-full" style={{ width: 180, height: 44 }} />
            </div>
            <div className="lg:col-span-7">
              <div className="skeleton-shimmer rounded-2xl" style={{ height: 260 }} />
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="pt-16 border-t border-[#232726] space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <div className="skeleton-shimmer rounded" style={{ width: 140, height: 28 }} />
              <div className="skeleton-shimmer rounded" style={{ width: 240, height: 14 }} />
            </div>
            <div className="md:col-span-7 grid grid-cols-3 gap-6">
              {[1, 2, 3].map((col) => (
                <div key={col} className="space-y-3">
                  <div className="skeleton-shimmer rounded" style={{ width: 80, height: 14 }} />
                  <div className="skeleton-shimmer rounded" style={{ width: 95, height: 10 }} />
                  <div className="skeleton-shimmer rounded" style={{ width: 90, height: 10 }} />
                  <div className="skeleton-shimmer rounded" style={{ width: 85, height: 10 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLayout