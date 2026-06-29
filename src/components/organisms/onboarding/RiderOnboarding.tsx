import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import MJLogo from '@/components/atoms/logo/MJLogo';
import { LEFT_PANEL_SLIDES } from '@/lib/constants';
import { RIDER_ONBOARDING_STEPS } from '@/lib/utils/schema';
import RiderStepForm from '../forms/RiderStepForm';

// ─── Left panel — animated slides ────────────────────────────────────────────
function LeftPanel({ step }: { step: number }) {
  const slide = LEFT_PANEL_SLIDES[step];
  const [key, setKey] = useState(step);

  useEffect(() => {
    setKey(step);
  }, [step]);

  const perks = [
    'No setup fee, ever',
    'Weekly payouts',
    'Free health coverage',
    'Fuel allowance included',
    '24/7 rider support',
  ];

  return (
    <div
      className="hidden lg:flex flex-col justify-between h-full p-10 xl:p-14 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#fc923a 0%,#f97316 55%,#ea580c 100%)' }}
    >
      {/* Background decor */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-15"
        style={{ background: '#fff' }}
      />
      <div
        className="absolute -bottom-15 -left-10 w-48 h-48 rounded-full opacity-10"
        style={{ background: '#fff' }}
      />
      <div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full border-2 border-dashed opacity-20"
        style={{ borderColor: '#fff', animation: 'spin-slow 25s linear infinite' }}
      />
      {/* Dots */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots-left" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-left)" />
      </svg>

      {/* Logo */}
      <div className="relative z-10">
        <MJLogo mode="dark" />
      </div>

      {/* Slide content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-10" key={key}>
        <div
          className="text-6xl mb-6"
          style={{ animation: 'scaleIn .5s ease both, float 4s ease-in-out 0.5s infinite' }}
        >
          {slide.emoji}
        </div>

        <h2
          className="text-3xl xl:text-4xl font-extrabold text-white mb-4 leading-tight"
          style={{ animation: 'slideRight .5s ease .05s both' }}
        >
          {slide.headline}
        </h2>

        <p
          className="text-white/75 text-base leading-relaxed mb-8 max-w-xs"
          style={{ animation: 'slideRight .5s ease .12s both' }}
        >
          {slide.sub}
        </p>

        {/* Stat pill */}
        <div
          className="inline-flex items-center gap-3 bg-white/15 backdrop-blur rounded-2xl px-5 py-3 self-start mb-10"
          style={{ animation: 'fadeUp .5s ease .2s both' }}
        >
          <div className="text-white font-extrabold text-2xl">{slide.stat}</div>
          <div className="text-white/70 text-sm">{slide.statLabel}</div>
        </div>

        {/* Perks checklist */}
        <div className="space-y-2.5" style={{ animation: 'fadeUp .5s ease .28s both' }}>
          {perks.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,.25)' }}
              >
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white/80 text-sm">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step dots */}
      <div className="relative z-10 flex items-center gap-2">
        {RIDER_ONBOARDING_STEPS.map((s) => (
          <div
            key={s.step}
            className="rounded-full transition-all duration-400"
            style={{
              width: step === s.step ? '24px' : '8px',
              height: '8px',
              background: step === s.step ? '#fff' : 'rgba(255,255,255,.35)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Step progress bar (mobile) ───────────────────────────────────────────────
function MobileProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="lg:hidden px-6 pt-6 pb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-900">
          Step {step} of {total}
        </span>
        <span className="text-sm font-semibold" style={{ color: '#fc923a' }}>
          {RIDER_ONBOARDING_STEPS[step - 1]?.label}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(step / total) * 100}%`,
            background: 'linear-gradient(90deg,#fc923a,#f97316)',
          }}
        />
      </div>
    </div>
  );
}

const RiderOnboarding = () => {
  const [step, setStep] = useState(0);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const TOTAL_STEPS = RIDER_ONBOARDING_STEPS.length;
  const formRef = useRef(null);
  return (
    <div className="min-h-screen lg:h-screen bg-white font-sans antialiased flex flex-col lg:flex-row">
      {/* ── Left panel (desktop) ── */}
      <div className="lg:w-[42%] xl:w-[38%] lg:sticky lg:top-0 lg:h-full shrink-0">
        <LeftPanel step={isFormSubmitted ? TOTAL_STEPS : step} />
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col h-full lg:overflow-y-auto" ref={formRef}>
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 pt-6 pb-2">
          <MJLogo width={180} height={32} />
          <Link
            to="/become-a-rider"
            className="text-xs font-semibold text-gray-400 hover:text-gray-600"
          >
            ← Back
          </Link>
        </div>

        <MobileProgress step={isFormSubmitted ? TOTAL_STEPS : step} total={TOTAL_STEPS} />

        <RiderStepForm
          step={step}
          setStep={setStep}
          isFormSubmitted={isFormSubmitted}
          setFormSubmitted={setFormSubmitted}
        />
      </div>
    </div>
  );
};

export default RiderOnboarding;
