export interface TimelinesState {
  timelines: Timeline[];
  isLoading: boolean;
  timeLineById: TimelineById | any;
  error: string | null;
}

export interface Timeline {
  _id: string;
  user: string;
  name: string;
  content: string;
  category: string; // Add the 'type' field to reflect the type of property
  likedbyUsers: string[]; // Add the 'detail' field to reflect additional details
  image: string[];
  createdAt: string;
  updatedAt: string;
  isVisible:string;
  comments: [
    {
        user: string,
        text: string,
        timestamp: string,
        _id: string
    }
]

  __v: number;
  userData: {
    name: string;
    email: string;
  };
}

// TimeLineById ...

// export interface TimelinesByIdState {
//   timelinesById: TimelineById[];
//   isLoading: boolean;
//   error: string | null;
// }
export interface TimelineById {
  _id: string;
  user: string;
  name: string;
  category: string;
  likedbyUsers: string[];
  content: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
  comments: [
      {
          user: string,
          text: string,
      }
  ]
}

export interface ApiError {
  message: string | any;
}
