import {
  Avatar,
  Card,
  Carousel,
  Col,
  Row,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import Description from "./Childrens/Description";
import Map from "./Childrens/Map";
import Document from "./Childrens/Document";
import PaymentPlan from "./Childrens/PaymentPlan";
import Transaction from "./Childrens/Transaction";
import { useLocation, useNavigate } from "react-router-dom";
import { getPropertyDetail } from "../../../Redux/PropertyListing/listingAction";
import { getAllUsers } from "../../../Redux/User/userAction";

const onChange = (key: string) => {
  console.log(key);
};

const sellers = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street, City, Country",
  },
];

const PropertyDetails: React.FC = () => {
  const { propertiesDetail } = useAppSelector((state) => state.detailProperty);
  const { users } = useAppSelector((state) => state.user);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/propertyListing");
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("propertyID");
    dispatch(getAllUsers());

    dispatch(getPropertyDetail(id ?? location.state.propertyID));
  }, [location]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: <Description details={propertiesDetail.detail} />,
    },
    {
      key: "2",
      label: "Map",
      children: <Map />,
    },
    {
      key: "3",
      label: "Document",
      children: <Document docs={[]} />,
    },
    {
      key: "4",
      label: "Payment Plan",
      children: <PaymentPlan paymentPlan={propertiesDetail.paymentPlan} />,
    },
    {
      key: "5",
      label: "Transaction",
      children: <Transaction />,
    },
  ];

  // Format the price
  const formattedPrice = propertiesDetail.price
    ? parseFloat(propertiesDetail.price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
      })
    : "";

  const likedProperties =
    propertiesDetail?.likedbyUsers?.map((id: any) =>
      users.find((user) => id === user._id)
    ) || [];

  return (
    <>
      {/* <AppButton size="large" onClick={handleBack}>Back</AppButton> */}
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
        <Col span={16} style={{ padding: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Typography.Title style={{ margin: 0 }} level={4}>
              {propertiesDetail.name || " "}
            </Typography.Title>
            <Tag
              color={propertiesDetail.approved ? "green" : "red"}
              style={{ marginLeft: "5px", fontSize: "16px" }}
            >
              {propertiesDetail.approved ? "Active" : "Inactive"}
            </Tag>
          </div>
          {/* Carousal Start...  */}
          <Carousel autoplay style={{ marginTop: "10px" }}>
            {propertiesDetail.image &&
              propertiesDetail?.image.map((image) => (
                <div>
                  <img
                    src={image}
                    alt="Image"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
          </Carousel>
          {/* Carousal End ....  */}

          {/* Card Row ...  */}
          <Tabs
            defaultActiveKey="1"
            size="large"
            style={{ paddingTop: "30px" }}
            items={items}
            onChange={onChange}
          />
        </Col>
        <Col span={8} style={{ padding: "10px" }}>
          {/* Seller Details Card */}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Typography.Title style={{ margin: 0 }} level={4}>
              {formattedPrice}
            </Typography.Title>
          </div>

          <Card
            title="Seller Details"
            bordered={true}
            style={{ marginTop: "10px", height: "300px" }}
          >
            {/* {sellers.map((seller, index) => ( */}
            <div>
              <p>
                <strong>Name:</strong> {propertiesDetail?.user.name}
              </p>
              <p>
                <strong>Company:</strong> {propertiesDetail.user.company}
              </p>
              <p>
                <strong>Badge:</strong> {propertiesDetail.user.role}
              </p>
              <p>
                <strong>Property-type:</strong> {propertiesDetail.type}
              </p>
              {/* {index !== sellers.length - 1 && <hr />}{" "} */}
              {/* Add horizontal line between sellers */}
            </div>
            {/* ))} */}
          </Card>
          <Space direction="vertical" size={16} style={{ marginTop: "30px" }}>
            <Card
              title="New likes"
              extra={
                <a href="">
                  {(propertiesDetail &&
                    propertiesDetail.likedbyUsers?.length) ||
                    "0"}
                </a>
              }
              style={{
                width: 340,
                height: "300px",
                // overflowY: "scroll"
              }}
              bodyStyle={{ padding: "5px" }}
              headStyle={{ padding: "5px" }}
            >
              {likedProperties &&
                likedProperties.map((user: any) => (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <Avatar
                          style={{ marginTop: "15px" }}
                          size="large"
                          icon={<UserOutlined />}
                          // srcSet={propertiesDetail && propertiesDetail.image}
                        />
                      </div>
                      <div>
                        <Typography.Title
                          style={{ marginLeft: "14px" }}
                          level={5}
                        >
                          {user.name}
                        </Typography.Title>
                      </div>
                    </div>
                  </>
                ))}
            </Card>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default PropertyDetails;
