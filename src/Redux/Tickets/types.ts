
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
                },
                response: {
                    text: null,
                    role: string,
                },
                _id: string,
                subject:string,
                message: string,
                status: string,
                createdAt: string,
                updatedAt: string,
                __v: 0
            }[]
        

  
  export interface ApiError {
    message: string | any;
  }
  