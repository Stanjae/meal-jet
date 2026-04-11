import { useNavigate } from '@tanstack/react-router';
import VendorImage from '@/assets/undraw_empty-cart_574u (1).svg';
import MJButton from '@/components/atoms/buttons/MJButton';

type Props = {
  type: 'vendor' | 'menuItem' | 'vendorClosed';
};

const emptyStateConfig = {
  vendor: {
    title: 'No vendors found',
    description: 'Try adjusting your search or filter criteria',
    imageUrl: VendorImage,
    btnText: 'See Open Vendors',
    path: '/store',
  },
  menuItem: {
    title: 'No menu items found',
    description: 'Try adjusting your search or filter criteria',
    imageUrl: VendorImage,
    btnText: 'See Open Vendors',
    path: '/store',
  },
  vendorClosed: {
    title: 'Vendor is currently closed',
    description: "You can't order from a closed vendor at the moment.",
    imageUrl: VendorImage,
    btnText: 'See Open Vendors',
    path: '/dashboard/$userId/store',
  },
};

const MJEmptyCard = ({ type }: Props) => {
  const { title, description, imageUrl, btnText, path } = emptyStateConfig[type];
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex items-center justify-center py-5">
        <section className="w-full max-w-md space-y-2.5">
          <img className="w-30 h-25.25 mx-auto block " src={imageUrl} alt={title} />
          <h2 className="text-center text-xl font-semibold capitalize">{title}</h2>
          <p className="text-center text-sm text-gray-400">{description}</p>
          <MJButton
            fullWidth
            className="mt-3"
            onClick={() => navigate({ to: path, params: { userId: 'current' } })}
          >
            {btnText}
          </MJButton>
        </section>
      </div>
    </section>
  );
};

export default MJEmptyCard;
