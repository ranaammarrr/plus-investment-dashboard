import React, { useState, useRef, useEffect } from "react";
import { List, Avatar, Row, Col, Card, Typography, Space, Radio } from "antd";
import { carousal1, logo, property } from "../../../Assets/assets";
import { PlusOutlined } from "@ant-design/icons";
import SearchBar from "./SearchBar";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { theme } from "../../../Theme/theme";
import {
  counterOfferMessage,
  formattedDateForChat,
  getUserData,
  parseMessages,
} from "../../../Utils/helperFunctions";
import SelectUserBar from "../PropertyForm/SelectUserBar";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { getAllChats, getAllGroupChats } from "../../../Redux/Chat/chatAction";
import { getAllUsers } from "../../../Redux/User/userAction";

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = getUserData();

  const [inputValue, setInputValue] = useState("");
  const [showSelect, setShowSelect] = useState<Boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [searchTxt, setSearchTxt] = useState("");
  const { chats } = useAppSelector((state) => state.chat);
  const { allGroupChats } = useAppSelector((state) => state.group);
  const [position, setPosition] = useState<"single" | "group">("single");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (position === "single") {
      dispatch(getAllChats());
    } else {
      dispatch(getAllGroupChats(""));
    }
  }, [dispatch, position]);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [selectedContact]);

  const handleAddChat = () => {
    dispatch(getAllUsers());
  };

  const handleUser = (addUser: any) => {
    setShowSelect(false);
  };

  const handleSelectUser = (item: any) => {
    if (position === "single") {
      const getSingleChat = chats?.filter(
        (chat: any) => chat._id === item.chatId
      );

      if (getSingleChat && getSingleChat.length > 0) {
        item = { ...item, messages: parseMessages(getSingleChat[0].messages) };
      } else {
        item = { ...item, messages: [] };
      }
    } else {
      const getGroupChat = allGroupChats?.filter(
        (groupChat: any) => groupChat._id === item.chatId
      );

      if (getGroupChat && getGroupChat.length > 0) {
        item = { ...item, messages: parseMessages(getGroupChat[0].messages) };
      } else {
        item = { ...item, messages: [] };
      }
    }

    setSelectedContact(item);
  };

  const filteredChats =
    position === "single"
      ? (chats &&
          chats
            .map((chat: any) => {
              const filteredUser =
                chat &&
                chat.users.find((item: any) => item?.senderId !== user._id);

              if (filteredUser) {
                const updatedUser = {
                  ...filteredUser,
                  lastMessage: counterOfferMessage(
                    chat?.messages[chat.messages.length - 1]
                  ),
                  chatId: chat?._id,
                  createdAt: chat?.messages[chat.messages.length - 1].createdAt,
                };

                return updatedUser;
              }

              return null;
            })
            .filter((chat: any) => chat !== null)
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )) ||
        []
      : (allGroupChats &&
          allGroupChats
            .map((groupChat: any) => ({
              ...groupChat,
              lastMessage: counterOfferMessage(
                groupChat?.messages[groupChat.messages.length - 1]
              ),
              chatId: groupChat?._id,
              createdAt:
                groupChat?.messages[groupChat.messages.length - 1]?.createdAt,
            }))
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )) ||
        [];

  return (
    <Card>
      <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
        {/* Contacts column */}
        <Col
          span={6}
          style={{
            overflowY: selectedContact ? "scroll" : "scroll",
            overflowX: "hidden",
            height: "450px",
          }}
        >
          {/* Contacts content */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            {showSelect ? (
              <SelectUserBar onSelectUser={(addUser) => handleUser(addUser)} />
            ) : (
              <SearchBar onSearch={(val) => setSearchTxt(val)} />
            )}
            <PlusOutlined
              onClick={handleAddChat}
              style={{ fontSize: 20, marginLeft: 5 }}
            />
          </div>
          <div style={{ marginLeft: "40px" }}>
            <Space>
              <Radio.Group
                size="middle"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Radio.Button
                  value="single"
                  style={{
                    backgroundColor: position === "single" ? "#7FB77E" : "grey",
                    color: "#FFFFEC",
                    borderColor: "transparent",
                  }}
                >
                  Single
                </Radio.Button>
                <Radio.Button
                  value="group"
                  style={{
                    backgroundColor: position === "group" ? "#7FB77E" : "grey",
                    color: "#FFFFEC",
                    borderColor: "transparent",
                  }}
                >
                  Group
                </Radio.Button>
              </Radio.Group>
            </Space>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={filteredChats}
            renderItem={(item: any) => {
              return (
                <List.Item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: 0,
                    padding: 0,
                  }}
                  onClick={() => handleSelectUser(item)}
                >
                  <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
                    <Col span={24}>
                      <Row>
                        <div
                          style={{
                            flexDirection: "row",
                            paddingTop: 10,
                            paddingBottom: 10,
                            display: "flex",
                            width: "100%",
                            height: "50%",
                            flex: 1,
                          }}
                        >
                          <Avatar
                            size="small"
                            shape="circle"
                            src={carousal1}
                            style={{
                              width: 45,
                              height: 35,
                              objectFit: "cover",
                            }}
                          />
                          <div style={{ marginLeft: 10, width: "100%" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <Typography.Text
                                style={{
                                  fontWeight: "450",
                                  fontSize: "14px",
                                  width: 80,
                                }}
                              >
                                {item.name}
                              </Typography.Text>

                              <div
                                style={{
                                  fontSize: 10,
                                  color: "#94A4BA",
                                  marginLeft: "50px",
                                }}
                              >
                                {item.createdAt
                                  ? formattedDateForChat(item.createdAt)
                                  : "No Date"}
                              </div>
                            </div>
                            <Typography.Text
                              style={{
                                fontWeight: "450",
                                fontSize: "12px",
                              }}
                            >
                              {item.lastMessage.message}
                            </Typography.Text>
                          </div>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />
        </Col>

        <Col
          span={18}
          ref={chatContentRef}
          style={{
            padding: "0px",
            maxHeight: "400px",
            minHeight: "449px",
            overflowY: selectedContact ? "scroll" : "hidden",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          {selectedContact ? (
            <div
              style={{
                backgroundColor: theme.palette.primary.main,
                padding: "6px 20px",
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <Avatar size="large" src={property} />
              <Typography.Text
                style={{
                  marginLeft: "10px",
                  display: "flex",
                  fontWeight: "bolder",
                  fontSize: "20",
                }}
              >
                {selectedContact.name}
              </Typography.Text>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px",
              }}
            >
              <img style={{ height: "25%", width: "25%" }} src={logo} alt="" />
            </div>
          )}
          <div>
            {selectedContact && (
              <List
                itemLayout="vertical"
                dataSource={selectedContact.messages}
                style={{ minHeight: "270px" }}
                renderItem={(item: any) => (
                  <List.Item
                    style={{
                      textAlign:
                        item.senderId !== selectedContact._id
                          ? "right"
                          : "left",
                      color:
                        item.senderId !== selectedContact._id
                          ? "blue"
                          : "white",
                    }}
                  >
                    <MessageBox
                      id={selectedContact._id}
                      styles={{
                        color: "black",
                        backgroundColor:
                          item.senderId !== selectedContact._id
                            ? "#96DCFF"
                            : "#e2fdff",
                      }}
                      position={
                        item.senderId !== selectedContact._id ? "right" : "left"
                      }
                      text={counterOfferMessage(item.message)}
                      title={selectedContact.name}
                      focus={false}
                      date={new Date(item.datetime)}
                      titleColor={
                        item.senderId !== selectedContact._id
                          ? "black"
                          : "black"
                      }
                      forwarded={false}
                      replyButton={false}
                      removeButton={false}
                      status="sent"
                      notch={false}
                      retracted={false}
                      type="text"
                    />
                  </List.Item>
                )}
              />
            )}

            {selectedContact && (
              <div
                style={{
                  position: "sticky",
                  bottom: 0,
                  borderRadius: "5px",
                  textAlign: "center",
                  padding: "10px 20px",
                  zIndex: 1,
                  marginTop: "25px",
                }}
              >
                {/* Add your input and send button here */}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Chat;
