import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { formattedDate } from "../../../Utils/helperFunctions";
import { getAllInvoices } from "../../../Redux/Transaction/TransactionAction";

const Invoices: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useAppDispatch();

  const { transaction } = useAppSelector((state) => state.transaction);
  let invoices = transaction;

  const handleChange = (val: string) => {
    setSearchValue(val);
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
  const inoicesData = invoices
    ? searchValue !== ""
      ? invoices &&
        invoices
          .filter(
            (invoice: any) =>
              invoice.senderId &&
              invoice.senderId.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
          )
          .map((invoice: any) => ({
            id: invoice._id,
            item: invoice.propertyId?.name,
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
          .reverse()
      : invoices &&
        invoices.map((invoice: any) => ({
          id: invoice._id,
          item: invoice.propertyId?.name,
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
    : [].reverse();

  return (
    <>
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
