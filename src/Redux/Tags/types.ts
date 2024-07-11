export interface TagsState {
    tag: Tags[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface Tags {
    _id: string;
    tagName: string;
    createdAt: string;
    updatedAt:string;
  }

  export interface Body {
    tagName:string;
  } 
  export interface ApiError {
    message: string;
  }