import React from "react";
import { Row, Col } from "antd";
import AppCard, { CardProps } from "../../Components/Card/AppCard";
import {
  lastTransactionIcon,
  listingIcon,
  transactionIcon,
  userIcon,
} from "../../Assets/assets";
const Dashboard: React.FC = () => {
  const cardData: CardProps[] = [
    {
      title: "Listing",
      gradient: "linear-gradient(to bottom right, #F0F0F0, #D4D4D4)",
      content: "101",
      icon: (
        <img
          src={listingIcon}
          alt="User Icon"
          style={{ width: 30, height: 30 }}
        />
      ),
    },
    {
      title: "Users",
      gradient: "linear-gradient(to bottom right, #EFF7FF, #C2E2FF)",
      content: "201",
      icon: (
        <img src={userIcon} alt="User Icon" style={{ width: 30, height: 30 }} />
      ),
    },
    {
      title: "Transaction",
      gradient: "linear-gradient(to bottom right, #FFE6E6, #FFCCCC)",
      content: "$160",
      icon: (
        <img
          src={transactionIcon}
          alt="User Icon"
          style={{ width: 30, height: 30 }}
        />
      ),
    },
    {
      title: "Last Transaction",
      gradient: "linear-gradient(to bottom right, #FF9999, #FF6666)",
      content: "$304",
      icon: (
        <img
          src={lastTransactionIcon}
          alt="User Icon"
          style={{ width: 30, height: 30 }}
        />
      ),
    },
  ];
  return (
    <>
      <Row gutter={[16, 16]}>
        {cardData.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <AppCard {...card} style={{ width: "100%", height: 180 }} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Dashboard;
