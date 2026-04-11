import { createFileRoute } from '@tanstack/react-router';
import { Grid } from '@mantine/core';
import MJCardSkeleton from '@/components/atoms/loader/MJCardSkeleton';
import VendorProfileCard from '@/components/molecules/cards/VendorProfileCard';
import { useGetAllVendors } from '@/lib/api/services';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(customer)/explore'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: vendors, isLoading } = useGetAllVendors();
  return (
    <section>
      <div>
        <h2 className="text-[20px] font-medium leading-7">All Vendors</h2>
        {isLoading && <MJCardSkeleton cols={3} type="vendor" totalCount={12} />}
        <Grid>
          {vendors?.data.vendors?.map((vendor) => (
            <Grid.Col span={4} key={vendor.id}>
              <VendorProfileCard vendor={vendor} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </section>
  );
}
