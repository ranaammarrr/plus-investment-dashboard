/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense, useEffect, useState } from "react";
import { Space, Spin, Typography } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { getAllUsers } from "../../../Redux/User/userAction";
import InputField from "../../../Components/InputFeild/InputFeild";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    width: "15%",
    render: (text: string, record: DataType) => {
      return (
        // <Link to={`/profile/${record.key}`}>{text}</Link>
        <Link to={`/profile/edit`}>
          {" "}
          <Typography.Text>{text}</Typography.Text>
        </Link>
      );
    },
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    width: "15%",
    render: (text: string, record: DataType) => {
      return (
        // <Link to={`/profile/${record.key}`}>{text}</Link>
        <Link to={`/profile/edit`}>
          {" "}
          <Typography.Text>{text}</Typography.Text>
        </Link>
      );
    },
  },
  { title: "Email", dataIndex: "email", key: "email", width: "15%" },
  { title: "Address", dataIndex: "address", key: "address", width: "20%" },
  { title: "Role", dataIndex: "role", key: "role", width: "15%" },
  { title: "Company", dataIndex: "company", key: "company", width: "10%" },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: DataType) => {
      function handleDelete(record: DataType): void {
        console.log("delete");
      }
      return (
        <Space size="middle">
          <DeleteOutlined
            style={{ fontSize: 22, marginLeft: 6 }}
            onClick={() => handleDelete(record)}
          />
        </Space>
      );
    },
  },
];

const Users: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userData =
    searchValue !== ""
      ? users
          .filter((user) =>
            user.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((user) => ({
            key: user._id,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1],
            email: user.email,
            role: user.role,
            address: `${user.personalInformation.address} ${user.personalInformation.city}`,
            company: user.company,
          }))
      : users.map((user) => ({
          key: user._id,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1],
          email: user.email,
          role: user.role,
          address: `${user.personalInformation.address} ${user.personalInformation.city}`,
          company: user.company,
        }));

  const handleChange = (val: string) => {
    console.log(val);
    setSearchValue(val);
  };

  return (
    <Suspense
      fallback={
        isLoading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        )
      }
    >
      <InputField
        value={searchValue}
        onChangeText={(val) => handleChange(val)}
        placeholder={"Search Users"}
        size="large"
        inpuStyles={{ width: "20%", marginBottom: 20 }}
        suffix={<SearchOutlined />}
      />
      <AppTable
        dataSource={userData}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </Suspense>
  );
};

export default Users;
