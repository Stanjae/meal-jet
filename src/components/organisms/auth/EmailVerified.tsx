import { useEffect, useState } from 'react';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useVerifyEmail } from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';

const routeApi = getRouteApi('/auth/account-verification');

// ─── Particle ───────────────────────────────────────────────────────────────
function Particle({
  angle,
  distance,
  size,
  color,
  delay,
  active,
}: {
  angle: number;
  distance: number;
  size: number;
  color: string;
  delay: number;
  active: boolean;
}) {
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * distance;
  const ty = Math.sin(rad) * distance;

  return (
    <AnimatePresence>
      {active && (
        <motion.span
          className="absolute rounded-full top-1/2 left-1/2"
          style={{
            width: size,
            height: size,
            background: color,
            x: '-50%',
            y: '-50%',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{
            x: `calc(-50% + ${tx}px)`,
            y: `calc(-50% + ${ty}px)`,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  );
}

// ─── Spinning ring (loading state) ──────────────────────────────────────────
function SpinnerRing() {
  return <Loader size={120} />;
}

// ─── Success circle + checkmark ─────────────────────────────────────────────
function SuccessRing() {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]"
      viewBox="0 0 120 120"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <defs>
        <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="url(#successGrad)" />
      {/* Checkmark drawn with path animation */}
      <motion.path
        d="M36 62 L52 78 L84 44"
        fill="none"
        stroke="white"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.svg>
  );
}

// ─── Error circle + X mark ──────────────────────────────────────────────────
function ErrorRing() {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]"
      viewBox="0 0 120 120"
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <defs>
        <linearGradient id="errorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="url(#errorGrad)" />
      {/* X - first stroke */}
      <motion.path
        d="M42 42 L78 78"
        fill="none"
        stroke="white"
        strokeWidth="6.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      />
      {/* X - second stroke */}
      <motion.path
        d="M78 42 L42 78"
        fill="none"
        stroke="white"
        strokeWidth="6.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.svg>
  );
}

// ─── Particles config ────────────────────────────────────────────────────────
const PARTICLE_COLORS = ['#34d399', '#6ee7b7', '#a7f3d0', '#fff', '#86efac'];
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  angle: (360 / 20) * i + Math.random() * 18 - 9,
  distance: 75 + Math.random() * 55,
  size: 3 + Math.random() * 5,
  color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  delay: Math.random() * 0.15,
}));

export default function EmailVerify() {
  const [particles, setParticles] = useState(false);

  const routeSearch = routeApi.useSearch();

  const router = useNavigate();

  const { setUser } = useMealJetStore((state) => state);

  const { isSuccess: isVerified, isLoading, data } = useVerifyEmail(routeSearch.token as string);

  // Derive phase from query states
  const phase: 'loading' | 'success' | 'error' = isLoading
    ? 'loading'
    : isVerified
      ? 'success'
      : 'error';

  // Fire particles shortly after success ring appears
  useEffect(() => {
    if (phase === 'success') {
      const t = setTimeout(() => setParticles(true), 300);

      if (routeSearch.context === 'login' && data?.data?.user) {
        setUser(data?.data?.user);
        notifications.show({
          loading: true,
          title: 'Redirecting...',
          message: 'Your email has been verified. You are being redirected to your dashboard.',
        });
        router({ to: '/dashboard/$userId', params: { userId: data.data.user.id } });
      }

      return () => clearTimeout(t);
    }
  }, [phase, routeSearch, data, setUser, router]);

  const isSuccess = phase === 'success';
  const isError = phase === 'error';
  const isDone = isSuccess || isError;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-light-pattern">
      {/* ── Ambient glow ── */}
      <motion.div
        className="pointer-events-none absolute h-150 w-150 rounded-full"
        style={{
          background: isError
            ? 'radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)',
        }}
        animate={{ opacity: isDone ? 1 : 0.25 }}
        transition={{ duration: 1 }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Icon container ── */}
      <div className="relative mb-10 h-30 w-30">
        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <Particle key={i} {...p} active={particles} />
        ))}

        {/* Ring states */}
        <AnimatePresence mode="wait">
          {phase === 'loading' && <SpinnerRing key="spinner" />}
          {phase === 'success' && <SuccessRing key="success" />}
          {phase === 'error' && <ErrorRing key="error" />}
        </AnimatePresence>
      </div>

      {/* ── Text content ── */}
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.p
            key="loading-label"
            className="text-xs uppercase tracking-[0.2em] text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            Verifying your email…
          </motion.p>
        )}

        {phase === 'success' && (
          <motion.div
            key="success-content"
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.h1
              className="mb-2 text-2xl font-bold tracking-tight text-emerald-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Email Verified
            </motion.h1>
            <motion.p
              className="mb-8 max-w-65 text-sm leading-relaxed text-slate-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Your account is all set. You can now sign in and get started.
            </motion.p>
            <motion.button
              className="rounded-xl bg-linear-to-br from-emerald-600 to-emerald-400 px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(52,211,153,0.35)] transition-shadow hover:shadow-[0_6px_32px_rgba(52,211,153,0.5)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router({ to: '/auth/login' })}
            >
              Continue to Sign In →
            </motion.button>
          </motion.div>
        )}

        {phase === 'error' && (
          <motion.div
            key="error-content"
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.h1
              className="mb-2 text-2xl font-bold tracking-tight text-red-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Verification Failed
            </motion.h1>
            <motion.p
              className="mb-8 max-w-65 text-sm leading-relaxed text-slate-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              This link is invalid or has expired. Request a new one below.
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <motion.button
                className="rounded-xl bg-linear-to-br from-red-600 to-red-400 px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(239,68,68,0.35)] transition-shadow hover:shadow-[0_6px_32px_rgba(239,68,68,0.5)]"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Resend Verification Email
              </motion.button>
              <button className="text-xs text-slate-500 underline underline-offset-4 hover:text-slate-300 transition-colors">
                Back to Sign In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
