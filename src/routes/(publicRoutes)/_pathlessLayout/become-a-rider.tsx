import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge } from '@mantine/core';
import { MJCountUp } from '@/components/atoms/animation/MJCountUp';
import { FadeUp } from '@/components/atoms/animation/MJFadeUp';
import MJButton from '@/components/atoms/buttons/MJButton';

export const Route = createFileRoute('/(publicRoutes)/_pathlessLayout/become-a-rider')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <main>
        <DriverHero />
        <EarningsStats />
        <Perks />
        <HowItWorks />
        <Requirements />
        <RiderTestimonials />
        {/* <ApplicationForm /> */}
        <DriverCTAStrip />
      </main>
    </div>
  );
}

const EARNINGS_STATS = [
  { num: 120000, suffix: '₦+', label: 'Avg monthly earnings', icon: '💰' },
  { num: 3000, suffix: '+', label: 'Active riders', icon: '🛵' },
  { num: 4, suffix: 'hrs', label: 'Min daily hours', icon: '⏰' },
  { num: 98, suffix: '%', label: 'On-time pay rate', icon: '✅' },
];

const PERKS = [
  {
    icon: '💸',
    title: 'Earn on your terms',
    desc: "Work whenever you want. No fixed shifts. Log in and start earning — it's that simple.",
    color: '#fc923a',
    bg: 'from-orange-50 to-amber-50',
  },
  {
    icon: '📈',
    title: 'Weekly bonuses',
    desc: 'Hit order targets and earn extra cash. Top riders make up to ₦180,000/month.',
    color: '#8dc158',
    bg: 'from-green-50 to-lime-50',
  },
  {
    icon: '⛽',
    title: 'Fuel allowance',
    desc: 'We contribute to your fuel costs on every delivery so your take-home stays high.',
    color: '#fc923a',
    bg: 'from-orange-50 to-red-50',
  },
  {
    icon: '🏥',
    title: 'Health coverage',
    desc: 'All riders get access to our rider health plan — because we look out for our own.',
    color: '#8dc158',
    bg: 'from-green-50 to-teal-50',
  },
  {
    icon: '📱',
    title: 'Easy rider app',
    desc: 'Our rider app is built for speed — accept orders, navigate, and get paid fast.',
    color: '#fc923a',
    bg: 'from-amber-50 to-yellow-50',
  },
  {
    icon: '🤝',
    title: 'Rider community',
    desc: 'Join a growing community of riders. Monthly meetups, tips, and peer support.',
    color: '#8dc158',
    bg: 'from-lime-50 to-green-50',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '📋',
    title: 'Apply online',
    desc: 'Fill in the form below. It takes less than 3 minutes. No lengthy paperwork.',
  },
  {
    step: '02',
    icon: '✅',
    title: 'Get verified',
    desc: 'We review your details and verify your ID and bike documents within 24 hours.',
  },
  {
    step: '03',
    icon: '📱',
    title: 'Download the app',
    desc: "Get the MealJet Rider app, complete your quick orientation, and you're ready.",
  },
  {
    step: '04',
    icon: '💰',
    title: 'Start earning',
    desc: 'Go live, pick up orders, and watch your earnings grow — paid out weekly.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Chidi O.',
    city: 'Lagos',
    text: 'I make more as a MealJet rider than I did at my old 9-5. And I control my own time.',
    emoji: '👨🏾',
    earnings: '₦145,000/mo',
  },
  {
    name: 'Sade A.',
    city: 'Abuja',
    text: 'The bonus system is real. I hit my first bonus in week two. Never looked back.',
    emoji: '👩🏾',
    earnings: '₦132,000/mo',
  },
  {
    name: 'Bello K.',
    city: 'Port Harcourt',
    text: 'Customer support actually picks up. Issues get resolved fast. Respect for riders is real here.',
    emoji: '🧑🏾',
    earnings: '₦118,000/mo',
  },
];

const REQUIREMENTS = [
  { icon: '🪪', text: "Valid government-issued ID (NIN, Voter's card, or Driver's licence)" },
  { icon: '🛵', text: 'Own a working motorcycle or bicycle' },
  { icon: '📄', text: 'Proof of vehicle ownership or usage rights' },
  { icon: '📱', text: 'A smartphone (Android 8+ or iOS 13+)' },
  { icon: '🔞', text: 'Be at least 18 years old' },
  { icon: '📍', text: 'Based in a city where MealJet operates' },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function DriverHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-8%] right-[-6%] w-120 h-120 rounded-full opacity-20 blur-3xl"
          style={{ background: '#fc923a' }}
        />
        <div
          className="absolute bottom-[-5%] left-[-5%] w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: '#8dc158' }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots-driver"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#374151" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-driver)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left copy */}
        <div>
          <div style={{ animation: 'fadeUp .55s ease both' }}>
            <Badge
              size="lg"
              radius="xl"
              className="mb-6"
              style={{
                background: 'rgba(141,193,88,.15)',
                color: '#5a8a30',
                border: 'none',
                fontSize: '0.8rem',
              }}
            >
              🛵 Rider programme
            </Badge>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-gray-900 mb-6"
            style={{ animation: 'fadeUp .7s ease .1s both' }}
          >
            Ride with us.{' '}
            <span className="relative inline-block" style={{ color: '#fc923a' }}>
              Earn more.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none">
                <path
                  d="M2 8 Q50 2 100 7 Q150 12 198 6"
                  stroke="#8dc158"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p
            className="text-lg text-gray-500 max-w-md mb-8 leading-relaxed"
            style={{ animation: 'fadeUp .7s ease .2s both' }}
          >
            Join 3,000+ MealJet riders earning good money on their own schedule. No boss, no fixed
            hours — just you, your ride, and real earnings.
          </p>

          {/* Earnings teaser */}
          <div
            className="inline-flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-8"
            style={{ animation: 'fadeUp .7s ease .3s both' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg,#fff7ed,#ffedd5)' }}
            >
              💰
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Riders earn on average</div>
              <div className="text-xl font-extrabold text-gray-900">
                ₦120,000 <span className="text-sm font-medium text-gray-400">/ month</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4" style={{ animation: 'fadeUp .7s ease .4s both' }}>
            <Link to="/auth/rider-signup">
              <MJButton
                size="lg"
                radius="xl"
                className="font-bold shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: '#fc923a', border: 'none' }}
              >
                Apply now — it's free 🚀
              </MJButton>
            </Link>
            <a href="#how-it-works">
              <MJButton
                size="lg"
                radius="xl"
                variant="outline"
                className="font-bold hover:-translate-y-0.5 transition-all duration-200"
                style={{ borderColor: '#e5e7eb', color: '#374151' }}
              >
                How it works
              </MJButton>
            </a>
          </div>
        </div>

        {/* Right — animated visual */}
        <div className="relative flex justify-center items-center min-h-110">
          {/* Main card */}
          <div
            className="relative z-10 bg-white rounded-3xl shadow-2xl p-5 w-64"
            style={{ animation: 'scaleIn .7s ease .3s both, float 4s ease-in-out 1.2s infinite' }}
          >
            <div
              className="w-full h-36 rounded-2xl flex items-center justify-center text-6xl mb-4"
              style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }}
            >
              🛵
            </div>
            <div className="font-bold text-gray-900">Rider Dashboard</div>
            <div className="text-xs text-gray-400 mt-0.5 mb-3">Today's earnings</div>
            <div className="text-3xl font-extrabold" style={{ color: '#8dc158' }}>
              ₦8,400
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-gray-400">12 deliveries</span>
              <span className="text-xs text-gray-300 mx-1">•</span>
              <span className="text-xs font-semibold" style={{ color: '#fc923a' }}>
                +₦600 bonus
              </span>
            </div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full" style={{ width: '80%', background: '#8dc158' }} />
            </div>
            <div className="text-xs text-gray-400 mt-1">80% to daily target</div>
          </div>

          {/* Floating — order ping */}
          <div
            className="absolute top-6 right-0 lg:right-2 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 z-20 max-w-40"
            style={{ animation: 'scaleIn .6s ease .5s both, float 3.8s ease-in-out 1.5s infinite' }}
          >
            <span className="text-2xl">📦</span>
            <div>
              <div className="text-xs font-bold text-gray-900">New order!</div>
              <div className="text-xs text-gray-400">0.8 km away</div>
            </div>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 relative"
              style={{ background: '#8dc158' }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: '#8dc158', animation: 'pulse-ring 1.8s ease-out infinite' }}
              />
            </span>
          </div>

          {/* Floating — rating */}
          <div
            className="absolute bottom-8 left-0 lg:left-2 bg-white rounded-2xl shadow-xl px-4 py-3 z-20"
            style={{ animation: 'scaleIn .6s ease .6s both, float 4.2s ease-in-out 1s infinite' }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-lg">⭐</span>
              <span className="font-extrabold text-gray-900">4.95</span>
              <span className="text-xs text-gray-400">rating</span>
            </div>
          </div>

          {/* Spinning ring */}
          <div
            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-dashed opacity-15"
            style={{ borderColor: '#8dc158', animation: 'spin-slow 18s linear infinite' }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Earnings Stats ───────────────────────────────────────────────────────────
function EarningsStats() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {EARNINGS_STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 80} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
                {s.suffix.startsWith('₦') ? (
                  <>
                    <span style={{ color: '#fc923a' }}>₦</span>
                    <MJCountUp end={s.num} suffix="+" />
                  </>
                ) : (
                  <MJCountUp end={s.num} suffix={s.suffix} />
                )}
              </div>
              <div className="text-sm text-gray-400 font-medium">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Perks ────────────────────────────────────────────────────────────────────
function Perks() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <FadeUp className="text-center mb-14">
        <Badge
          size="lg"
          radius="xl"
          className="mb-4"
          style={{ background: 'rgba(252,146,58,.12)', color: '#fc923a', border: 'none' }}
        >
          Why MealJet
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          More than just deliveries
        </h2>
        <p className="text-gray-400 mt-2 max-w-md mx-auto">
          We built a programme that actually works for riders, not just the platform
        </p>
      </FadeUp>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PERKS.map((p, i) => (
          <FadeUp key={p.title} delay={i * 70}>
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex gap-5">
              <div
                className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-2xl bg-linear-to-br ${p.bg} shadow-sm self-start`}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-16">
          <Badge
            size="lg"
            radius="xl"
            className="mb-4"
            style={{ background: 'rgba(141,193,88,.15)', color: '#5a8a30', border: 'none' }}
          >
            Getting started
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            4 steps to your first ride
          </h2>
          <p className="text-gray-400 mt-2 max-w-sm mx-auto">
            From application to first delivery in as little as 48 hours
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-gray-200 hidden lg:block" />

          {HOW_IT_WORKS.map((s, i) => (
            <FadeUp key={s.step} delay={i * 100} className="relative z-10">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-md"
                  style={{
                    background:
                      i % 2 === 0
                        ? 'linear-gradient(135deg,#fff7ed,#ffedd5)'
                        : 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
                  }}
                >
                  {s.icon}
                </div>
                <div
                  className="text-xs font-extrabold tracking-widest mb-2"
                  style={{ color: i % 2 === 0 ? '#fc923a' : '#8dc158' }}
                >
                  STEP {s.step}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Requirements ─────────────────────────────────────────────────────────────
function Requirements() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <Badge
            size="lg"
            radius="xl"
            className="mb-5"
            style={{ background: 'rgba(252,146,58,.12)', color: '#fc923a', border: 'none' }}
          >
            Requirements
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            What you'll need to get started
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We keep it simple. If you have a bike and a smartphone, you're most of the way there.
          </p>
          <div className="space-y-4">
            {REQUIREMENTS.map((r, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-lg shadow-sm"
                  style={{
                    background:
                      i % 2 === 0
                        ? 'linear-gradient(135deg,#fff7ed,#ffedd5)'
                        : 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
                  }}
                >
                  {r.icon}
                </div>
                <div className="text-gray-600 text-sm leading-relaxed pt-2">{r.text}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Visual */}
        <FadeUp delay={150} className="relative flex justify-center">
          <div className="relative">
            <div
              className="bg-white rounded-3xl shadow-2xl p-6 w-72"
              style={{ animation: 'float 4.5s ease-in-out infinite' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-gray-900">Application</div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold text-white"
                  style={{ background: '#8dc158' }}
                >
                  ✓ Approved
                </span>
              </div>
              <div className="space-y-3">
                {['Identity verified', 'Vehicle checked', 'Orientation done', 'Ready to ride'].map(
                  (step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                        style={{ background: '#8dc158' }}
                      >
                        ✓
                      </div>
                      <div className="text-sm text-gray-600">{step}</div>
                    </div>
                  )
                )}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <span className="text-sm font-semibold text-gray-800">You're live on MealJet!</span>
              </div>
            </div>

            <div
              className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 z-20 flex items-center gap-2"
              style={{ animation: 'float 3.5s ease-in-out 0.8s infinite' }}
            >
              <span className="text-xl">⚡</span>
              <div>
                <div className="text-xs font-bold text-gray-900">48hr approval</div>
                <div className="text-xs text-gray-400">usually faster</div>
              </div>
            </div>

            <div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-dashed opacity-15"
              style={{ borderColor: '#8dc158', animation: 'spin-slow 22s linear infinite' }}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Rider Testimonials ───────────────────────────────────────────────────────
function RiderTestimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-12">
          <Badge
            size="lg"
            radius="xl"
            className="mb-4"
            style={{ background: 'rgba(141,193,88,.15)', color: '#5a8a30', border: 'none' }}
          >
            Real riders
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Hear from our riders
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto">Real people, real earnings, real stories</p>
        </FadeUp>

        <div className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 90}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }}
                    >
                      {t.emoji}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.city}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold" style={{ color: '#8dc158' }}>
                      {t.earnings}
                    </div>
                    <div className="text-xs text-gray-400">avg/month</div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex mt-4 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Application Form ─────────────────────────────────────────────────────────
/* function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    vehicle: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Wire up to your API here
    setSubmitted(true);
  };

  const inputStyles = {
    input: {
      borderRadius: '12px',
      border: '2px solid #f3f4f6',
      fontSize: '0.9rem',
      transition: 'border-color .2s',
      '&:focus': { borderColor: '#fc923a' },
    },
    label: { fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px' },
  };

  return (
    <section id="apply" className="py-24 px-4 sm:px-6">
      <div
        className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg,#fc923a 0%,#f97316 60%,#ea580c 100%)' }}
      >
        <div
          className="absolute -top-15 -right-15 w-80 h-80 rounded-full opacity-15"
          style={{ background: '#fff' }}
        />
        <div
          className="absolute -bottom-10 left-[5%] w-48 h-48 rounded-full opacity-10"
          style={{ background: '#fff' }}
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-0">
          {/* Left — pitch
          <div className="p-10 lg:p-14 text-white flex flex-col justify-center">
            <FadeUp>
              <div
                className="text-5xl mb-6"
                style={{ animation: 'float 3.5s ease-in-out infinite' }}
              >
                🛵
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                Ready to start earning?
              </h2>
              <p className="opacity-80 leading-relaxed mb-8">
                Fill out the form and our team will reach out within 24 hours. No stress, no hassle.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '⚡', text: 'Approval in as little as 24 hours' },
                  { icon: '💸', text: 'Weekly payouts, no delays' },
                  { icon: '📞', text: 'Dedicated rider support line' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: 'rgba(255,255,255,.2)' }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm opacity-90">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — form
          <div className="bg-white p-8 lg:p-12 lg:rounded-r-[2.5rem]">
            {submitted ? (
              <FadeUp className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Application received!
                </h3>
                <p className="text-gray-400 max-w-xs leading-relaxed">
                  Our rider team will review your details and contact you within 24 hours. Get ready
                  to ride!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-semibold underline"
                  style={{ color: '#fc923a' }}
                >
                  Submit another application
                </button>
              </FadeUp>
            ) : (
              <FadeUp>
                <h3 className="text-xl font-extrabold text-gray-900 mb-6">Rider application</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="First name"
                      placeholder="Chidi"
                      required
                      styles={inputStyles}
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                    <TextInput
                      label="Last name"
                      placeholder="Okafor"
                      required
                      styles={inputStyles}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>

                  <TextInput
                    label="Phone number"
                    placeholder="080XXXXXXXX"
                    required
                    styles={inputStyles}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />

                  <TextInput
                    label="Email address"
                    placeholder="chidi@email.com"
                    type="email"
                    styles={inputStyles}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />

                  <Select
                    label="Your city"
                    placeholder="Select a city"
                    required
                    radius="md"
                    styles={inputStyles}
                    data={[
                      'Lagos',
                      'Abuja',
                      'Port Harcourt',
                      'Ibadan',
                      'Kano',
                      'Enugu',
                      'Benin City',
                      'Warri',
                    ]}
                    value={form.city}
                    onChange={(val) => setForm({ ...form, city: val as string })}
                  />

                  <Select
                    label="Vehicle type"
                    placeholder="What do you ride?"
                    required
                    radius="md"
                    styles={inputStyles}
                    data={['Motorcycle', 'Bicycle', 'Electric scooter', 'Car / Van']}
                    value={form.vehicle}
                    onChange={(val) => setForm({ ...form, vehicle: val as string })}
                  />

                  <Textarea
                    label="Anything else? (optional)"
                    placeholder="Tell us anything relevant about yourself or your experience..."
                    radius="md"
                    minRows={3}
                    styles={inputStyles}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />

                  <MJButton
                    type="submit"
                    fullWidth
                    size="lg"
                    radius="xl"
                    className="font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 mt-2"
                    style={{ background: '#fc923a', border: 'none' }}
                  >
                    Submit application 🚀
                  </MJButton>

                  <p className="text-xs text-center text-gray-400 mt-2">
                    By submitting, you agree to our{' '}
                    <Link to="/" className="underline hover:text-gray-600">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/" className="underline hover:text-gray-600">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} */

// ─── Final CTA strip ──────────────────────────────────────────────────────────
function DriverCTAStrip() {
  return (
    <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <FadeUp>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Still have questions?
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Our rider support team is available 7 days a week. Reach out — we're happy to help.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="mailto:riders@mealjet.com">
            <MJButton
              size="lg"
              radius="xl"
              className="font-bold hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#fc923a', border: 'none' }}
            >
              Email rider support
            </MJButton>
          </a>
          <Link to="/about">
            <MJButton
              size="lg"
              radius="xl"
              variant="outline"
              className="font-bold hover:-translate-y-0.5 transition-all duration-200"
              style={{ borderColor: '#8dc158', color: '#5a8a30' }}
            >
              Learn about MealJet
            </MJButton>
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
