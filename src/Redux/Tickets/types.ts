
export interface TicketsState {
  tickets: Tickets | any;
  isLoading: boolean;
  error: string | null;
}

export interface Tickets {
  user: {
    userId: string;
    name: string;
    email: string;
  };
  response: {
    text: string;
    role: string;
  };
  _id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  ticketID: number;
}
[];
export interface Body {
  text: string;
  ticketId: string;
}

export interface ApiError {
  message: string | any;
}

