import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/authSlice";
import { userReducer } from "./User/userSlice";
import { propertyReducer } from "./PropertyListing/propertSlice";
import { editPropertyReducer } from "./EditProperty/EditPrpertySlice";
import { transactionReducer } from "./Transaction/TransactionSlice";
import { timelineReducer } from "./Timeline/timelineSlice";
import { categoryReducer } from "./Category/categorySlice";
import { propertyDetailReducer } from "./PropertyListing/listingSlice";
import { chatReducer } from "./Chat/chatSlice";
import { tagsReducer } from "./Tags/tagSlice";
import { invoicesReducer } from "./Invoices/invoicesSlice";
import { ticketsReducer } from "./Tickets/TicketsSlice";
import { groupChatReducer } from "./Chat/groupChatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    property: propertyReducer,
    editProperty: editPropertyReducer,
    timeline: timelineReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    detailProperty: propertyDetailReducer,
    chat: chatReducer,
    tag: tagsReducer,
    invoice: invoicesReducer,
    ticket: ticketsReducer,
    group: groupChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
