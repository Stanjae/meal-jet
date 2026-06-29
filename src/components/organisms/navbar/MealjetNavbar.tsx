import { Link } from '@tanstack/react-router';
import { Burger, Divider } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJDrawer from '@/components/atoms/drawer/MJDrawer';
import MJLogo from '@/components/atoms/logo/MJLogo';
import { HOMEPAGE_NAV_LINKS } from '@/lib/constants';
import DisplayAuthAvatar from '../auth/DisplayAuthAvatar';

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function MealjetNavbar() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const [scroll] = useWindowScroll();

  const scrolled = scroll.y > 20;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          style={{
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
            transform: scrolled ? 'translateY(20px)' : 'none',
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 rounded-[60px] flex items-center justify-between h-16 lg:h-20"
        >
          {/* Logo */}
          <MJLogo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {HOMEPAGE_NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 relative group"
              >
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: '#fc923a' }}
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <DisplayAuthAvatar />

          {/* Mobile burger */}
          <Burger opened={opened} onClick={toggle} className="lg:hidden" color="#fc923a" />
        </div>
      </header>

      {/* Mobile drawer */}
      <MJDrawer opened={opened} onClose={close} position="right" size="xs">
        <div className="flex flex-col gap-6 pt-4">
          {HOMEPAGE_NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={close}
              className="text-lg font-semibold text-gray-800 hover:text-orange-500 transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Divider my="sm" />
          <Link to="/auth/signup" onClick={close}>
            <MJButton fullWidth radius="xl">
              Get Started
            </MJButton>
          </Link>
        </div>
      </MJDrawer>
    </>
  );
}
