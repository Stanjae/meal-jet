import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import riderClient from '../api/clients/rider';
import { initialRiderOnboardingValues, riderStatus } from '../constants';
import { useMealJetStore } from '../store/zustand.store';
import type { TCreateVendorResponse } from '../types/api/vendor.types';
import { transformToFormData } from '../utils/helpers/helpers';
import { fullRiderSchema, RIDER_ONBOARDING_STEPS, type FullRiderData } from '../utils/schema';

type FieldPath = Parameters<ReturnType<typeof useForm>['validateField']>[0];

const STEP_FIELDS: Record<number, FieldPath[]> = {
  0: [
    'first_name',
    'last_name',
    'phone',
    'email',
    'date_of_birth',
    'address.street',
    'address.city',
    'address.formattedAddress',
    'address.state',
    'address.country',
    'address.postalCode',
    'address.coordinates',
    'profile_picture',
  ],
  1: [
    'vehicle_type',
    'vehicle_plate_no',
    'vehicle_document',
    'identification_type',
    'proof_of_identification',
  ],
  2: ['bankDetails.bankName', 'bankDetails.accountNumber', 'bankDetails.accountName'],
};

type Props = {
  isFormSubmitted: boolean;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function useRiderOnboardingForm({
  setFormSubmitted,
  activeStep,
  setActiveStep,
}: Props) {
  const totalSteps = RIDER_ONBOARDING_STEPS.length;

  const user = useMealJetStore((state) => state.user);

  const navigate = useNavigate();

  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const form = useForm<FullRiderData>({
    mode: 'uncontrolled',
    initialValues: initialRiderOnboardingValues,
    validate: zod4Resolver(fullRiderSchema),
  });

  async function checkRiderApprovalStatus() {
    try {
      setIsloading(true);
      const response = await riderClient.checkRiderApprovalStatus();
      if (response?.data?.status === null) {
        setFormSubmitted(false);
      }
      if (response?.data?.status === riderStatus[0]) {
        setFormSubmitted(true);
      }
      if (response?.data?.status === riderStatus[1]) {
        navigate({ to: '/dashboard/$userId', params: { userId: user?.id as string } });
        return;
      }
    } catch (err) {
      console.error('Error checking rider approval status:', err);
      setFormSubmitted(false);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    checkRiderApprovalStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      try {
        await onSuccess(transformedFormData);
        setFormSubmitted(true);
        setShowConfetti(true);
      } catch (e) {
        console.error('Error submitting rider onboarding form:', e);
      }
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
    currentStepLabel: RIDER_ONBOARDING_STEPS[activeStep]?.label || '',
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === totalSteps - 1,
    STEP_FIELDS,
    showConfetti,
    isLoading,
  };
}
