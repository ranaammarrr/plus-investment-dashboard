import React, { useEffect, useState } from "react";
import { Space, Tag } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";

import { useLocation, useNavigate } from "react-router-dom";
import { getAllInvoices } from "../../../Redux/Transaction/TransactionAction";
import { formattedDate } from "../../../Utils/helperFunctions";
import { addPropertyDetail } from "../../../Redux/PropertyListing/listingSlice";

const CounterOffer: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { transaction } = useAppSelector((state) => state.transaction);
  const property: any = location.state?.propertyId || {};

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  const handleBack = () => {
    navigate("/transactions");
  };

  const columns = [
    {
      title: "Offer Title",
      dataIndex: "note",
      key: "note",
      width: "20%",
    },
    {
      title: "Offer Amount",
      dataIndex: "offerAmount",
      key: "offerAmount",
      width: "20%",
    },
    { title: "Buyer", dataIndex: "buyer", key: "buyer", width: "15%" },
    {
      title: "Published",
      dataIndex: "startDate",
      key: "startDate",
      width: "20%",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <Tag
          color={
            status == "Active"
              ? "#2b9348"
              : status == "Completed"
              ? "#2b9348"
              : status == "In-Progress"
              ? "#450920"
              : "blue"
          }
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "white",
            padding: "2px 4px",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: any, record: DataType) => {
        const handleView = (record: DataType) => {
          dispatch(addPropertyDetail(record));
          navigate("/viewTransactions", { state: { property: record } });
        };
        return (
          <Space size="middle">
            <EyeOutlined
              style={{ fontSize: 24, marginLeft: 6 }}
              onClick={() => handleView(record)}
            />
          </Space>
        );
      },
    },
  ];

  const transactionsData =
    searchValue !== ""
      ? transaction
          .filter((trans) => trans.propertyId._id === property)
          .filter((trans) => trans.propertyId.counterOffers.length > 0)
          .flatMap((trans) =>
            trans.propertyId.counterOffers.map((offer: any) => ({
              offerAmount: offer.counterPrice,
              buyer: trans.receiverId.name,
              buyerId: trans.receiverId._id,
              sellerId: trans.sellerId._id,
              status: trans.status,
              note: offer.note,
              paymentOption: offer.paymentOption,
              terms: offer.terms,
              startDate: formattedDate(offer.startDate),
            }))
          )
      : transaction
          .filter((trans) => trans.propertyId._id === property)
          .filter((trans) => trans.propertyId.counterOffers.length > 0)
          .flatMap((trans) =>
            trans.propertyId.counterOffers.map((offer: any) => ({
              bathNo: trans.propertyId.bathNo,
              roomNo: trans.propertyId.roomNo,
              price: trans.propertyId.price,
              detail: trans.propertyId.detail,
              type: trans.propertyId.type,
              name: trans.propertyId.name,
              image: trans.propertyId.image,
              offerAmount: parseFloat(offer.counterPrice).toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "symbol",
                  minimumFractionDigits: 0,
                }
              ),
              buyer: trans.receiverId.name,
              buyerId: trans.receiverId._id,
              sellerId: trans.senderId._id,
              status: trans.status,
              note: offer.note,
              paymentOption: offer.paymentOption,
              terms: offer.terms,
              startDate: formattedDate(offer.startDate),
            }))
          );

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <InputField
          value={searchValue}
          onChangeText={(val) => handleChange(val)}
          placeholder={"Search invoice"}
          size="large"
          inpuStyles={{ width: "100%" }}
          suffix={<SearchOutlined />}
        />
      </div>
      <AppTable
        dataSource={transactionsData}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default CounterOffer;
