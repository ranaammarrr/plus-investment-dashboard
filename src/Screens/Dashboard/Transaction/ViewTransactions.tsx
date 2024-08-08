import { Avatar, Col, Divider, Row, Typography } from "antd";
import React, { useEffect } from "react";
import Document from "../PropertyDetails/Childrens/Document";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { getChatIdByUsers } from "../../../Redux/Chat/chatAction";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { formatDateTime, getUserData } from "../../../Utils/helperFunctions";
import { getAllUsers } from "../../../Redux/User/userAction";

const { Title, Text } = Typography;

const ViewTransactions: React.FC = () => {
  const { chatByUserId } = useAppSelector((state) => state.chat);
  const { detailedProperty } = useAppSelector((state) => state.detailProperty);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    dispatch(
      getChatIdByUsers({
        _id: detailedProperty.buyerId,
        senderId: detailedProperty.sellerId,
      })
    );
  }, []);

  const handleBack = () => {
    navigate("/counterOffer");
  };

  const filteredChats =
    chatByUserId
      ?.map((chat: any) => {
        const updatedChat = chat?.messages?.map((message: any) => {
          const sender = chat?.users.find(
            (item: any) => item._id === message.senderId
          );
          if (sender) {
            const updatedMessage = {
              ...message,
              senderName: sender.name,
              senderImg: sender.image,
              senderDate: sender.createdAt,
            };
            return updatedMessage;
          }
        });

        return updatedChat;
      })
      .flat() || [];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "10px",
        }}
        onClick={handleBack}
      >
        <ArrowLeftOutlined
          style={{ fontSize: "24px", marginRight: "5px" }}
          onClick={handleBack}
        />
        Go Back
      </div>
      <Row>
        <Col span={16} style={{ padding: "5px" }}>
          <div
            style={{
              height: 100,
              width: "100%",
              borderRadius: "15px",
              padding: "0px 10px",
            }}
          >
            <div>
              <Typography.Title level={5}>Ducuments</Typography.Title>
            </div>
            <div>
              <Document docs={[]} />
            </div>
          </div>
        </Col>
        <Col span={8} style={{ padding: "5px" }}>
          <div
            style={{
              height: 300,
              width: "100%",
              borderRadius: "15px",
              padding: "0px 10px",
              overflowY: "auto",
              border: "1px solid  #F0F0F0",
              overflowX: "hidden",
            }}
          >
            <div>
              <Title level={5}>Chats</Title>
            </div>
            <div>
              {filteredChats.map((chat: any) => {
                return (
                  <div
                    key={chat._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Avatar src={chat.image} />
                    <div style={{ marginLeft: "10px", flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <strong>{chat?.senderName}</strong>
                        <div
                          style={{
                            fontSize: 10,
                            color: "grey",
                            marginLeft: "20px",
                          }}
                        >
                          {chat.senderDate
                            ? formatDateTime(chat.senderDate)
                            : "18-05-2024"}
                        </div>
                      </div>
                      <p style={{ margin: 0 }}>{chat.message}</p>
                      <div>
                        {chat.isWithAttachment && (
                          <p style={{ margin: 0, marginLeft: "20px" }}>
                            {chat.fileUrl}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Divider />

        {/* Row 1 ended.....  */}
      </Row>
      <Row>
        <Col span={16}>
          <div
            style={{
              width: "100%",
              padding: "0px 10px",
            }}
          >
            <div>
              <Title level={3}>Property Information</Title>
              <div>
                <Typography.Title style={{ margin: "0px" }} level={5}>
                  Property Image
                </Typography.Title>
              </div>
              {detailedProperty?.image && (
                <div>
                  <img
                    style={{
                      height: 200,
                      width: "100%",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                    src={detailedProperty?.image}
                    alt=""
                  />
                </div>
              )}{" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Title level={5}>Property Name</Title>
                  <Text>{detailedProperty?.name}</Text>
                </div>
                <div>
                  <Title level={5}>Property Type</Title>
                  <Text>{detailedProperty?.type}</Text>
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Title level={5}>Number of Beds</Title>
                  <Text>{detailedProperty?.roomNo}</Text>
                </div>
                <div>
                  <Title level={5}>Number of Baths</Title>
                  <Text>{detailedProperty?.bathNo}</Text>
                </div>
              </div>
              <div>
                <Title level={5}>Price</Title>
                <Text>${detailedProperty?.price}</Text>
              </div>
            </div>
            <div style={{ height: 200 }}>
              <Title level={5}>Description</Title>
              <Text>{detailedProperty?.detail}</Text>
            </div>
          </div>
        </Col>
        <Col span={8} style={{ padding: "5px" }}>
          <div
            style={{
              border: "1px solid #F0F0F0",
              height: 200,
              width: "100%",
              padding: "0px 10px",
              borderRadius: "15px",
            }}
          >
            <Title level={5}>Payment Option</Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Text>{detailedProperty?.paymentOption}</Text>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ViewTransactions;
