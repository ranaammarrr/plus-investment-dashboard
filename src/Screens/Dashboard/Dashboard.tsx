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
      gradient:
        "linear-gradient(335deg, rgba(195,139,34,1) 0%, rgba(125,45,253,1) 100%)",
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
      gradient:
        "linear-gradient(76deg, rgba(173,222,117,1) 18%, rgba(193,153,97,1) 60%, rgba(78,150,109,1) 100%)",
      content: "201",
      icon: (
        <img src={userIcon} alt="User Icon" style={{ width: 30, height: 30 }} />
      ),
    },
    {
      title: "Transaction",
      gradient:
        "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
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
      gradient:
        "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
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
