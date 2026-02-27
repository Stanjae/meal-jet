import { createFileRoute } from '@tanstack/react-router';
import { Button, Paper } from '@mantine/core';
import { useCountdownTimer } from '@/lib/hooks';

export const Route = createFileRoute('/auth/verify-now')({
  component: RouteComponent,
});

function RouteComponent() {
  const { timeLeft, formatTime, isActive, handleResendToken } = useCountdownTimer({ minutes: 5 });
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-light-pattern">
      <Paper
        shadow="md"
        className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg w-full max-w-md"
      >
        <h1>A Verification Link has been sent to your email</h1>
        <p>Please check your inbox and click the link to verify your account.</p>
        <div>{formatTime(timeLeft)}</div>
        <Button disabled={isActive} onClick={handleResendToken}>
          Resend Verification
        </Button>
      </Paper>
    </div>
  );
}
