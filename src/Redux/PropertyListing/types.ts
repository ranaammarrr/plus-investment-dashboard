export interface PropertiesState {
  properties: Property[];

  isLoading: boolean;
  error: string | null;
}
export interface PropertiesDetailState {
  propertiesDetail: PropertyDetail;
  isLoading: boolean;
  error: string | null;
  detailedProperty: any;
}

export interface Property {
  category: string;
  _id: string;
  name: string;
  type: string; // Add the 'type' field to reflect the type of property
  detail: string; // Add the 'detail' field to reflect additional details
  address: string;
  postalCode: string;
  roomNo: number;
  bathNo: number;
  price: string;
  createdAt: string;
  image: string[]; // Assuming multiple images can be present, so using an array
  approved: boolean;
  isFeatured: boolean;
  location: {
    lat: any; // Adjust data type according to your usage, here assuming string
    lng: any; // Adjust data type according to your usage, here assuming string
  };
  counterOffers: [
    {
      buyerId: string;
      counterPrice: string;
      note: string;
      paymentOption: string;
      terms: string;
      startDate: string;
      _id: string;
      status: string;
    }
  ]; // Adjust data type according to your usage, here assuming any[]
  __v: number;
  user: {
    id: string;
    name: string;
    company: string;
  };
}
export interface PropertyDetail {
  [x: string]: any;
  details: any;
  succcess: any;
  _id: string;
  name: string;
  title: string; // Add the 'type' field to reflect the type of property
  detail: string; // Add the 'detail' field to reflect additional details
  address: string;
  postalCode: string;
  type: string;
  company: string;
  price?: string;
  image?: [string]; // Assuming multiple images can be present, so using an array
  approved: boolean;
  isFeatured: boolean;

  user: {
    name: string;
    company: string;
    role: string;
  };
}

export interface ApiError {
  message: string;
}
