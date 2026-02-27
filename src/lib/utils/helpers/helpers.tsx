// src/lib/auth/authGuard.ts
import { redirect } from '@tanstack/react-router';
import { useMealJetStore } from '@/lib/store/zustand.store';

export function requireAuth() {
  const user = useMealJetStore.getState().user;

  if (!user) {
    throw redirect({ to: '/auth/login' });
  }

  return { user };
}

export function requireRole(role: 'customer' | 'restaurant_owner' | 'driver') {
  const user = useMealJetStore.getState().user;

  if (!user) {
    throw redirect({ to: '/auth/login' });
  }

  if (user.role !== role) {
    throw redirect({ to: '/dashboard/' + user.id });
  }

  return { user };
}

export function formatCurrency(
  amount: number,
  currency: 'USD' | 'EUR' | 'GBP' | 'NGN' = 'NGN',
  locale: 'en-US' | 'de-DE' | 'en-GB' | 'en-NG' = 'en-NG'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
