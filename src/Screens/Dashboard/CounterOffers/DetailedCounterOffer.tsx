import { Avatar, Card, Col, Divider, Row, Typography, Select } from "antd";
import React, { useEffect } from "react";
import Document from "../PropertyDetails/Childrens/Document";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  getAllChatList,
  getChatIdByUsers,
} from "../../../Redux/Chat/chatAction";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import {
  formatDateTime,
  getUserData,
  renderDocumentName,
} from "../../../Utils/helperFunctions";
import { getAllUsers } from "../../../Redux/User/userAction";
import AppCard from "../../../Components/Card/AppCard";

const { Title, Text } = Typography;
const { Option } = Select;

const DetailedCounterOffer: React.FC = () => {
  const { users } = useAppSelector((state) => state.user);
  const { chatByUserId } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (detailedProperty === null) {
      navigate("/counter-offers");
    } else {
      dispatch(
        getChatIdByUsers({
          // _id:"66211c3ae7dc1b1126984393",
          // senderId: "66211f2ae7dc1b11269843a1"
          _id: detailedProperty.buyerId,
          senderId: detailedProperty.sellerId,
        })
      );
      dispatch(getAllUsers());
    }
  }, []);

  let counterOfferId = null;

  const filteredChats =
    chatByUserId
      ?.map((chat: any) => {
        const updatedChat =
          chat.messages &&
          chat?.messages?.map((message: any) => {
            // console.log("msg",message.message.includes("counter_offer_for_property:"));
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

  const detailedProperty = useAppSelector(
    (state) => state.detailProperty.detailedProperty
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = getUserData();

  const handleBack = () => {
    navigate("/counter-offers");
  };

  let docs =
    filteredChats.length > 0
      ? filteredChats.reduce((acc: any[], chat: any) => {
          if (chat && chat.fileUrl !== "" && chat.fileUrl !== undefined) {
            acc.push(chat.fileUrl);
          }
          return acc;
        }, [])
      : [];

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "10px" }}
      >
        <Col>
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
            />
            Go Back
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "100%", height: 100 }}>
          {/* <Card> */}
          <Title
            level={3}
            style={{ textAlign: "center", margin: 0, marginBottom: "5px" }}
          >
            All Counter-offers{" "}
          </Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #e9ecef",
              borderRadius: "15px",
              padding: "5px",
            }}
          >
            <Title style={{ margin: 3 }} level={5}>
              OfferAmount:
            </Title>
            <Text style={{ margin: 3, fontSize: "16px", color: "black" }}>
              {detailedProperty?.offerAmount}
            </Text>
          </div>
          {/* </Card> */}
        </Col>
      </Row>
      <Row>
        <Col span={16} style={{ padding: "5px" }}>
          <div
            style={{
              //   border: "1px solid grey",
              height: 100,
              width: "100%",
              borderRadius: "15px",
              padding: "0px 10px",
            }}
          >
            <div>
              <Typography.Title
                style={{ margin: 0, marginBottom: "5px" }}
                level={5}
              >
                Documents
              </Typography.Title>
            </div>
            <div>
              <Document docs={docs} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              height: 300, // Adjust height as needed
              width: "100%",
              borderRadius: "15px",
              padding: "10px",
              overflowY: "auto",
              border: "1px solid #F0F0F0",
              overflowX: "hidden",
            }}
          >
            <div>
              <Title level={5}>Chats</Title>
            </div>
            <div>
              {filteredChats.map((chat: any) => (
                <div
                  key={chat?._id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar src={chat?.image} />
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
                        {chat?.senderDate}
                      </div>
                    </div>
                    <p style={{ margin: 0 }}>
                      {chat?.isWithCounterOffer ? (
                        <AppCard
                          style={{
                            height: "40%",
                            width: "100%",
                            backgroundColor: "#e9ecef",
                          }}
                          title={
                            <Link
                              to={"/propertyDetails"}
                              state={{ propertyID: detailedProperty._id }}
                              // to={`/propertyDetails/${detailedProperty._id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {detailedProperty.name}
                            </Link>
                          }
                          content={
                            <>
                              <div style={{ fontSize: "14px" }}>
                                {/* <div>{detailedProperty.name}</div> */}
                                {/* <div>Price{detailedProperty.price}</div> */}
                                <div style={{ fontSize: "18px" }}>
                                  Counter Offer:{detailedProperty.offerAmount}
                                </div>
                              </div>
                            </>
                          }
                        />
                      ) : (
                        chat?.message
                      )}
                    </p>
                    {chat?.isWithAttachment && (
                      //   <p style={{ margin: 0, width:"20%", }}>
                      <div style={{}}>
                        <a
                          style={{ display: "flex", color: "#DE2429" }}
                          href={chat?.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {renderDocumentName(chat.fileUrl)}
                        </a>
                      </div>
                      //   </p>
                    )}
                  </div>
                </div>
              ))}
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
              //   height: 250,
              width: "100%",
              padding: "0px 10px",
            }}
          >
            <div>
              <Title style={{ margin: 0 }} level={3}>
                Property Information
              </Title>
              <div>
                <Typography.Title style={{ margin: 0 }} level={5}>
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
        <Col span={8}>
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

export default DetailedCounterOffer;
