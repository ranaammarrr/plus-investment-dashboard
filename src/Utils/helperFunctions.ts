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