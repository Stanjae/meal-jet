import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge, Button } from '@mantine/core';
import { MJCountUp } from '@/components/atoms/animation/MJCountUp';
import { FadeUp } from '@/components/atoms/animation/MJFadeUp';
import MJButton from '@/components/atoms/buttons/MJButton';

export const Route = createFileRoute('/(publicRoutes)/_pathlessLayout/about')({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <main>
        <AboutHero />
        <StatsBar />
        <OurStory />
        <OurValues />
        <Timeline />
        <Team />
        <AboutCTA />
      </main>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { num: 50000, suffix: '+', label: 'Happy customers', icon: '😊' },
  { num: 200, suffix: '+', label: 'Partner restaurants', icon: '🍽️' },
  { num: 25, suffix: ' min', label: 'Avg delivery time', icon: '🚀' },
  { num: 12, suffix: '', label: 'Cities covered', icon: '📍' },
];

const VALUES = [
  {
    icon: '⚡',
    title: 'Speed without compromise',
    desc: 'We obsess over delivery times so you never wait too long for a hot meal.',
    color: '#fc923a',
    bg: 'from-orange-50 to-amber-50',
  },
  {
    icon: '💚',
    title: 'Quality you can taste',
    desc: 'Every restaurant partner is vetted for food quality, hygiene, and consistency.',
    color: '#8dc158',
    bg: 'from-green-50 to-lime-50',
  },
  {
    icon: '🤝',
    title: 'Community first',
    desc: 'We invest in local restaurants and riders, creating real livelihoods in every city.',
    color: '#fc923a',
    bg: 'from-orange-50 to-red-50',
  },
  {
    icon: '🔒',
    title: 'Safe & reliable',
    desc: 'Secure payments, real-time tracking, and a support team that actually responds.',
    color: '#8dc158',
    bg: 'from-green-50 to-teal-50',
  },
];

const TEAM = [
  { name: 'Adaeze Nwosu', role: 'Co-founder & CEO', emoji: '👩🏾‍💼', color: '#fc923a' },
  { name: 'Kolade Adeyemi', role: 'Co-founder & CTO', emoji: '👨🏾‍💻', color: '#8dc158' },
  { name: 'Funmi Balogun', role: 'Head of Operations', emoji: '👩🏾‍🔧', color: '#fc923a' },
  { name: 'Emeka Okafor', role: 'Head of Growth', emoji: '👨🏾‍📊', color: '#8dc158' },
];

const MILESTONES = [
  {
    year: '2021',
    title: 'MealJet is born',
    desc: 'Founded in Lagos with 5 restaurant partners and a dream to fix food delivery in Nigeria.',
  },
  {
    year: '2022',
    title: 'First 10,000 orders',
    desc: 'Expanded to Abuja and Port Harcourt. Riders became the backbone of our mission.',
  },
  {
    year: '2023',
    title: 'Series A funding',
    desc: 'Raised ₦2B to invest in technology, logistics, and restaurant partnerships.',
  },
  {
    year: '2024',
    title: '50,000+ customers',
    desc: 'Now operating in 12 cities with 200+ restaurants and a world-class mobile app.',
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="relative min-h-[72vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: '#fc923a' }}
        />
        <div
          className="absolute bottom-[-5%] right-[-5%] w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: '#8dc158' }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots-about"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#374151" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-about)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 text-center">
        <div style={{ animation: 'fadeUp .6s ease both' }}>
          <Badge
            size="lg"
            radius="xl"
            className="mb-6"
            style={{
              background: 'rgba(252,146,58,.12)',
              color: '#fc923a',
              border: 'none',
              fontSize: '0.8rem',
            }}
          >
            🍊 Our story
          </Badge>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-gray-900 mb-6"
          style={{ animation: 'fadeUp .7s ease .1s both' }}
        >
          We're on a mission to{' '}
          <span className="relative inline-block" style={{ color: '#fc923a' }}>
            feed Africa
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 260 10" fill="none">
              <path
                d="M2 8 Q65 2 130 7 Q195 12 258 6"
                stroke="#8dc158"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
          , faster.
        </h1>

        <p
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: 'fadeUp .7s ease .2s both' }}
        >
          MealJet started with a simple frustration: great food, terrible delivery. We built the
          platform we always wanted — one that's fast, reliable, and actually works for restaurants,
          riders, and customers alike.
        </p>

        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ animation: 'fadeUp .7s ease .3s both' }}
        >
          <Link to="/auth/signup">
            <MJButton
              size="lg"
              radius="xl"
              className="font-bold shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#fc923a', border: 'none' }}
            >
              Start ordering 🚀
            </MJButton>
          </Link>
          <Link to="/become-a-rider">
            <MJButton
              size="lg"
              radius="xl"
              variant="outline"
              className="font-bold hover:-translate-y-0.5 transition-all duration-200"
              style={{ borderColor: '#8dc158', color: '#5a8a30' }}
            >
              Become a rider 🛵
            </MJButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
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

// ─── Story ────────────────────────────────────────────────────────────────────
function OurStory() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <FadeUp className="relative flex justify-center">
          <div className="relative">
            <div
              className="bg-white rounded-3xl shadow-2xl p-6 w-72 relative z-10"
              style={{ animation: 'float 4s ease-in-out infinite' }}
            >
              <div
                className="w-full h-44 rounded-2xl flex items-center justify-center text-6xl mb-4"
                style={{ background: 'linear-gradient(135deg,#fff7ed,#ffedd5)' }}
              >
                🛵
              </div>
              <div className="font-bold text-gray-900">On the way to you</div>
              <div className="text-sm text-gray-400 mt-1">Hot food, every time</div>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: '72%', background: '#fc923a' }} />
              </div>
              <div className="text-xs text-gray-400 mt-1.5">72% — arriving in ~8 min</div>
            </div>

            <div
              className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl px-4 py-3 z-20 flex items-center gap-2"
              style={{ animation: 'float 3.5s ease-in-out 0.5s infinite' }}
            >
              <span className="text-xl">🌍</span>
              <div>
                <div className="text-xs font-bold text-gray-900">12 cities</div>
                <div className="text-xs text-gray-400">& growing</div>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 z-20 flex items-center gap-2"
              style={{ animation: 'float 4.5s ease-in-out 1s infinite' }}
            >
              <span className="text-xl">⭐</span>
              <div>
                <div className="text-xs font-bold text-gray-900">4.8 / 5.0</div>
                <div className="text-xs text-gray-400">App rating</div>
              </div>
            </div>

            <div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-dashed opacity-20"
              style={{ borderColor: '#fc923a', animation: 'spin-slow 20s linear infinite' }}
            />
          </div>
        </FadeUp>

        {/* Text side */}
        <FadeUp delay={150}>
          <Badge
            size="lg"
            radius="xl"
            className="mb-5"
            style={{ background: 'rgba(141,193,88,.15)', color: '#5a8a30', border: 'none' }}
          >
            Our story
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
            Born from a bad delivery experience
          </h2>
          <div className="space-y-4 text-gray-500 leading-relaxed">
            <p>
              It was 2021. Our co-founders Adaeze and Kolade had ordered food for a team meeting in
              Lagos. Two hours later, cold jollof rice arrived. They laughed — then decided to fix
              it.
            </p>
            <p>
              MealJet launched with 5 restaurants, 8 riders, and one promise:{' '}
              <strong className="text-gray-800">hot food, on time, every time.</strong> Within six
              months, we had processed over 10,000 orders across Lagos alone.
            </p>
            <p>
              Today we're in 12 cities, partnered with 200+ restaurants, and powering livelihoods
              for thousands of riders. But the mission hasn't changed — make great food accessible
              to everyone.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────────────────────────────────
function OurValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-14">
          <Badge
            size="lg"
            radius="xl"
            className="mb-4"
            style={{ background: 'rgba(252,146,58,.12)', color: '#fc923a', border: 'none' }}
          >
            What drives us
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Our values</h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            The principles behind every delivery we make
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <FadeUp key={v.title} delay={i * 80}>
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-linear-to-br ${v.bg} shadow-sm`}
                >
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
      <FadeUp className="text-center mb-14">
        <Badge
          size="lg"
          radius="xl"
          className="mb-4"
          style={{ background: 'rgba(141,193,88,.15)', color: '#5a8a30', border: 'none' }}
        >
          Our journey
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">From idea to impact</h2>
      </FadeUp>

      <div className="relative">
        {/* Vertical spine */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-px" />

        <div className="space-y-10">
          {MILESTONES.map((m, i) => (
            <FadeUp key={m.year} delay={i * 100}>
              <div
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              >
                {/* Spine dot */}
                <div
                  className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md mt-5 z-10"
                  style={{ background: i % 2 === 0 ? '#fc923a' : '#8dc158' }}
                />

                {/* Year label — desktop */}
                <div
                  className={`hidden sm:flex flex-1 ${i % 2 === 0 ? 'justify-end pr-10' : 'justify-start pl-10'} items-start pt-3`}
                >
                  <span
                    className="text-sm font-extrabold px-4 py-1.5 rounded-full text-white shadow"
                    style={{ background: i % 2 === 0 ? '#fc923a' : '#8dc158' }}
                  >
                    {m.year}
                  </span>
                </div>

                {/* Card */}
                <div className={`flex-1 pl-16 sm:pl-0 ${i % 2 === 0 ? 'sm:pl-10' : 'sm:pr-10'}`}>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <span
                      className="text-xs font-extrabold sm:hidden mb-2 inline-block px-3 py-1 rounded-full text-white"
                      style={{ background: i % 2 === 0 ? '#fc923a' : '#8dc158' }}
                    >
                      {m.year}
                    </span>
                    <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{m.desc}</p>
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

// ─── Team ─────────────────────────────────────────────────────────────────────
function Team() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-12">
          <Badge
            size="lg"
            radius="xl"
            className="mb-4"
            style={{ background: 'rgba(252,146,58,.12)', color: '#fc923a', border: 'none' }}
          >
            The people
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Meet the team</h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            Passionate people building the future of food delivery in Africa
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((t, i) => (
            <FadeUp key={t.name} delay={i * 80}>
              <div className="bg-white rounded-3xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-md"
                  style={{
                    background:
                      t.color === '#fc923a'
                        ? 'linear-gradient(135deg,#fff7ed,#ffedd5)'
                        : 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
                  }}
                >
                  {t.emoji}
                </div>
                <div className="font-bold text-gray-900 mb-0.5">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
                <div
                  className="mt-3 w-8 h-1 rounded-full mx-auto"
                  style={{ background: t.color }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div
        className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg,#8dc158 0%,#6aab36 60%,#4d8a22 100%)' }}
      >
        <div
          className="absolute -top-15 -right-15 w-72 h-72 rounded-full opacity-20"
          style={{ background: '#fff' }}
        />
        <div
          className="absolute -bottom-10 left-[10%] w-40 h-40 rounded-full opacity-10"
          style={{ background: '#fff' }}
        />

        <div className="relative z-10 text-center text-white px-8 py-16">
          <div className="text-5xl mb-4" style={{ animation: 'float 3.5s ease-in-out infinite' }}>
            🤝
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Join the MealJet family</h2>
          <p className="opacity-80 max-w-md mx-auto mb-8 leading-relaxed">
            Whether you're a customer, restaurant, or rider — there's a place for you in the MealJet
            ecosystem.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/auth/signup">
              <Button
                size="lg"
                radius="xl"
                className="font-bold hover:scale-105 transition-transform duration-200"
                style={{ background: '#fff', color: '#5a8a30', border: 'none' }}
              >
                Order now 🍽️
              </Button>
            </Link>
            <Link to="/become-a-rider">
              <Button
                size="lg"
                radius="xl"
                variant="outline"
                className="font-bold hover:scale-105 transition-transform duration-200"
                style={{ borderColor: 'rgba(255,255,255,.5)', color: '#fff' }}
              >
                Become a rider 🛵
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
