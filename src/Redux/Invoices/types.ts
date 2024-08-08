export interface InvoicesState {
  invoices: InvoicesById | any;
  isLoading: boolean;
  error: string | null;
}
export interface InvoicesById {
  _id: string | any;
  receiverId: string;
  senderId: string;
  propertyId: string;
  counterOfferId: string;
  invoiceDate: string;
  dueDate: string;
  item: string;
  price: number;
  quantity: number;
}
[];

export interface ApiError {
  message: string;
}
