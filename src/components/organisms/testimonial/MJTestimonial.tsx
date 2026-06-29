import { Rating } from '@mantine/core';
import { FadeUp } from '@/components/atoms/animation/MJFadeUp';
import { TESTIMONIALS } from '@/lib/mock';

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function MJTestimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
              Loved by thousands
            </h2>
            <p className="text-gray-400">
              Don't take our word for it — here's what our customers say
            </p>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 100}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <Rating value={t.stars} readOnly size="sm" color="#fc923a" className="mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: '#fff7ed' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.city}</div>
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
