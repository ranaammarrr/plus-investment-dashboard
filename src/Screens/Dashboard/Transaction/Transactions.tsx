import React, { useEffect, useState } from "react";
import { Space } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { useNavigate } from "react-router-dom";
import { getAllInvoices } from "../../../Redux/Transaction/TransactionAction";
import { formattedDate } from "../../../Utils/helperFunctions";

const Transactions: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(
    null
  );
  const { transaction } = useAppSelector((state) => state.transaction);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  const columns = [
    {
      title: "Property Title",
      dataIndex: "propertyTitle",
      key: "propertyTitle",
      width: "25%",
      render: (name: string, record: DataType) => {
        const handleNavigateToTimlineFeed = () => {
          navigate("/propertyDetails");
        };
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleNavigateToTimlineFeed()}
          >
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "seller",
      width: "25%",
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      width: "25%",
    },
    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (_: any, record: DataType) => {
        const handleView = (record: DataType) => {
          setSelectedProperty(record);
          navigate("/counterOffer", { state: { propertyId: record.id } });
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
          .filter((invoice) => invoice?.propertyId.counterOffers)
          .filter((invoice) =>
            invoice?.propertyId?.name
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
          .map((invoice) => ({
            propertyTitle: invoice?.propertyId.name,
            seller: invoice.senderId.name,
            published: formattedDate(invoice.propertyId.createdAt),
            id: invoice.propertyId._id,
          }))
      : transaction
          .filter((invoice) => invoice?.propertyId) // Filter properties with counterOffers
          .map((invoice) => ({
            propertyTitle: invoice.propertyId.name,
            seller: invoice.senderId.name,
            published: formattedDate(invoice.propertyId.createdAt),
            id: invoice.propertyId._id,
          }));

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "8px",
          // marginTop: "20px",
        }}
      >
        <InputField
          value={searchValue}
          onChangeText={(val) => handleChange(val)}
          placeholder={"Search transaction"}
          size="large"
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
        {/* <AppButton
          text="Create Invoice"
          textStyle={{
            // width: 130,
          }}
          size="large"
          onClick={() =>handleInvoice()} 
        /> */}
      </div>
      <AppTable
        dataSource={transactionsData}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default Transactions;
