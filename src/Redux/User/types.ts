export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}
export interface User {
  status: string;
  isActive: any;
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  company: string;
  profileImg: string;
  personalInformation: {
    name: string;
    gender: string;
    address: string;
    state: string;
    city: string;
    ssn: string;
  };
  isVerified: boolean;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  followers: [
    {
      _id: string;
      followerId: string;
      createdAt: string;
    }
  ];
  following: [string];
}
export interface ApiError {
  message: string | any;
}
