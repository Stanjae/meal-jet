type Props = {
  name: string;
  children?: React.ReactNode;
};

// ─── Success screen ───────────────────────────────────────────────────────────
export function MJStepFormCompleted({ name, children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 relative overflow-hidden">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        style={{
          background: 'linear-gradient(135deg,#8dc158,#6aab36)',
          animation: 'scaleIn .5s ease both',
        }}
      >
        <svg
          width="44"
          height="36"
          viewBox="0 0 44 36"
          fill="none"
          style={{ animation: 'fadeIn .4s ease .3s both' }}
        >
          <path
            d="M4 18L17 31L40 4"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="50"
            strokeDashoffset="0"
            style={{ animation: 'checkmark .6s ease .4s both' }}
          />
        </svg>
      </div>

      <h2
        className="text-3xl font-extrabold text-gray-900 mb-2"
        style={{ animation: 'fadeUp .5s ease .3s both' }}
      >
        Welcome aboard, {name || 'rider'}! 🎉
      </h2>
      <p
        className="text-gray-400 max-w-xs leading-relaxed mb-8"
        style={{ animation: 'fadeUp .5s ease .4s both' }}
      >
        Your application has been submitted. Our team will review and approve you within{' '}
        <strong className="text-gray-700">24–48 hours</strong>.
      </p>

      {children && children}
    </div>
  );
}
