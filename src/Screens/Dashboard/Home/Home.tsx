import React, { useEffect } from "react";
import { Row, Col } from "antd";
import AppCard, { CardProps } from "../../../Components/Card/AppCard";
import {
  lastTransactionIcon,
  listingIcon,
  transactionIcon,
  userIcon,
} from "../../../Assets/assets";
import TransactionLineChart from "./Charts/TransactionChart";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { getAllUsers } from "../../../Redux/User/userAction";
import { getAllProperties } from "../../../Redux/PropertyListing/listingAction";
import { getAllInvoices } from "../../../Redux/Transaction/TransactionAction";
// import PropertyMap from "./Charts/PropertyMap";
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllProperties());
    dispatch(getAllInvoices());
  }, [dispatch]);
  const { users } = useAppSelector((state) => state.user);
  const { properties } = useAppSelector((state) => state.property);
  const { transaction } = useAppSelector((state) => state.transaction);
  const userCount = users && users.length > 0 ? users.length : "101";
  const propertiesCount =
    properties && properties.length > 0 ? properties.length : "80";
  const invoiceCount =
    transaction && transaction.length > 0 ? transaction.length : "280";
  const cardData: CardProps[] = [
    {
      title: "Users",
      gradient:
        "linear-gradient(76deg, rgba(173,222,117,1) 18%, rgba(193,153,97,1) 60%, rgba(78,150,109,1) 100%)",
      content: userCount,
      icon: (
        <img src={userIcon} alt="User Icon" style={{ width: 30, height: 30 }} />
      ),
    },
    {
      title: "Listing",
      gradient:
        "linear-gradient(335deg, rgba(195,139,34,1) 0%, rgba(125,45,253,1) 100%)",
      content: propertiesCount,
      icon: (
        <img
          src={listingIcon}
          alt="User Icon"
          style={{ width: 30, height: 30 }}
        />
      ),
    },
    {
      title: "Invoices",
      gradient:
        "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
      content: invoiceCount,
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
      <Row>
        <TransactionLineChart />
      </Row>
      {/* <Row>
        <PropertyMap/>
      </Row> */}
    </>
  );
};
export default Home;
