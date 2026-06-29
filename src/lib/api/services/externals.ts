import { useQuery } from '@tanstack/react-query';
import type {
  MJAccountVerificationResponse,
  MJBankApiResponse,
  MJBanksResult,
  MJMapboxLocationResult,
} from '@/lib/types/api/externals.types';

export const useGetBankNames = () => {
  return useQuery({
    queryKey: ['bankNames'],
    queryFn: async () => {
      const response = await fetch('https://api.paystack.co/bank?country=nigeria&perPage=100');
      const data = await response.json();
      return data as MJBankApiResponse;
    },
    select: (data) => {
      const seen = new Set();
      return data.data
        .filter((bank: MJBanksResult) => {
          if (seen.has(bank.code)) return false;
          seen.add(bank.code);
          return true;
        })
        .map((feature: MJBanksResult) => ({
          label: feature.name,
          value: feature.code,
        }));
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

export const useGetMapleBoxGeoLocation = (query: string) => {
  const formattedQuery = encodeURIComponent(query);
  return useQuery({
    queryKey: ['mapleBoxGeoLocation', query],
    queryFn: async () => {
      const response = await fetch(
        `https://geocode.googleapis.com/v4/geocode/address/${formattedQuery}?key=${import.meta.env.VITE_GOOGLE_MAP_ACCESS_TOKEN}`
      );
      const data = await response.json();
      return data.results as Array<MJMapboxLocationResult>;
    },
    select: (data) => {
      return data.map((result) => {
        return {
          formattedAddress: result.formattedAddress,
          coordinates: { lng: result.location.longitude, lat: result.location.latitude },
          street: result.postalAddress.addressLines.join(', '),
          country:
            result.addressComponents.find((comp) => comp.types.includes('country'))?.longText || '',
          postalCode:
            result.addressComponents.find((comp) => comp.types.includes('postal_code'))?.longText ||
            '',
          city:
            result.addressComponents.find((comp) =>
              comp.types.includes('administrative_area_level_2')
            )?.longText || '',
          state:
            result.addressComponents.find((comp) =>
              comp.types.includes('administrative_area_level_1')
            )?.longText || '',
        };
      });
    },
    enabled: query.length > 6, // Only run the query if there's a search term
  });
};
