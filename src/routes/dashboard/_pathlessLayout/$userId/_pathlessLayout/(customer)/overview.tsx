import { IconMapPin } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Grid, Image } from '@mantine/core';
import girlGoofing from '@/assets/girl-goofing.jpg';
import MJButton from '@/components/atoms/buttons/MJButton';
import CustomerWallet from '@/components/organisms/wallet/CustomerWallet';
import { useMealJetStore } from '@/lib/store/zustand.store';
import { UserType } from '@/lib/types';
import { requireRole } from '@/lib/utils/helpers/helpers';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/overview'
)({
  component: RouteComponent,
  beforeLoad: () => requireRole([UserType.CUSTOMER]),
});

function RouteComponent() {
  const user = useMealJetStore((state) => state.user);
  return (
    <div className=" py-7 pr-7 pl-3.5">
      <Grid>
        <Grid.Col span={7}>
          <div className=" space-y-3">
            <section>
              <div className=" flex items-center justify-between mb-2">
                <h2 className=" text-lg font-semibold">Category</h2>
                <Link
                  className="text-primary text-xs"
                  params={{ userId: user?.id as string }}
                  to={'/dashboard/$userId'}
                >
                  View All
                </Link>
              </div>
            </section>

            <section>
              <div className=" flex items-center justify-between mb-2">
                <h2 className=" text-lg font-semibold">Popular Dishes</h2>
                <Link
                  className="text-primary text-xs"
                  params={{ userId: user?.id as string }}
                  to={'/dashboard/$userId'}
                >
                  View All
                </Link>
              </div>
            </section>

            <section>
              <div className=" flex items-center justify-between mb-2">
                <h2 className=" text-lg font-semibold">Recent Orders</h2>
                <Link
                  className="text-primary text-xs"
                  params={{ userId: user?.id as string }}
                  to={'/dashboard/$userId'}
                >
                  View All
                </Link>
              </div>
            </section>
          </div>
        </Grid.Col>
        <Grid.Col className="space-y-5" span={5}>
          <div className=" border border-primary bg-primary/5 rounded-[9.5px] p-5">
            <h4 className=" font-semibold text-lg">Your Balance</h4>

            <CustomerWallet />

            <section className=" my-5">
              <p className="text-xs text-primary">Your address</p>
              <div className=" flex justify-between">
                <div className="flex items-center gap-1">
                  <IconMapPin className="text-primary" />
                  <span className="font-semibold text-[17.5px]">Abuja, Nigeria</span>
                </div>
                <MJButton size="xs" variant="outline">
                  Change
                </MJButton>
              </div>
              <p className=" text-xs">Your address will be used for delivery</p>
            </section>

            <MJButton>Add Notes</MJButton>
          </div>

          <section className="bg-primary blance-card rounded-lg">
            <div className="flex justify-between items-center pt-2.5 pl-5 text-white">
              <div>
                <h4 className=" font-semibold text-lg text-white">
                  Your Account Voucher up to 20%
                </h4>
                <p className="text-sm">Vouchers are valid for 7 days</p>
              </div>
              <Image src={girlGoofing} className=" w-[34%] h-27 z-50" />
            </div>
          </section>
        </Grid.Col>
      </Grid>
    </div>
  );
}
