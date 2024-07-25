import React, { useEffect, useState } from "react";
import { Select, Space, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { getAllInvoices } from "../../../Redux/Transaction/TransactionAction";
import { formattedDate, getUserData } from "../../../Utils/helperFunctions";
import FilterOption from "../../../Components/FilterOption/FilterOption";
import InputField from "../../../Components/InputFeild/InputFeild";

const { TabPane } = Tabs;

const Invoices: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedInvoices, setSelectedInvoices] = useState<string | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState<string>("all");

  const dispatch = useAppDispatch();
  const location = useLocation();

  const user = getUserData();
  const { transaction } = useAppSelector((state) => state.transaction);
  let invoices = transaction;

  const handleStatusChange = (value: string) => {
    setSelectedInvoices(value);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  let uniqueStatus = Array.from(
    new Set(invoices && invoices.map((item: any) => item.status))
  );
  let filters = uniqueStatus.map((status) => ({ type: status }));

  filters.unshift({ type: "All" });

  const filteredInvoices =
    invoices &&
    invoices.filter((item: any) => {
      if (selectedInvoices && selectedInvoices !== "All") {
        return item.status === selectedInvoices;
      }
      if (activeTab === "propertyInvoice") {
        return item.propertyId;
      } else if (activeTab === "serviceInvoice") {
        return !item.propertyId;
      }
      return true;
    });

  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      width: "5%",
    },
    {
      title: "Seller's Name",
      dataIndex: "sellerName",
      key: "sellerName",
      width: "12%",
      sorter: (a: DataType, b: DataType) =>
        a.sellerName.localeCompare(b.sellerName),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "5%",
      sorter: (a: DataType, b: DataType) => a.price.localeCompare(b.price),
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "14%",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: "10%",
      sorter: (a: DataType, b: DataType) =>
        new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <Tag
          color={
            status === "completed"
              ? "#386641"
              : status === "pending"
              ? "#ccc"
              : status === "rejected"
              ? "#9d0208"
              : "#f4d35e"
          }
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "white",
            padding: "2px 4px",
          }}
        >
          {status && status}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const sortedInvoices = [...filteredInvoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const invoicesData = invoices
    ? searchValue !== ""
      ? sortedInvoices &&
        sortedInvoices
          .filter((invoice: any) =>
            invoice.senderId.name
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
          .map((invoice: any) => ({
            invoiceId: invoice._id,
            invoiceDate: formattedDate(invoice.invoiceDate),
            price: parseFloat(invoice.price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "symbol",
              minimumFractionDigits: 0,
            }),
            quantity: invoice.quantity,
            sellerName: invoice.senderId.name,
            description: invoice.description,
            status: invoice.status,
          }))
      : sortedInvoices &&
        sortedInvoices.map((invoice: any) => ({
          invoiceId: invoice._id,
          invoiceDate: formattedDate(invoice.invoiceDate),
          price: parseFloat(invoice.price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "symbol",
            // minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          quantity: invoice.quantity,
          sellerName: invoice.senderId.name,
          description: invoice.description,
          status: invoice.status,
        }))
    : [];

  return (
    <>
      {/* End Modal COde.....  */}

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
          suffix={<SearchOutlined />}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginRight: "20px", padding: "0" }}>
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              size="small"
              type="card"
              className="ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn"
            >
              <TabPane tab="All Invoices" key="all" />
              <TabPane tab="Property Invoice" key="propertyInvoice" />
              <TabPane tab="Service Invoice" key="serviceInvoice" />
            </Tabs>
          </div>
          <div style={{ alignItems: "center" }}>
            <FilterOption
              options={filters}
              onChangeFilter={handleStatusChange}
              selected={selectedInvoices}
            />
          </div>
        </div>
      </div>
      <div style={{ minWidth: "50%" }}>
        <AppTable
          dataSource={invoicesData}
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
        />
      </div>
    </>
  );
};

export default Invoices;
