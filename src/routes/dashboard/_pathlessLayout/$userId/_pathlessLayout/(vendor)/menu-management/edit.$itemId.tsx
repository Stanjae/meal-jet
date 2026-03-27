import { createFileRoute, useParams } from '@tanstack/react-router';
import AddEditMenuItem from '@/components/organisms/forms/AddEditMenuItem';
import { useGetMenuCategories } from '@/lib/api/services';
import { useMealJetStore } from '@/lib/store/zustand.store';

export const Route = createFileRoute(
  '/dashboard/_pathlessLayout/$userId/_pathlessLayout/(vendor)/menu-management/edit/$itemId'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { itemId } = useParams({ strict: false });
  const { vendor } = useMealJetStore((state) => state);
  const { data } = useGetMenuCategories({ vendorId: vendor?.id as string }, (data) =>
    data.data.map((category) => ({ label: category.name, value: category.id }))
  );
  return (
    <div className="bg-gray-100">
      <AddEditMenuItem categoryData={data} itemId={itemId} />
    </div>
  );
}
