export interface EditPropertyState {
    edit: Edit[];
    isLoading: boolean;
    error: string | null;
  }
  export interface Edit {
      property_id: string;
      type:string;
      name: string;
      email: string;
      address:string;
      postalCode: number;
      roomNo: string;
      bathNo: string;
      price: string;
      detail: string;
      user_id:string;
      lat: number;
      lng: number;
  }
export interface Add {
    user_id: string;
    type: string;
    name: string;
    address: string;
    postalCode: number;
    roomNo: string;
    bathNo: string;
    price: string;
    lat: number;
    lng: number;
  }
  export interface ApiError {
    message: string;
  }