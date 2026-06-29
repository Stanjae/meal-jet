import { IconLogout } from '@tabler/icons-react';
import { Divider, Group, Stepper } from '@mantine/core';
import MJConfetti from '@/components/atoms/animation/MJConfetti';
import MJButton from '@/components/atoms/buttons/MJButton';
import MRingJLoader from '@/components/atoms/loader/MRingJLoader';
import MJFormFields from '@/components/molecules/forms/MJFormFields';
import { MJStepFormCompleted } from '@/components/molecules/forms/MJStepFormCompleted';
import { useCreateRider } from '@/lib/api/services';
import { useAuth, useRiderOnboardingForm } from '@/lib/hooks';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { transformFormFields } from '@/lib/utils/helpers/helpers';
import { RIDER_ONBOARDING_STEPS } from '@/lib/utils/schema';

type RiderStepFormProps = {
  isFormSubmitted: boolean;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const RiderStepForm = ({
  isFormSubmitted,
  setFormSubmitted,
  step,
  setStep,
}: RiderStepFormProps) => {
  const {
    STEP_FIELDS,
    form,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    handleSubmit,
    showConfetti,
    isLoading,
  } = useRiderOnboardingForm({
    isFormSubmitted,
    setFormSubmitted,
    activeStep: step,
    setActiveStep: setStep,
  });
  const user = useMealJetStore((state) => state.user);
  const { mutateAsync, isPending } = useCreateRider();

  const { handleLogout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MRingJLoader />
      </div>
    );
  }
  return (
    <section>
      {isFormSubmitted ? (
        <div>
          {showConfetti && <MJConfetti />}
          <MJStepFormCompleted
            name={user?.username as string}
            children={
              <div
                className="w-full max-w-xs space-y-3"
                style={{ animation: 'fadeUp .5s ease .5s both' }}
              >
                {[
                  {
                    icon: '📱',
                    title: 'Download the rider app',
                    sub: 'Available on iOS & Android',
                  },
                  {
                    icon: '📧',
                    title: 'Check your email',
                    sub: 'Approval notification coming soon',
                  },
                  {
                    icon: '💬',
                    title: 'Join our rider community',
                    sub: 'WhatsApp & Telegram groups',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: 'linear-gradient(135deg,#fff7ed,#ffedd5)' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.sub}</div>
                    </div>
                    <span className="ml-auto text-gray-300">→</span>
                  </div>
                ))}

                <MJButton
                  className="mt-8"
                  leftSection={<IconLogout />}
                  variant="light"
                  onClick={handleLogout}
                >
                  Logout
                </MJButton>
              </div>
            }
          />
        </div>
      ) : (
        <div className="flex-1 px-6 sm:px-10 lg:px-12 xl:px-16 py-8 w-full mx-auto">
          <Stepper size="sm" active={step}>
            {/* basic info */}
            <Stepper.Step label={RIDER_ONBOARDING_STEPS[0].label}>
              <div style={{ animation: 'fadeUp .45s ease both' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Personal information</h2>
                <p className="text-gray-400 text-sm mb-7">
                  Tell us about yourself — all info is kept private and secure.
                </p>
                <MJFormFields
                  disabledFields={['email']}
                  form={form}
                  fields={transformFormFields(STEP_FIELDS[0])}
                />
              </div>
            </Stepper.Step>
            <Stepper.Step label={RIDER_ONBOARDING_STEPS[1].label}>
              <div style={{ animation: 'fadeUp .45s ease both' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Vehicle and Documents</h2>
                <p className="text-gray-400 text-sm mb-7">
                  We need a few details about your vehicle and valid ID.
                </p>
                <MJFormFields form={form} fields={transformFormFields(STEP_FIELDS[1])} />
              </div>
            </Stepper.Step>
            <Stepper.Step label={RIDER_ONBOARDING_STEPS[2].label}>
              <div style={{ animation: 'fadeUp .45s ease both' }}>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Bank details</h2>
                <p className="text-gray-400 text-sm mb-7">
                  Where should we send your earnings? You can update this anytime in the rider app.
                </p>
                <MJFormFields form={form} fields={transformFormFields(STEP_FIELDS[2])} />
                <div
                  className="rounded-2xl p-5 space-y-3"
                  style={{
                    background: 'rgba(141,193,88,.07)',
                    border: '1.5px solid rgba(141,193,88,.2)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💸</span>
                    <span className="font-bold text-sm text-gray-800">How payouts work</span>
                  </div>
                  {[
                    'Earnings are calculated daily and paid weekly',
                    'Payouts are processed every Monday by 9am',
                    'Minimum payout threshold: ₦500',
                    'No fees deducted from your earnings',
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill="rgba(141,193,88,.3)" />
                        <path
                          d="M4 7L6.5 9.5L10 5"
                          stroke="#5a8a30"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
          <Divider my={20} />
          <Group mt={3} justify="end">
            {!isFirstStep && (
              <MJButton size="md" variant="subtle" onClick={prevStep}>
                Previous
              </MJButton>
            )}
            {!isLastStep && (
              <MJButton size="md" onClick={nextStep}>
                Next
              </MJButton>
            )}
            {isLastStep && (
              <MJButton loading={isPending} onClick={() => handleSubmit(mutateAsync)} size="md">
                Submit
              </MJButton>
            )}
          </Group>
        </div>
      )}
    </section>
  );
};

export default RiderStepForm;

/* 

            {!done ? (
              <MJConfetti />
            ) : (
              <>
                <StepTracker step={step} />

                {/* Step content
                {/* <div className="flex-1">
                  {step === 1 && <Step1 data={form} onChange={setField} errors={errors} />}
                  {step === 2 && <Step2 data={form} onChange={setField} errors={errors} />}
                  {step === 3 && <Step3 data={form} onChange={setField} errors={errors} />}
                  {step === 4 && <Step4 data={form} onChange={setField} errors={errors} />}
                  {step === 5 && <Step5 phone={form.phone} onVerified={() => setDone(true)} />}
                </div>

                {/* Nav buttons — hidden on step 5 (has its own button)
                {step < 5 && (
                  <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                    {step > 1 && (
                      <Button
                        onClick={handleBack}
                        radius="xl"
                        size="lg"
                        variant="default"
                        className="font-bold transition-all duration-200 hover:-translate-y-0.5"
                        style={{ border: '2px solid #f3f4f6', color: '#6b7280', minWidth: '100px' }}
                      >
                        ← Back
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      radius="xl"
                      size="lg"
                      fullWidth={step === 1}
                      className="font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                      style={{ background: '#fc923a', border: 'none', flex: 1 }}
                    >
                      {step === 4 ? 'Continue to verify →' : 'Continue →'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
*/
