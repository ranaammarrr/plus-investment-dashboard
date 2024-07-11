export interface CategoriesState {
    categories: Categories[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface Categories {
    _id: string;
    value: string;
    label: string;
    icon:string;
    createdAt:string
  }

  export interface Body {
    label:string;
    icon:string;
  } 
  export interface ApiError {
    message: string;
  }