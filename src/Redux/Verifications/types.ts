export interface VerificationsState {
    verifications: Verifications[];
    isLoading: boolean;
    error: string | null;
  }
  export interface Verifications {
    
        user: {
            userId: string,
            name: string,
            email: string
        },
        _id: string,
        doc_type: string,
        item: string,
        status: string,
        createdAt: string,
    
  }
  export interface ApiError {
    message: string | any;
  }
  