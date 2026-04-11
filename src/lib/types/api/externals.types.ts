export type MJGoogleLocationResult = {
  geometry: {
    coordinates: number[];
    type: 'Point';
  };
  properties: {
    city: string;
    country: string;
    countrycode: string;
    county: string;
    district: string;
    locality: string;
    name: string;
    osm_id: number;
    osm_key: string;
    osm_type: string;
    osm_value: string;
    postcode: string;
    state: string;
    street: string;
    type: string;
  };
  type: 'Feature';
};

export type MJGoogleLocation = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  formattedAddress: string;
};

export type MJBanksResult = {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  available_for_direct_debit: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type MJBankResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type MJBankApiResponse = MJBankResponse<MJBanksResult[]>;

export type MJAccountVerificationResponse = MJBankResponse<{
  account_name: string;
  account_number: string;
  bank_id: number;
}>;

export type MJMapboxLocationResult = {
  place: string;
  placeId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  granularity: string;
  viewport: {
    low: {
      latitude: number;
      longitude: number;
    };
    high: {
      latitude: number;
      longitude: number;
    };
  };
  formattedAddress: string;
  postalAddress: {
    regionCode: string;
    languageCode: string;
    locality: string;
    sublocality: string;
    addressLines: string[];
  };
  addressComponents: {
    longText: string;
    shortText: string;
    languageCode?: string;
    types: [
      | 'subpremise'
      | 'political'
      | 'street_number'
      | 'route'
      | 'neighborhood'
      | 'locality'
      | 'administrative_area_level_3'
      | 'administrative_area_level_2'
      | 'administrative_area_level_1'
      | 'country'
      | 'postal_code',
    ];
  }[];
  types: ['street_address' | 'subpremise'];
};
