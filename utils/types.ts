export interface Region {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  region_id: number;
  region: Region;
}

export interface RealEstate {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  image: string;
  city_id: number;
  city: City;
}

export interface Agents {
  id: number;
  name: string;
  surname: string;
  avatar: string;
}

export interface getCity {
  id: number;
  name: string;
  region_id: number;
  region: {
    id: number;
    name: string;
  };
}

export interface getAgent {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  phone: string;
}

export interface getRealEstate {
  id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string;
  city: getCity;
  agent: getAgent;
}

export type FilterValues = {
  minPrice: number | null;
  maxPrice: number | null;
  selectedRegions: number[];
  minArea: number | null;
  maxArea: number | null;
  bedrooms: number | null;
};
