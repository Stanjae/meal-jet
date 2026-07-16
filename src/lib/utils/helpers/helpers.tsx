import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { redirect } from '@tanstack/react-router';
import millify from 'millify';
import { TformTypes } from '@/lib/constants/formTypes';
import { useMealJetStore } from '@/lib/store/zustand.store';
import type { FormFieldType, MJTransformedFormField, UserType } from '@/lib/types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(calendar);

dayjs.tz.setDefault('Africa/Lagos');

export const newDayJs = (dateTime?: string) => dayjs(dateTime);

export function requireAuth() {
  const user = useMealJetStore.getState().user;

  if (!user) {
    throw redirect({ to: '/auth/login' });
  }

  return { user };
}

export function requireRole(role: UserType[]) {
  const user = useMealJetStore.getState().user;

  if (!user) {
    throw redirect({ to: '/auth/login' });
  }

  if (!role.includes(user.role)) {
    throw redirect({ to: '/dashboard/$userId', params: { userId: user.id } });
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

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function optimizeText(str: string, type?: 'reversed' | 'normal') {
  if (type === 'normal') {
    return str.toLowerCase().replace(/\s+/g, '-');
  } else if (type === 'reversed') {
    return str.toLowerCase().replace(/[-_]/g, ' ');
  } else {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}

/* function getDefault(fullPath: string): FieldDefault {
  if (fullPath in FIELD_DEFAULTS) return FIELD_DEFAULTS[fullPath];
  const key = fullPath.split(".").pop()!;
  if (key in FIELD_DEFAULTS) return FIELD_DEFAULTS[key];
  return "";
} */

export function transformFormFields(paths: string[]): MJTransformedFormField[] {
  const hasKids = new Set<string>([]);
  const parentChildMap = new Map<string, string[]>();

  // First pass — group children under their parents
  for (const path of paths) {
    if (path.includes('.')) {
      const [parent, child, child2] = path.split('.');
      if (!parentChildMap.has(parent)) {
        parentChildMap.set(parent, []);
      }
      parentChildMap.get(parent)!.push(child2 ? `${child}.${child2}` : child);
      hasKids.add(parent);
    }
  }

  // Second pass — build the array
  return paths.reduce((acc: MJTransformedFormField[], path) => {
    if (path.includes('.')) {
      const [parent] = path.split('.');

      if (hasKids.has(parent)) {
        hasKids.delete(parent);

        // Build children as an object instead of array
        const children = (parentChildMap.get(parent) ?? []).reduce(
          (obj, child) => {
            obj[child] = '';
            return obj;
          },
          {} as Record<string, unknown>
        );

        acc.push({
          title: capitalizeFirstLetter(optimizeText(parent, 'reversed')),
          name: parent,
          type: parent === 'address' ? 'addressSearch' : 'group',
          children,
        });
      }
    } else {
      acc.push({
        title: capitalizeFirstLetter(optimizeText(path, 'reversed')),
        type: TformTypes[path as keyof typeof TformTypes] as FormFieldType,
        name: path,
      });
    }

    return acc;
  }, []);
}

export function millifyDigits({
  num,
  isBytes = false,
}: {
  num: number;
  isBytes?: boolean;
}): string {
  return millify(num, {
    units: isBytes ? ['B', 'KB', 'MB', 'GB', 'TB'] : undefined,
    space: true,
  });
}

export function getCurrencySymbol(currency: 'USD' | 'EUR' | 'GBP' | 'NGN' = 'NGN'): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    NGN: '₦',
  };
  return symbols[currency] || '';
}

type FormDataPrimitive = string | number | boolean;

type FormDataValue =
  | FormDataPrimitive
  | File
  | Blob
  | FormDataValue[]
  | Date
  | { [key: string]: FormDataValue }
  | null
  | undefined;

type NestedObject = { [key: string]: FormDataValue };

const formatDateForFormData = (value: Date): string => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const isFile = (value: unknown): value is File =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  'size' in value &&
  'type' in value &&
  'lastModified' in value;

const isBlob = (value: unknown): value is Blob =>
  typeof value === 'object' &&
  value !== null &&
  'size' in value &&
  'type' in value &&
  typeof (value as Blob).arrayBuffer === 'function' &&
  !('name' in value); // blobs don't have a name, files do

export function transformToFormData(data: NestedObject): FormData {
  const formData = new FormData();

  const append = (key: string, value: FormDataValue) => {
    if (value === null || value === undefined) return;

    if (isFile(value)) {
      formData.append(key, value as File);
      return;
    }

    if (isBlob(value)) {
      formData.append(key, value as Blob);
      return;
    }

    if (Array.isArray(value)) {
      const filtered = value.filter((v) => v !== null && v !== undefined);

      if (filtered.length === 0) return;

      const hasObjectValues = filtered.some(
        (item) => typeof item === 'object' && !Array.isArray(item) && !isFile(item) && !isBlob(item)
      );

      if (hasObjectValues) {
        formData.append(key, JSON.stringify(filtered));
        return;
      }

      const hasBinaryValues = filtered.some((item) => isFile(item) || isBlob(item));
      if (hasBinaryValues) {
        for (const item of filtered) {
          if (isFile(item)) {
            formData.append(key, item);
            continue;
          }

          if (isBlob(item)) {
            formData.append(key, item);
            continue;
          }

          formData.append(`${key}[]`, String(item));
        }
        return;
      }

      filtered.forEach((item) => formData.append(`${key}[]`, String(item)));
      return;
    }

    if (typeof value === 'object') {
      if (value instanceof Date) {
        formData.append(key, formatDateForFormData(value));
        return;
      }

      formData.append(key, JSON.stringify(value));
      return;
    }

    // Primitive
    formData.append(key, String(value));
  };

  Object.entries(data).forEach(([key, value]) => append(key, value));

  return formData;
}

export function getDistanceInKmAndFees(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  baseDeliveryFee: number
) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const PER_KM_RATE = 150;

  const fee = baseDeliveryFee + distanceKm * PER_KM_RATE;

  return {
    distanceKm: distanceKm.toFixed(2),
    fee,
  };
}
