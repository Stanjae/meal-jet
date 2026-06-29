import { Divider, Group, Paper, Stepper } from '@mantine/core';
import MJButton from '@/components/atoms/buttons/MJButton';
import MJFormArrayField from '@/components/molecules/forms/MJFormArrayField';
import MJFormFields from '@/components/molecules/forms/MJFormFields';
import { useCreateVendor } from '@/lib/api/services/vendor';
import { useVendorOnboardingForm } from '@/lib/hooks';
import { transformFormFields } from '@/lib/utils/helpers/helpers';
import { VENDOR_FORM_STEPS } from '@/lib/utils/schema';

const VendorStepForm = () => {
  const {
    activeStep,
    STEP_FIELDS,
    form,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    handleSubmit,
  } = useVendorOnboardingForm();

  const { mutateAsync, isPending } = useCreateVendor();

  const stepLabel = VENDOR_FORM_STEPS;
  return (
    <Paper px={20} py={40}>
      <Stepper active={activeStep}>
        {/* basic info */}
        <Stepper.Step label={stepLabel[0].label}>
          <MJFormFields form={form} fields={transformFormFields(STEP_FIELDS[0])} />
        </Stepper.Step>
        <Stepper.Step label={stepLabel[1].label}>
          <MJFormArrayField
            name="openingHours"
            form={form}
            fields={form.getValues().openingHours}
          />
        </Stepper.Step>
        <Stepper.Step label={stepLabel[2].label}>
          <MJFormFields form={form} fields={transformFormFields(STEP_FIELDS[2])} />
        </Stepper.Step>
        <Stepper.Step label={stepLabel[3].label}>
          <MJFormFields form={form} fields={transformFormFields(STEP_FIELDS[3])} />
        </Stepper.Step>
        <Stepper.Step label={stepLabel[4].label}>
          <MJFormFields form={form} fields={transformFormFields(STEP_FIELDS[4])} />
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
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
    </Paper>
  );
};

export default VendorStepForm;
