import { message } from "antd";
import {  NoticeType } from "antd/es/message/interface";

interface ToastMessageParams {
    type?: NoticeType;
    content: string ;
    duration?: number ;
  }
  
  // Toast messages
  export const toastMessage = ({
    type,
    content,
    duration,
  }: ToastMessageParams): void => {
    message.open({
      type,
      content,
      duration,
    });
  };
  export const getToken = ()=>{
    const token = localStorage.getItem("token")
    return token
  }

  export const getUserData = ()=>{
    const user = localStorage.getItem("user")
    const userData = user !== null && JSON.parse(user)
    return userData
  }


  export const formatDateTime = (datetime:any) => {
  
    const date:any = new Date(datetime);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
  
    const now:any = new Date();
    const diff:any = Math.floor((now - date) / 1000); // Difference in seconds
  
    // If the message is less than a day old, display the time only
    if (diff < 86400) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  
    // If the message is less than a year old, display the date and time
    if (now.getFullYear() === date.getFullYear()) {
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${month} ${day}, ${hours}:${minutes}`;
    }
  
    // If the message is older than a year, display the full date
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  


export const getConversations = (user1Id:any, user2Id:any, conversations:any) => {
  const user1Conversations = conversations.filter((conversation:any) => conversation.id === user1Id);
  const user2Conversations = conversations.filter((conversation:any) => conversation.id === user2Id);

  const user1Messages = user1Conversations.length > 0 ? user1Conversations[0].messages : [];
  const user2Messages = user2Conversations.length > 0 ? user2Conversations[0].messages : [];
  
  const allMessages = ([...user1Messages, ...user2Messages]).sort((a:any, b:any) => a.datetime < b.datetime ?-1:1 );
  
  return allMessages;
}

export const formattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
export const formattedDateForChat = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    // weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
export const formattedDateGraph = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    // year: 'numeric',
  });
}

export  const truncateText = (text: string | undefined, maxLength = 20) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const renderDocumentName = (fileUrl: string) => {
  // Extract the filename from the fileUrl
  const filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
  return filename;
};


// Function to convert date to month-year format (e.g., "2024-01")
export const getMonthYear = (dateString: any) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

export const getWeekYear = (dateString: any) => {
  const date = new Date(dateString);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((date.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7);
  return `W${weekNumber.toString().padStart(2, '0')}`;
};


export const counterOfferMessage = (messageObj: any)=> {
  
  if(messageObj.isWithCounterOffer){
  let text = messageObj.message.split(":")
  messageObj = {...messageObj, message:`Counter Offer: ${text[text.length-1]}$`}
    }

  return messageObj;
}

export const parseMessages = (messages: []) => {
  return messages.map((message:any) =>  counterOfferMessage(message))
}


