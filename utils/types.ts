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
