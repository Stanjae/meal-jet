import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge } from '@mantine/core';
import { MJCountUp } from '@/components/atoms/animation/MJCountUp';
import { FadeUp } from '@/components/atoms/animation/MJFadeUp';
import MJButton from '@/components/atoms/buttons/MJButton';

export const Route = createFileRoute('/(publicRoutes)/_pathlessLayout/become-a-vendor')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <VendorHero />
      <VendorStats />
      <Benefits />
      <CommissionComparison />
      <HowItWorks />
      <VendorTestimonials />
      {/*       <VendorApplicationForm /> */}
      <VendorCTAStrip />
    </main>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const VENDOR_STATS = [
  { num: 200, suffix: '+', label: 'Active restaurants', icon: '🍽️' },
  { num: 50000, suffix: '+', label: 'Hungry customers', icon: '😋' },
  { num: 3, suffix: '%', label: 'Platform commission', icon: '💸' },
  { num: 12, suffix: '', label: 'Cities covered', icon: '📍' },
];

const BENEFITS = [
  {
    icon: '📈',
    title: 'Grow your revenue',
    desc: 'Tap into 50,000+ active customers who are already hungry and looking for your food. Most partners see 30–60% revenue growth in the first 3 months.',
    color: '#fc923a',
    bg: 'from-orange-50 to-amber-50',
  },
  {
    icon: '🖥️',
    title: 'Powerful vendor dashboard',
    desc: 'Manage your menu, track orders in real time, view analytics, and control your availability — all from one clean dashboard.',
    color: '#8dc158',
    bg: 'from-green-50 to-lime-50',
  },
  {
    icon: '💰',
    title: 'Fair, transparent fees',
    desc: 'Just 3% per order — no setup fees, no monthly charges, no surprises. Payouts hit your account weekly, every time.',
    color: '#fc923a',
    bg: 'from-orange-50 to-red-50',
  },
  {
    icon: '🛵',
    title: 'We handle delivery',
    desc: 'Our network of vetted riders handles every pickup and drop-off. You focus on cooking — we handle the logistics.',
    color: '#8dc158',
    bg: 'from-green-50 to-teal-50',
  },
  {
    icon: '📣',
    title: 'Marketing & visibility',
    desc: 'Get featured in search results, email campaigns, and push notifications to thousands of local customers — at no extra cost.',
    color: '#fc923a',
    bg: 'from-amber-50 to-yellow-50',
  },
  {
    icon: '🤝',
    title: 'Dedicated account manager',
    desc: 'Every MealJet vendor gets a dedicated account manager to help you optimise your menu, pricing, and performance.',
    color: '#8dc158',
    bg: 'from-lime-50 to-green-50',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '📋',
    title: 'Apply online',
    desc: 'Fill in the form below. No fees, no paperwork — just the basics about your business.',
  },
  {
    step: '02',
    icon: '✅',
    title: 'Onboarding call',
    desc: 'Our team schedules a 30-min call to walk you through setup, menu upload, and go-live checklist.',
  },
  {
    step: '03',
    icon: '🍽️',
    title: 'Upload your menu',
    desc: 'Add your dishes with photos, descriptions, and prices. Our team helps optimise for conversions.',
  },
  {
    step: '04',
    icon: '🚀',
    title: 'Go live & earn',
    desc: 'Your restaurant appears on MealJet. Orders start coming in — you cook, we deliver.',
  },
];

const TESTIMONIALS = [
  {
    name: "Mama Titi's Kitchen",
    owner: 'Titilayo A.',
    city: 'Lagos',
    emoji: '👩🏾‍🍳',
    text: 'I was sceptical at first, but within a month I had doubled my weekly revenue. MealJet customers are loyal and order regularly.',
    revenue: '+68% revenue',
  },
  {
    name: 'Spice Route',
    owner: 'Ahmed K.',
    city: 'Abuja',
    emoji: '👨🏾‍🍳',
    text: "The dashboard is so easy to use. I can see exactly what's selling, what's not, and adjust my menu in real time. Brilliant tool.",
    revenue: '+45% orders',
  },
  {
    name: 'The Burger Lab',
    owner: 'Seun O.',
    city: 'Port Harcourt',
    emoji: '🧑🏾‍🍳',
    text: "3% commission is genuinely the most competitive rate I've seen. Other platforms take 25–30%. MealJet actually wants us to profit.",
    revenue: '+52% revenue',
  },
];

const COMMISSION_COMPARE = [
  { platform: 'MealJet', rate: 3, highlight: true },
  { platform: 'Competitor A', rate: 25, highlight: false },
  { platform: 'Competitor B', rate: 30, highlight: false },
  { platform: 'Competitor C', rate: 28, highlight: false },
];

/* const CUISINE_OPTIONS = [
  'Nigerian / African',
  'Fast food / Burgers',
  'Pizza',
  'Chicken / Grills',
  'Seafood',
  'Healthy / Vegan',
  'Asian / Chinese',
  'Continental',
  'Pastries / Bakery',
  'Drinks / Smoothies',
  'Shawarma / Wraps',
  'Other',
];

const CITY_OPTIONS = [
  'Lagos',
  'Abuja',
  'Port Harcourt',
  'Ibadan',
  'Kano',
  'Enugu',
  'Benin City',
  'Warri',
  'Owerri',
  'Kaduna',
  'Other',
]; */

// ─── Hero ─────────────────────────────────────────────────────────────────────
function VendorHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-8%] right-[-6%] w-125 h-125 rounded-full opacity-20 blur-3xl"
          style={{ background: '#8dc158' }}
        />
        <div
          className="absolute bottom-[-5%] left-[-5%] w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: '#fc923a' }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots-vendor"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#374151" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-vendor)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left */}
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
              🍽️ Vendor programme
            </Badge>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-gray-900 mb-6"
            style={{ animation: 'fadeUp .7s ease .1s both' }}
          >
            Bring your{' '}
            <span className="relative inline-block" style={{ color: '#8dc158' }}>
              restaurant
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 240 10" fill="none">
                <path
                  d="M2 8 Q60 2 120 7 Q180 12 238 6"
                  stroke="#fc923a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{' '}
            online.
          </h1>

          <p
            className="text-lg text-gray-500 max-w-md mb-8 leading-relaxed"
            style={{ animation: 'fadeUp .7s ease .2s both' }}
          >
            Join 200+ restaurants already earning more with MealJet. Reach thousands of hungry
            customers, keep more of your revenue, and let us handle the delivery.
          </p>

          {/* Commission highlight */}
          <div
            className="inline-flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-8"
            style={{ animation: 'fadeUp .7s ease .3s both' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }}
            >
              💸
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Industry's lowest commission</div>
              <div className="text-xl font-extrabold text-gray-900">
                Just <span style={{ color: '#8dc158' }}>3%</span>{' '}
                <span className="text-sm font-medium text-gray-400">per order</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4" style={{ animation: 'fadeUp .7s ease .4s both' }}>
            <Link to="/auth/vendor-signup">
              <MJButton
                size="lg"
                radius="xl"
                className="font-bold shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: '#8dc158', border: 'none' }}
              >
                Partner with us 🚀
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

        {/* Right — animated vendor dashboard card */}
        <div className="relative flex justify-center items-center min-h-115">
          {/* Main dashboard card */}
          <div
            className="relative z-10 bg-white rounded-3xl shadow-2xl p-5 w-72"
            style={{ animation: 'scaleIn .7s ease .3s both, float 4s ease-in-out 1.2s infinite' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-bold text-gray-900 text-sm">Mama Titi's Kitchen</div>
                <div className="text-xs text-gray-400">Vendor dashboard</div>
              </div>
              <span
                className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: '#8dc158' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Today's orders", val: '34', icon: '📦', color: '#fc923a' },
                { label: 'Revenue today', val: '₦82k', icon: '💰', color: '#8dc158' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3"
                  style={{ background: s.color === '#fc923a' ? '#fff7ed' : '#f0fdf4' }}
                >
                  <div className="text-lg mb-1">{s.icon}</div>
                  <div className="text-xl font-extrabold" style={{ color: s.color }}>
                    {s.val}
                  </div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Top dishes today
            </div>
            {[
              { name: 'Jollof rice + chicken', pct: 82 },
              { name: 'Egusi soup + fufu', pct: 64 },
              { name: 'Puff puff (6pcs)', pct: 47 },
            ].map((d) => (
              <div key={d.name} className="mb-2.5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 truncate">{d.name}</span>
                  <span className="font-bold text-gray-800 ml-2">{d.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${d.pct}%`,
                      background: 'linear-gradient(90deg,#8dc158,#6aab36)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Floating — new order */}
          <div
            className="absolute top-6 right-0 lg:right-2 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 z-20"
            style={{ animation: 'scaleIn .6s ease .5s both, float 3.8s ease-in-out 1.5s infinite' }}
          >
            <span className="text-2xl">🔔</span>
            <div>
              <div className="text-xs font-bold text-gray-900">New order!</div>
              <div className="text-xs text-gray-400">₦4,200 · 2 items</div>
            </div>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 relative"
              style={{ background: '#fc923a' }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: '#fc923a', animation: 'pulse-ring 1.8s ease-out infinite' }}
              />
            </span>
          </div>

          {/* Floating — weekly payout */}
          <div
            className="absolute bottom-8 left-0 lg:left-2 bg-white rounded-2xl shadow-xl px-4 py-3 z-20"
            style={{ animation: 'scaleIn .6s ease .65s both, float 4.3s ease-in-out 1s infinite' }}
          >
            <div className="text-xs text-gray-400 mb-0.5">This week's payout</div>
            <div className="font-extrabold text-lg" style={{ color: '#8dc158' }}>
              ₦312,000
            </div>
          </div>

          {/* Spinning ring */}
          <div
            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-dashed opacity-15"
            style={{ borderColor: '#8dc158', animation: 'spin-slow 20s linear infinite' }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function VendorStats() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {VENDOR_STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 80} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">
                <MJCountUp end={s.num} suffix={s.suffix} />
              </div>
              <div className="text-sm text-gray-400 font-medium">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <FadeUp className="text-center mb-14">
        <Badge
          size="lg"
          radius="xl"
          className="mb-4"
          style={{ background: 'rgba(141,193,88,.15)', color: '#5a8a30', border: 'none' }}
        >
          Why MealJet
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Everything you need to grow
        </h2>
        <p className="text-gray-400 mt-2 max-w-md mx-auto">
          We built the tools restaurants actually need — not bloated features that get in the way
        </p>
      </FadeUp>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BENEFITS.map((b, i) => (
          <FadeUp key={b.title} delay={i * 70}>
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex gap-5">
              <div
                className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-2xl bg-linear-to-br ${b.bg} shadow-sm self-start`}
              >
                {b.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">{b.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── Commission Comparison ────────────────────────────────────────────────────
function CommissionComparison() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-12">
          <Badge
            size="lg"
            radius="xl"
            className="mb-4"
            style={{ background: 'rgba(252,146,58,.12)', color: '#fc923a', border: 'none' }}
          >
            Transparent pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            The numbers speak for themselves
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Other platforms take 25–30%. We charge 3%. That difference goes straight to you.
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="space-y-5">
              {COMMISSION_COMPARE.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-bold text-sm"
                        style={{ color: c.highlight ? '#8dc158' : '#9ca3af' }}
                      >
                        {c.platform}
                      </span>
                      {c.highlight && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
                          style={{ background: '#8dc158' }}
                        >
                          That's us ✓
                        </span>
                      )}
                    </div>
                    <span
                      className="font-extrabold text-sm"
                      style={{ color: c.highlight ? '#8dc158' : '#6b7280' }}
                    >
                      {c.rate}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(c.rate / 30) * 100}%`,
                        background: c.highlight
                          ? 'linear-gradient(90deg,#8dc158,#6aab36)'
                          : 'linear-gradient(90deg,#d1d5db,#9ca3af)',
                        boxShadow: c.highlight ? '0 0 12px rgba(141,193,88,.4)' : 'none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-8 p-4 rounded-2xl text-sm leading-relaxed"
              style={{ background: 'rgba(141,193,88,.08)', color: '#5a8a30' }}
            >
              💡 On ₦1,000,000 monthly revenue, MealJet costs you <strong>₦30,000</strong>.
              Competitor A costs you <strong>₦250,000</strong>. That's{' '}
              <strong>₦220,000 more in your pocket</strong> every month.
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <FadeUp className="text-center mb-16">
        <Badge
          size="lg"
          radius="xl"
          className="mb-4"
          style={{ background: 'rgba(252,146,58,.12)', color: '#fc923a', border: 'none' }}
        >
          Getting started
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Go live in 4 simple steps
        </h2>
        <p className="text-gray-400 mt-2 max-w-sm mx-auto">
          Most restaurants are live within 48 hours of applying
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
                      ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)'
                      : 'linear-gradient(135deg,#fff7ed,#ffedd5)',
                }}
              >
                {s.icon}
              </div>
              <div
                className="text-xs font-extrabold tracking-widest mb-2"
                style={{ color: i % 2 === 0 ? '#8dc158' : '#fc923a' }}
              >
                STEP {s.step}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── Vendor Testimonials ──────────────────────────────────────────────────────
function VendorTestimonials() {
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
            Partner stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            What our vendors say
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto">Real restaurants, real results</p>
        </FadeUp>

        <div className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 90}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: 'linear-gradient(135deg,#fff7ed,#ffedd5)' }}
                    >
                      {t.emoji}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400">
                        {t.owner} · {t.city}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold" style={{ color: '#8dc158' }}>
                      {t.revenue}
                    </div>
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
/* function VendorApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    cuisine: '',
    outlets: 1,
    website: '',
    description: '',
  });

  const inputStyles = {
    input: {
      borderRadius: '12px',
      border: '2px solid #f3f4f6',
      fontSize: '0.9rem',
      transition: 'border-color .2s',
      '&:focus': { borderColor: '#8dc158' },
    },
    label: { fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: '#374151' },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  };

  return (
    <section id="apply" className="py-16 px-4 sm:px-6">
      <div
        className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg,#8dc158 0%,#6aab36 60%,#4d8a22 100%)' }}
      >
        <div
          className="absolute -top-15 -right-15 w-80 h-80 rounded-full opacity-15"
          style={{ background: '#fff' }}
        />
        <div
          className="absolute -bottom-10 left-[8%] w-48 h-48 rounded-full opacity-10"
          style={{ background: '#fff' }}
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-0">
          {/* Left pitch 
          <div className="p-10 lg:p-14 text-white flex flex-col justify-center">
            <FadeUp>
              <div
                className="text-5xl mb-6"
                style={{ animation: 'float 3.5s ease-in-out infinite' }}
              >
                🍽️
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                Ready to grow with MealJet?
              </h2>
              <p className="opacity-80 leading-relaxed mb-8">
                Fill in the form and our vendor team will be in touch within 24 hours to get you
                onboarded.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '⚡', text: 'Live within 48 hours of approval' },
                  { icon: '💰', text: 'Weekly payouts, zero delays' },
                  { icon: '📊', text: 'Full analytics dashboard from day one' },
                  { icon: '🤝', text: 'Dedicated account manager assigned' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
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

          {/* Right form 
          <div className="bg-white p-8 lg:p-12 lg:rounded-r-[2.5rem]">
            {submitted ? (
              <FadeUp className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Application submitted!
                </h3>
                <p className="text-gray-400 max-w-xs leading-relaxed">
                  Our vendor team will review your application and reach out within 24 hours. Get
                  ready to go live!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-semibold underline"
                  style={{ color: '#8dc158' }}
                >
                  Submit another application
                </button>
              </FadeUp>
            ) : (
              <FadeUp>
                <h3 className="text-xl font-extrabold text-gray-900 mb-6">
                  Restaurant application
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <TextInput
                    label="Restaurant name"
                    placeholder="Mama Titi's Kitchen"
                    required
                    styles={inputStyles}
                    value={form.restaurantName}
                    onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Owner / manager name"
                      placeholder="Titilayo Adeyemi"
                      required
                      styles={inputStyles}
                      value={form.ownerName}
                      onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    />
                    <TextInput
                      label="Phone number"
                      placeholder="080XXXXXXXX"
                      required
                      styles={inputStyles}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <TextInput
                    label="Email address"
                    placeholder="restaurant@email.com"
                    type="email"
                    required
                    styles={inputStyles}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="City"
                      placeholder="Select city"
                      required
                      radius="md"
                      styles={inputStyles}
                      data={CITY_OPTIONS}
                      value={form.city}
                      onChange={(val) => setForm({ ...form, city: val as string })}
                    />
                    <Select
                      label="Cuisine type"
                      placeholder="Select type"
                      required
                      radius="md"
                      styles={inputStyles}
                      data={CUISINE_OPTIONS}
                      value={form.cuisine}
                      onChange={(val) => setForm({ ...form, cuisine: val as string })}
                    />
                  </div>

                  <NumberInput
                    label="Number of outlets"
                    placeholder="1"
                    min={1}
                    max={50}
                    required
                    radius="md"
                    styles={inputStyles}
                    value={form.outlets}
                    onChange={(val) => setForm({ ...form, outlets: val as number })}
                  />

                  <TextInput
                    label="Website or Instagram (optional)"
                    placeholder="https:// or @yourhandle"
                    styles={inputStyles}
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />

                  <Textarea
                    label="Tell us about your restaurant"
                    required
                    placeholder="What kind of food do you serve? What makes you special? Any context that helps us understand your brand."
                    radius="md"
                    minRows={3}
                    styles={inputStyles}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />

                  <Checkbox
                    checked={agreed}
                    onChange={(e) => setAgreed(e.currentTarget.checked)}
                    color="green"
                    label={
                      <span className="text-xs text-gray-500">
                        I agree to MealJet's{' '}
                        <Link
                          to="/"
                          className="underline font-semibold"
                          style={{ color: '#8dc158' }}
                        >
                          Vendor Terms
                        </Link>{' '}
                        and{' '}
                        <Link
                          to="/"
                          className="underline font-semibold"
                          style={{ color: '#8dc158' }}
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    }
                  />

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    radius="xl"
                    disabled={!agreed}
                    className="font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                    style={{ background: agreed ? '#8dc158' : '#d1d5db', border: 'none' }}
                  >
                    Submit application 🍽️
                  </Button>
                </form>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 
*/
// ─── Final CTA ────────────────────────────────────────────────────────────────
function VendorCTAStrip() {
  return (
    <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <FadeUp>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Have questions before applying?
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Our vendor team is happy to walk you through everything. No commitment required.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="mailto:vendors@mealjet.com">
            <MJButton
              size="lg"
              radius="xl"
              className="font-bold hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#8dc158', border: 'none' }}
            >
              Email vendor team
            </MJButton>
          </a>
          <Link to="/">
            <MJButton
              size="lg"
              radius="xl"
              variant="outline"
              className="font-bold hover:-translate-y-0.5 transition-all duration-200"
              style={{ borderColor: '#fc923a', color: '#c4691a' }}
            >
              Visit support centre
            </MJButton>
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
