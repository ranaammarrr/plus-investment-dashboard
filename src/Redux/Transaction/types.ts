export interface TransactionState {
  transaction: Transctions[];
  isLoading: boolean;
  error: string | null;
}
export interface Transctions {
  sellerId: any;
  propertyId: {
    name: string;
    counterOffers: any;
    bathNo: number;
    roomNo: string;
    price: number;
    type: string;
    detail: string;
    image: string;

    createdAt: string;
    _id: string;
    counterOffer: [
      {
        buyerId: string;
        counterPrice: string;
        note: string;
        paymentOption: string;
        terms: string;
        startDate: string;
        _id: string;
      }
    ];
  };
  receiverId: {
    name: string;
    createdAt: string;
    _id: string;
  };
  senderId: {
    name: string;
    _id: string;
  };

  // invoiceDate: string;
  // dueDate: string;
  // item:string;
  // price: number;
  // quantity: number;
  invoiceNo: number;
  offerAmount: string;
  buyer: string;
  status: string;
  createdAt: string;
}
export interface ApiError {
  message: string;
}
