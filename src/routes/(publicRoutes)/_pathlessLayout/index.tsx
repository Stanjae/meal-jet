import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge, Button, TextInput } from '@mantine/core';
import { FadeUp } from '@/components/atoms/animation/MJFadeUp';
import { MJTestimonials } from '@/components/organisms/testimonial/MJTestimonial';

export const Route = createFileRoute('/(publicRoutes)/_pathlessLayout/')({
  component: Index,
});

function Index() {
  return (
    <div className=" bg-white font-sans antialiased relative">
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <FeaturedRestaurants />
        <HowItWorks />
        <AppBanner />
        <MJTestimonials />
        <CTASection />
      </main>
    </div>
  );
}

const CATEGORIES = [
  { icon: '🍔', label: 'Burgers' },
  { icon: '🍕', label: 'Pizza' },
  { icon: '🌮', label: 'Tacos' },
  { icon: '🍜', label: 'Noodles' },
  { icon: '🍣', label: 'Sushi' },
  { icon: '🥗', label: 'Salads' },
  { icon: '🍗', label: 'Chicken' },
  { icon: '🧆', label: 'African' },
];

const FEATURED = [
  {
    id: 1,
    name: 'Flame Grill House',
    cuisine: 'Burgers & Grills',
    rating: 4.8,
    time: '20–30 min',
    tag: 'Popular',
    tagColor: '#fc923a',
    emoji: '🍔',
    bg: 'from-orange-50 to-amber-50',
    accent: '#fc923a',
  },
  {
    id: 2,
    name: 'Green Bowl Co.',
    cuisine: 'Healthy & Vegan',
    rating: 4.7,
    time: '15–25 min',
    tag: 'New',
    tagColor: '#8dc158',
    emoji: '🥗',
    bg: 'from-green-50 to-lime-50',
    accent: '#8dc158',
  },
  {
    id: 3,
    name: 'Pizzeria Napoletana',
    cuisine: 'Wood-fired Pizza',
    rating: 4.9,
    time: '25–35 min',
    tag: 'Top Rated',
    tagColor: '#fc923a',
    emoji: '🍕',
    bg: 'from-red-50 to-orange-50',
    accent: '#fc923a',
  },
  {
    id: 4,
    name: 'Wok & Roll',
    cuisine: 'Asian Fusion',
    rating: 4.6,
    time: '20–30 min',
    tag: 'Fast',
    tagColor: '#8dc158',
    emoji: '🍜',
    bg: 'from-yellow-50 to-amber-50',
    accent: '#8dc158',
  },
];

const STEPS = [
  {
    step: '01',
    icon: '📍',
    title: 'Set your location',
    desc: "Enter your delivery address and we'll show you the best restaurants nearby.",
  },
  {
    step: '02',
    icon: '🍽️',
    title: 'Choose your meal',
    desc: "Browse menus, filter by cuisine, and pick exactly what you're craving.",
  },
  {
    step: '03',
    icon: '💳',
    title: 'Easy checkout',
    desc: 'Pay securely with card, wallet, or cash on delivery — your choice.',
  },
  {
    step: '04',
    icon: '🛵',
    title: 'Fast delivery',
    desc: 'Track your order live. Hot food arrives at your door in minutes.',
  },
];

const BRANDS = [
  '🍔 BurgerKing',
  '🍕 Dominos',
  '🍗 KFC',
  '🥗 SaladBar',
  '🌮 TacoHouse',
  '🍜 Noodle Palace',
  '🍣 Sushi Den',
  '🧆 Mama Put',
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const [address, setAddress] = useState('');

  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-120 lg:pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-10%] right-[-8%] w-130 h-130 rounded-full opacity-20 blur-3xl"
          style={{ background: '#fc923a' }}
        />
        <div
          className="absolute bottom-[-8%] left-[-6%] w-100 h-100 rounded-full opacity-15 blur-3xl"
          style={{ background: '#8dc158' }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-75 h-75 rounded-full opacity-10 blur-3xl"
          style={{ background: '#fbbf24' }}
        />
        {/* Dot pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#374151" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left copy */}
        <div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: 'rgba(252,146,58,.12)',
              color: '#fc923a',
              animation: 'fadeUp .6s ease forwards',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            Fast delivery, every time
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-gray-900 mb-6"
            style={{ animation: 'fadeUp .7s ease .1s both' }}
          >
            Delicious food,{' '}
            <span className="relative inline-block" style={{ color: '#fc923a' }}>
              delivered
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 220 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8 Q55 2 110 7 Q165 12 218 6"
                  stroke="#8dc158"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{' '}
            fast.
          </h1>

          <p
            className="text-lg text-gray-500 max-w-md mb-8 leading-relaxed"
            style={{ animation: 'fadeUp .7s ease .2s both' }}
          >
            Order from the best restaurants near you. Track your delivery in real‑time and get hot
            meals at your door.
          </p>

          {/* Search bar */}
          <div
            className="flex flex-col sm:flex-row gap-3 max-w-lg"
            style={{ animation: 'fadeUp .7s ease .3s both' }}
          >
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">📍</span>
              <TextInput
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address..."
                radius="xl"
                size="lg"
                styles={{
                  input: {
                    paddingLeft: '2.6rem',
                    fontSize: '0.95rem',
                    border: '2px solid #f3f4f6',
                    '&:focus': { borderColor: '#fc923a' },
                  },
                }}
              />
            </div>
            <Button
              size="lg"
              radius="xl"
              className="font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              style={{ background: '#fc923a', border: 'none', minWidth: 140 }}
            >
              Find Food 🍽️
            </Button>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-6 mt-10"
            style={{ animation: 'fadeUp .7s ease .4s both' }}
          >
            {[
              { num: '200+', label: 'Restaurants' },
              { num: '50K+', label: 'Happy customers' },
              { num: '25 min', label: 'Avg delivery' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-gray-900">{s.num}</div>
                <div className="text-sm text-gray-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating food cards */}
        <div className="relative flex justify-center items-center min-h-105">
          {/* Central big card */}
          <div
            className="relative z-10 bg-white rounded-3xl shadow-2xl p-5 w-64"
            style={{ animation: 'scaleIn .7s ease .3s both, float 3.8s ease-in-out 1.2s infinite' }}
          >
            <div
              className="w-full h-36 rounded-2xl flex items-center justify-center text-6xl mb-4"
              style={{ background: 'linear-gradient(135deg,#fff7ed,#ffedd5)' }}
            >
              🍔
            </div>
            <div className="font-bold text-gray-900 text-base">Double Smash Burger</div>
            <div className="text-sm text-gray-400 mt-0.5">Flame Grill House</div>
            <div className="flex items-center justify-between mt-3">
              <span className="font-extrabold text-lg" style={{ color: '#fc923a' }}>
                ₦3,500
              </span>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md transition-transform duration-150 hover:scale-110 active:scale-95"
                style={{ background: '#fc923a' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Floating mini card — top right */}
          <div
            className="absolute top-8 right-0 lg:right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 z-20"
            style={{ animation: 'scaleIn .7s ease .5s both, float 4.2s ease-in-out 1.5s infinite' }}
          >
            <span className="text-2xl">🛵</span>
            <div>
              <div className="text-xs font-bold text-gray-900">On its way!</div>
              <div className="text-xs text-gray-400">Est. 18 min</div>
            </div>
            {/* pulse ring */}
            <span
              className="w-2.5 h-2.5 rounded-full ml-1 relative"
              style={{ background: '#8dc158' }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: '#8dc158',
                  animation: 'pulse-ring 1.8s ease-out infinite',
                }}
              />
            </span>
          </div>

          {/* Floating mini card — bottom left */}
          <div
            className="absolute bottom-8 left-0 lg:left-4 bg-white rounded-2xl shadow-xl p-3 z-20"
            style={{ animation: 'scaleIn .7s ease .6s both, float 3.5s ease-in-out 1s infinite' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">⭐</span>
              <span className="text-sm font-extrabold text-gray-900">4.9</span>
            </div>
            <div className="text-xs text-gray-400 font-medium">2,400 reviews</div>
          </div>

          {/* Category pill — top left */}
          <div
            className="absolute top-16 left-0 lg:left-4 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg z-20"
            style={{
              background: '#8dc158',
              animation: 'scaleIn .7s ease .7s both, float 4.5s ease-in-out 2s infinite',
            }}
          >
            🥗 Healthy
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Brand Marquee ────────────────────────────────────────────────────────────
function Marquee() {
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <div className="bg-gray-50 border-y border-gray-100 py-4 overflow-hidden">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}
      >
        {doubled.map((b, i) => (
          <span key={i} className="text-gray-400 font-semibold text-sm tracking-wide">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────
function Categories() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <FadeUp>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 text-center">
          What are you craving?
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Pick a category and we'll find the best options near you
        </p>
      </FadeUp>
      <div className="flex flex-wrap gap-3 justify-center">
        {CATEGORIES.map((c, i) => (
          <FadeUp key={c.label} delay={i * 60}>
            <button
              onClick={() => setActive(i)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 border-2 hover:scale-105 active:scale-95 shadow-sm"
              style={
                active === i
                  ? {
                      background: '#fc923a',
                      color: '#fff',
                      borderColor: '#fc923a',
                      boxShadow: '0 6px 20px rgba(252,146,58,.35)',
                    }
                  : {
                      background: '#fff',
                      color: '#374151',
                      borderColor: '#f3f4f6',
                    }
              }
            >
              <span className="text-xl">{c.icon}</span>
              {c.label}
            </button>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── Featured Restaurants ─────────────────────────────────────────────────────
function FeaturedRestaurants() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
              Top restaurants
            </h2>
            <p className="text-gray-400">Handpicked favourites in your city</p>
          </div>
          <Link to="/auth/login">
            <Button variant="subtle" radius="xl" style={{ color: '#fc923a' }}>
              View all →
            </Button>
          </Link>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED.map((r, i) => (
            <FadeUp key={r.id} delay={i * 80}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                {/* Card image area */}
                <div
                  className={`relative h-40 bg-linear-to-br ${r.bg} flex items-center justify-center`}
                >
                  <span
                    className="text-6xl transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.1))' }}
                  >
                    {r.emoji}
                  </span>
                  <span
                    className="absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full shadow"
                    style={{ background: r.tagColor }}
                  >
                    {r.tag}
                  </span>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors duration-200">
                    ♡
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-0.5">{r.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{r.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-sm font-bold text-gray-800">{r.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span>🕐</span>
                      <span>{r.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <FadeUp className="text-center mb-16">
        <Badge
          size="lg"
          radius="xl"
          className="mb-4"
          style={{ background: 'rgba(141,193,88,.15)', color: '#5a8a30', border: 'none' }}
        >
          Simple steps
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">How MealJet works</h2>
        <p className="text-gray-400 mt-2 max-w-md mx-auto">
          From craving to doorstep in minutes — it really is that simple.
        </p>
      </FadeUp>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connecting dashed line (desktop only) */}
        <div
          className="absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-gray-200 hidden lg:block"
          style={{ zIndex: 0 }}
        />

        {STEPS.map((s, i) => (
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
    </section>
  );
}

// ─── App Download Banner ──────────────────────────────────────────────────────
function AppBanner() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div
        className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg,#fc923a 0%,#f97316 60%,#ea580c 100%)' }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-15 -right-15 w-72 h-72 rounded-full opacity-20"
          style={{ background: '#fff' }}
        />
        <div
          className="absolute -bottom-10 right-[10%] w-40 h-40 rounded-full opacity-10"
          style={{ background: '#fff' }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 sm:px-12 py-12">
          <FadeUp className="text-white max-w-lg">
            <div className="text-sm font-bold tracking-widest uppercase mb-3 opacity-80">
              📱 Get the app
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
              Order smarter with the MealJet app
            </h2>
            <p className="opacity-80 text-base leading-relaxed mb-6">
              Exclusive app deals, live tracking, and one-tap reorder. Available on iOS and Android.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2.5 bg-black text-white px-5 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-900 hover:scale-105 transition-all duration-200 shadow-xl">
                <span className="text-xl">🍎</span>
                <div className="text-left">
                  <div className="text-[10px] opacity-60 leading-none">Download on the</div>
                  <div className="text-sm font-bold leading-snug">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-2.5 bg-black text-white px-5 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-900 hover:scale-105 transition-all duration-200 shadow-xl">
                <span className="text-xl">▶️</span>
                <div className="text-left">
                  <div className="text-[10px] opacity-60 leading-none">Get it on</div>
                  <div className="text-sm font-bold leading-snug">Google Play</div>
                </div>
              </button>
            </div>
          </FadeUp>

          {/* Mock phone */}
          <FadeUp delay={150} className="shrink-0">
            <div
              className="w-52 h-96 rounded-[2.5rem] bg-white/10 backdrop-blur border-2 border-white/30 shadow-2xl relative overflow-hidden"
              style={{ animation: 'float 4s ease-in-out infinite' }}
            >
              <div className="absolute inset-2 rounded-4xl bg-white/90 flex flex-col items-center justify-center gap-3 p-4">
                <div className="text-4xl">🛵</div>
                <div className="text-sm font-bold text-gray-900 text-center">
                  Your order is on the way!
                </div>
                <div
                  className="w-full h-24 rounded-2xl flex items-center justify-center text-4xl"
                  style={{ background: 'linear-gradient(135deg,#fff7ed,#ffedd5)' }}
                >
                  🍔
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: '65%', background: '#fc923a' }}
                  />
                </div>
                <div className="text-xs text-gray-400">Arriving in ~12 min</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <FadeUp>
        <div
          className="text-6xl mb-6 inline-block"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          🍽️
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Ready to satisfy your <span style={{ color: '#fc923a' }}>cravings?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Join over 50,000 happy customers ordering their favourite meals with MealJet.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/auth/signup">
            <Button
              size="xl"
              radius="xl"
              className="font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200"
              style={{ background: '#fc923a', border: 'none', minWidth: 180 }}
            >
              Order now 🚀
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button
              size="xl"
              radius="xl"
              variant="outline"
              className="font-bold hover:-translate-y-1 transition-all duration-200"
              style={{ borderColor: '#8dc158', color: '#5a8a30', minWidth: 180 }}
            >
              Browse restaurants
            </Button>
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
