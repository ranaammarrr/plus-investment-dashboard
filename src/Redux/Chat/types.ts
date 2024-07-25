export interface ChatState {
  chats: Chat[] | null | any;
  chatByUserId: Chat[] | null | any;
  allGroupChats: Chat[] | null | any;
  isLoading: boolean;
  error: string | null;
}
export interface Chat {
  users: [
    {
      _id: string;
      name: string;
      email: string;
      image: string;
    }
  ];
  messages: [
    {
      [x: string]: any;
      senderId: string;
      message: string;
      _id: string;
      fileUrl: string;
      isWithAttachment: boolean;
    }
  ];
  createdAt: string;
}
export interface ApiError {
  message: string;
}
