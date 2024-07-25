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
import { Button, Modal } from "antd";
import {
  getAllCategories,
  createCategories,
  deleteCategory,
} from "../../../Redux/Category/categoryAction";
import { getInvoicesById } from "../../../Redux/Invoices/invoicesActions";
import { useLocation } from "react-router-dom";
import { formattedDate, getUserData } from "../../../Utils/helperFunctions";
import { getAllInvoices } from "../../../Redux/Transaction/TransactionAction";

const { confirm } = Modal;

const Invoices: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [labelValue, setLabelValue] = useState<string>("");
  const [addCategorySearch, setAddCategorySearch] = useState<string>("");

  const dispatch = useAppDispatch();
  const location = useLocation();

  const user = getUserData();

  //   const { invoices } = useAppSelector((state) => state.invoice);
  const { transaction } = useAppSelector((state) => state.transaction);
  let invoices = transaction;

  // Modal Handlers Ended ....

  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  const handleAddSearch = (val: string) => {
    setAddCategorySearch(val);
  };

  const handleLabelChange = (value: string) => {
    setLabelValue(value);
  };

  const columns = [
    // {
    //   title: "Item",
    //   dataIndex: "item",
    //   key: "item",
    //   width: "10%",
    // },
    {
      title: "Seller's Name",
      dataIndex: "sellerName",
      key: "sellerName",
      width: "10%",
      sorter: (a: DataType, b: DataType) =>
        a.sellerName.localeCompare(b.sellerName),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
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
            status == "completed"
              ? "#386641"
              : status == "pending"
              ? "#ccc"
              : status == "rejected"
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
          {(status && status) || "pending"}
        </Tag>
      ),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   width:"10%",
    //   render: (_: any, record: DataType) => {
    //     const handleDelete = async (id: string) => {
    //       confirm({
    //         title: "Delete this category?",
    //         icon: <ExclamationCircleOutlined />,
    //         okText: "Yes",
    //         okType: "danger",
    //         content:
    //           "Deleting a category is irreversible, are you sure you want to proceed?",
    //         cancelText: "No",
    //         async onOk() {
    //       await dispatch(deleteCategory(id));
    //       dispatch(getAllCategories());
    //     },
    //     onCancel() {},
    //   });
    //     };

    //     return (
    //       <Space size="middle">
    //         <DeleteOutlined
    //           style={{ fontSize: 22, marginLeft: 6 }}
    //           onClick={() => handleDelete(record._id)}
    //         />
    //       </Space>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const sortedInvoices = [...invoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const inoicesData = invoices
    ? searchValue !== ""
      ? sortedInvoices &&
        sortedInvoices
          .filter((invoice: any) =>
            invoice.senderId.name
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
          .map((invoice: any) => ({
            id: invoice._id,
            // item: invoice.propertyId?.name,
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
          id: invoice._id,
          // item: invoice.propertyId?.name,
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
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
      </div>
      <div style={{ minWidth: "50%" }}>
        <AppTable
          dataSource={inoicesData}
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
        />
      </div>
    </>
  );
};

export default Invoices;
