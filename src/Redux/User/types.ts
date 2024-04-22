export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
  }
  export interface User {
      _id: string;
      name: string;
      email: string;
      password: string;
      role: string;
      company: string;
      personalInformation: {
        gender: string,
        address: string,
        state: string
        city: string,
        ssn:string,
    };
      isVerified: boolean;
      isSubscribed: boolean;
      createdAt: string;
    updatedAt: string;
    __v: number;
  }
  export interface ApiError {
    message: string;
  }