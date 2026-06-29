import MJLogo from '@/components/atoms/logo/MJLogo';
import { FOOTER_LINKS } from '@/lib/constants';

export function MJFooter() {
  return (
    <footer className="bg-gray-900 text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <MJLogo />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {import.meta.env.VITE_APP_DESCRIPTION}
            </p>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['𝕏', 'in', '📘', '📸'].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-sm text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
