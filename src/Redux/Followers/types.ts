export interface FollowerState {
    follower: Follower[] | null | any;
    isLoading: boolean;
    error: string | null;
  }
  export interface Follower {
    targetUserId:string;
    action:string;
  }
  export interface ApiError {
    message: string;
  }