import { useQuery } from '@tanstack/react-query';
import type {
  MJAccountVerificationResponse,
  MJBankApiResponse,
  MJBanksResult,
  MJGoogleLocationResult,
} from '@/lib/types/api/externals.types';

export const useGetGoogleLocation = (query: string) => {
  return useQuery({
    queryKey: ['googleLocation', query],
    queryFn: async () => {
      const response = await fetch(`https://photon.komoot.io/api/?q=${query}`);
      const data = await response.json();
      return data.features as Array<MJGoogleLocationResult>;
    },
    select: (data) => {
      console.log('Raw Google location data:', data);
      return data.map((feature: MJGoogleLocationResult) => ({
        city:
          feature.properties.city || feature.properties.locality || feature.properties.county || '',
        state: feature.properties.state,
        country: feature.properties.country,
        postalCode: feature.properties.postcode,
        coordinates: feature.geometry.coordinates,
        street: feature.properties.street,
      }));
    },
    enabled: query.length > 0, // Only run the query if there's a search term
  });
};

export const useGetBankNames = () => {
  return useQuery({
    queryKey: ['bankNames'],
    queryFn: async () => {
      const response = await fetch('https://api.paystack.co/bank?country=nigeria&perPage=100');
      const data = await response.json();
      return data as MJBankApiResponse;
    },
    select: (data) => {
      return data.data
        .map((feature: MJBanksResult) => ({
          label: feature.name,
          value: feature.code,
        }))
        .filter((bank) => !['50739', '057'].includes(bank.value)); // Exclude banks with code 'nuban'
    },
  });
};

export const useVerifyAccountNumber = (query: string, code: number) => {
  const coder = '001';
  return useQuery({
    queryKey: ['bankNames', query, code],
    queryFn: async () => {
      const response = await fetch(
        `https://api.paystack.co/bank/resolve?account_number=${query}&bank_code=${coder}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      return data as MJAccountVerificationResponse;
    },
    enabled: query.length > 9,
  });
};
