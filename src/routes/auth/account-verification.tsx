import { createFileRoute } from '@tanstack/react-router';
import z4 from 'zod/v4';
import EmailVerified from '@/components/organisms/auth/EmailVerified';

const tokenSchema = z4.object({
  token: z4.string().catch(''),
  context: z4.string().catch(''),
});

type VerificationToken = z4.infer<typeof tokenSchema>;
export const Route = createFileRoute('/auth/account-verification')({
  component: RouteComponent,
  validateSearch: (search): VerificationToken => tokenSchema.parse(search),
});

function RouteComponent() {
  return (
    <div>
      <EmailVerified />
    </div>
  );
}
