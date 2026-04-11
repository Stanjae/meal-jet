// restaurant-form.ts
import { useState } from 'react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { initialVendorOnboardingValues } from '../constants';
import type { TCreateVendorResponse } from '../types/api/vendor.types';
import { transformToFormData } from '../utils/helpers/helpers';
import { fullRestaurantSchema, VENDOR_FORM_STEPS, type FullRestaurantData } from '../utils/schema';

// ─────────────────────────────────────────
// FIELD PATHS PER STEP
// Used to validate only the current step's
// fields without validating the whole form.
// ─────────────────────────────────────────
type FieldPath = Parameters<ReturnType<typeof useForm>['validateField']>[0];

const STEP_FIELDS: Record<number, FieldPath[]> = {
  0: [
    'name',
    'phone',
    'description',
    'cuisineTypes',
    'tags',
    'address.street',
    'address.city',
    'address.formattedAddress',
    'address.state',
    'address.country',
    'address.postalCode',
    'address.coordinates',
    'logo',
    'coverImage',
  ],
  1: [
    'openingHours.0.openTime',
    'openingHours.0.closeTime',
    'openingHours.1.openTime',
    'openingHours.1.closeTime',
    'openingHours.2.openTime',
    'openingHours.2.closeTime',
    'openingHours.3.openTime',
    'openingHours.3.closeTime',
    'openingHours.4.openTime',
    'openingHours.4.closeTime',
    'openingHours.5.openTime',
    'openingHours.5.closeTime',
    'openingHours.6.openTime',
    'openingHours.6.closeTime',
  ],
  2: ['proof_of_registration', 'proof_of_identification'],
  3: ['avgPrepTime', 'minOrderAmount', 'baseDeliveryFee', 'commissionRate'],
  4: ['bankDetails.bankName', 'bankDetails.accountNumber', 'bankDetails.accountName'],
};

export function useVendorOnboardingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = VENDOR_FORM_STEPS.length;

  const form = useForm<FullRestaurantData>({
    mode: 'uncontrolled', // better perf — Mantine re-renders only on submit/validate
    initialValues: initialVendorOnboardingValues,
    validate: zod4Resolver(fullRestaurantSchema),
  });

  // Validate only the current step's fields before moving forward
  function nextStep() {
    const fields = STEP_FIELDS[activeStep];
    const results = fields.map((field) => form.validateField(field));
    const hasErrors = results.some((r) => r.hasError);

    if (!hasErrors) {
      setActiveStep((s) => Math.min(s + 1, totalSteps));
    }
  }

  function prevStep() {
    setActiveStep((s) => Math.max(s - 1, 0));
  }

  function goToStep(step: number) {
    setActiveStep(step);
  }

  async function handleSubmit(onSuccess: (data: FormData) => Promise<TCreateVendorResponse>) {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      const transformedFormData = transformToFormData(form.getValues());
      await onSuccess(transformedFormData);
    }
  }

  return {
    form,
    activeStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    handleSubmit,
    currentStepLabel: VENDOR_FORM_STEPS[activeStep]?.label || '',
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === totalSteps - 1,
    STEP_FIELDS,
  };
}
