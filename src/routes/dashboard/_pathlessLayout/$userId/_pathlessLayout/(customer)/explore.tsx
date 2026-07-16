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
        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.16em] uppercase text-secondary">Explore</p>
          <h1 className="mt-1 text-2xl md:text-4xl font-black text-gray-900 leading-tight">
            Explore Vendors
          </h1>
          <p className="mt-1 text-sm text-gray-600 max-w-xl">
            Discover a world of culinary delights with our diverse range of vendors.
          </p>
        </div>
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
      </div>
    </section>
  );
}
