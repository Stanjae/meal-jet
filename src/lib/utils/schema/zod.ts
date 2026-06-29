import z from 'zod';
import { DAYS } from '@/lib/constants/vendor';

export const stringSchema = () => z.string();

export const emailSchema = () => z.email('Please enter a valid email address');

export const dobSchema = () =>
  z.coerce.date({
    error: 'Date of birth is required',
  });

export const passwordSchema = () =>
  z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

export const enumSchema = <T extends string[]>(list: T) => z.enum(list);

export const phoneSchema = () =>
  z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{7,14}$/, 'Enter a valid phone number (e.g. +2348012345678)');

export const accountNumberSchema = () =>
  stringSchema()
    .trim()
    .regex(/^\d{10}$/, 'Account number must be exactly 10 digits');

export const cloudinaryUrlSchema = z
  .url('Must be a valid URL')
  .refine((url) => url.includes('cloudinary.com'), {
    message: 'Image must be uploaded via Cloudinary',
  });

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const MB = 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const;

// ─────────────────────────────────────────
// BASE FACTORY
// ─────────────────────────────────────────
export function createFileSchema({
  maxSizeMB = 5,
  acceptedTypes,
  required = true,
}: {
  maxSizeMB?: number;
  acceptedTypes: readonly string[];
  required?: boolean;
}) {
  const base = z
    .instanceof(File, { message: 'Please select a file' })
    .refine((f) => f.size > 0, {
      message: 'File cannot be empty',
    })
    .refine((f) => f.size <= maxSizeMB * MB, {
      message: `File must not exceed ${maxSizeMB}MB`,
    })
    .refine((f) => (acceptedTypes as readonly string[]).includes(f.type), {
      message: `Accepted formats: ${acceptedTypes
        .map((t) => t.split('/')[1].toUpperCase())
        .join(', ')}`,
    });

  return required ? base : base.optional();
}
// ── Reusable helper ───────────────────────────────────────────────────────────
export const createFileOrStringSchema = ({
  maxSizeMB,
  acceptedTypes,
  required = false,
}: {
  maxSizeMB: number;
  acceptedTypes: readonly string[];
  required?: boolean;
}) =>
  z.union([
    // Existing URL (editing) — already uploaded
    z.string().url('Invalid image URL'),

    // New file upload
    z
      .instanceof(File)
      .refine((f) => !required || f.size > 0, { message: 'File is required' })
      .refine((f) => f.size <= maxSizeMB * 1024 * 1024, {
        message: `Max file size is ${maxSizeMB}MB`,
      })
      .refine((f) => acceptedTypes.includes(f.type), {
        message: `Accepted types: ${acceptedTypes.join(', ')}`,
      }),
  ]);

export const numberSchema = (error?: string) => z.coerce.number({ error });

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm 24-hour format

export const singleDaySchema = z
  .object({
    day: z.enum(DAYS.map((d) => d.value)),
    isClosed: z.boolean().default(false),
    openTime: z.string().regex(timeRegex, 'Use HH:mm format (e.g. 08:00)').optional(),
    closeTime: z.string().regex(timeRegex, 'Use HH:mm format (e.g. 22:00)').optional(),
  })
  .refine(
    (data) => {
      if (data.isClosed) return true;
      return !!data.openTime && !!data.closeTime;
    },
    { message: 'Open and close times are required when the restaurant is open' }
  )
  .refine(
    (data) => {
      if (data.isClosed || !data.openTime || !data.closeTime) return true;
      return data.openTime < data.closeTime;
    },
    { message: 'Opening time must be before closing time' }
  );

export const booleanSchema = () => z.boolean();
