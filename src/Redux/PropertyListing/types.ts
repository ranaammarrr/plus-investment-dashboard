export interface PropertiesState {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
}

export interface Property {
  _id: string;
  name: string;
  type: string; // Add the 'type' field to reflect the type of property
  detail: string; // Add the 'detail' field to reflect additional details
  address: string;
  postalCode: string;
  roomNo: number;
  bathNo: number;
  price: string;
  image: string[]; // Assuming multiple images can be present, so using an array
  location: {
    lat: string; // Adjust data type according to your usage, here assuming string
    lng: string; // Adjust data type according to your usage, here assuming string
  };
  counterOffers: any[]; // Adjust data type according to your usage, here assuming any[]
  __v: number;
}

export interface ApiError {
  message: string;
}
