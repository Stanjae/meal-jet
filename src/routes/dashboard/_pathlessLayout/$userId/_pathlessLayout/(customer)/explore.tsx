import { createFileRoute } from '@tanstack/react-router';
import MJCarousel from '@/components/atoms/carousel/MJCarousel';
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
        <MJCarousel
          slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
          slideGap={{ base: 'md', sm: 'lg' }}
          height={250}
        >
          {vendors?.data.vendors?.map((vendor) => (
            <VendorProfileCard vendor={vendor} />
          ))}
        </MJCarousel>
        <MJCarousel height={250} withControls={false}>
          {vendors?.data.vendors?.map((vendor) => (
            <VendorProfileCard vendor={vendor} />
          ))}
        </MJCarousel>
      </div>
    </section>
  );
}
