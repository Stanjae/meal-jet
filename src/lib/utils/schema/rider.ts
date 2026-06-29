import { z } from 'zod/v4';
import { RIDER_IDENTIFICATION_TYPES, riderStatus, VEHICLES_TYPE } from '@/lib/constants';
import {
  ACCEPTED_IMAGE_TYPES,
  accountNumberSchema,
  createFileSchema,
  dobSchema,
  emailSchema,
  enumSchema,
  phoneSchema,
  stringSchema,
} from './zod';

// ─────────────────────────────────────────
// STEP 1: Basic Info
// ─────────────────────────────────────────
export const RiderBasicInfoSchema = z.object({
  first_name: stringSchema()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must not exceed 100 characters')
    .trim(),

  last_name: stringSchema()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must not exceed 100 characters')
    .trim(),

  email: emailSchema(),

  phone: phoneSchema(),

  date_of_birth: dobSchema()
    .max(new Date(), 'Date of birth cannot be in the future')
    .refine(
      (date) => {
        return new Date().getFullYear() - new Date(date).getFullYear() >= 18;
      },
      { message: 'Rider should be at least 18 years of age' }
    ),

  profile_picture: createFileSchema({
    maxSizeMB: 2,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
  }),

  address: z.object({
    street: stringSchema()
      .min(5, 'Street address must be at least 5 characters')
      .max(200, 'Street address is too long')
      .trim(),

    formattedAddress: stringSchema()
      .min(5, 'Formatted address must be at least 5 characters')
      .max(200, 'Formatted address is too long')
      .trim(),

    city: stringSchema().min(2, 'City name must be at least 2 characters').max(100).trim(),

    state: stringSchema().min(2, 'State must be at least 2 characters').max(100).trim(),

    country: stringSchema().min(2, 'Country must be at least 2 characters').max(100).trim(),

    postalCode: stringSchema()
      .trim()
      .regex(/^[A-Z0-9\s]{3,10}$/i, 'Enter a valid postal code')
      .optional(),

    coordinates: z
      .object({
        lng: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
        lat: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
      })
      .refine(({ lng, lat }) => !(lng === 0 && lat === 0), {
        message: 'Please select a valid location on the map',
      }),
  }),
});

// ─────────────────────────────────────────
// STEP 3: Vehicle Details & Documents
// ─────────────────────────────────────────

export const RiderVehicleDetailsSchema = z.object({
  vehicle_type: enumSchema(VEHICLES_TYPE.map((v) => v.value)),
  vehicle_plate_no: stringSchema()
    //.min(2, 'Vehicle plate must be at least 2 characters')
    .max(10, 'Vehicle plate must not exceed 10 characters')
    //.regex(/^[A-Z0-9-]+$/i, 'Vehicle plate must contain only letters, numbers, or hyphens')
    .trim()
    .optional(),
  vehicle_document: createFileSchema({
    maxSizeMB: 2,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
  }).optional(), // Optional for bicycle riders
  proof_of_identification: createFileSchema({
    maxSizeMB: 2,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
  }),
  identification_type: enumSchema(RIDER_IDENTIFICATION_TYPES.map((t) => t.value)),
});
// ─────────────────────────────────────────
// STEP 3: Bank Details
// ─────────────────────────────────────────
export const RiderBankDetailsSchema = z.object({
  bankDetails: z.object({
    bankName: stringSchema().min(2, 'Bank name must be at least 2 characters').max(100).trim(),

    accountNumber: accountNumberSchema(),

    bankCode: stringSchema().optional(), // For future use with certain banks

    accountName: stringSchema()
      .min(3, 'Account name must be at least 3 characters')
      .max(150)
      .trim()
      .refine((val) => /^[a-zA-Z\s\-'.]+$/.test(val), {
        message: 'Account name must contain only letters, spaces, and common punctuation',
      }),
  }),
});

// ─────────────────────────────────────────
// FULL COMBINED SCHEMA (all steps merged)
// ─────────────────────────────────────────
export const fullRiderSchema = z.object({
  ...RiderBasicInfoSchema.shape,
  ...RiderVehicleDetailsSchema.shape,
  ...RiderBankDetailsSchema.shape,
  status: enumSchema(riderStatus).default('pending_approval'),
  referral: stringSchema().max(100).trim().optional(),
  agreeTerms: z.coerce.boolean().default(false),
  agreePrivacy: z.coerce.boolean().default(false),
  agreeMarketing: z.coerce.boolean().default(false),
});

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
export type RiderBasicInfoData = z.infer<typeof RiderBasicInfoSchema>;
export type RiderVehicleDetailsData = z.infer<typeof RiderVehicleDetailsSchema>;
export type RiderBankDetailsData = z.infer<typeof RiderBankDetailsSchema>;
export type FullRiderData = z.infer<typeof fullRiderSchema>;

// ─────────────────────────────────────────
// STEP MAP (for form wizard navigation)
// ─────────────────────────────────────────

export const RIDER_ONBOARDING_STEPS = [
  { step: 1, label: 'Personal info', icon: '👤', short: 'Personal', schema: RiderBasicInfoSchema },
  {
    step: 2,
    label: 'Vehicle & docs',
    icon: '🛵',
    short: 'Vehicle',
    schema: RiderVehicleDetailsSchema.superRefine((data, ctx) => {
      const isBicycle = data.vehicle_type === 'bicycle';

      console.log('>>> vehicle_type:', JSON.stringify(data.vehicle_type));
      console.log('>>> vehicle_plate_no:', JSON.stringify(data.vehicle_plate_no));
      console.log('>>> vehicle_document:', JSON.stringify(data.vehicle_document));

      if (!isBicycle && !data.vehicle_plate_no) {
        ctx.addIssue({
          code: 'custom',
          path: ['vehicle_plate_no'],
          message: 'Vehicle plate number is required for motorized vehicles',
        });
      }

      if (!isBicycle && !data.vehicle_document) {
        ctx.addIssue({
          code: 'custom',
          path: ['vehicle_document'],
          message: 'Vehicle document is required for motorized vehicles',
        });
      }
    }),
  },
  { step: 3, label: 'Bank details', icon: '🏦', short: 'Banking', schema: RiderBankDetailsSchema },
];
