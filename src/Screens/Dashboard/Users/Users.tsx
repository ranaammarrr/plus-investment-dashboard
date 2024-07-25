/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense, useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Switch, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import {
  deleteUser,
  getAllUsers,
  isVerifiedUser,
} from "../../../Redux/User/userAction";
import InputField from "../../../Components/InputFeild/InputFeild";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../../Components/Button/AppButton";
import { formattedDate } from "../../../Utils/helperFunctions";

const Users: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { confirm } = Modal;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleStatusToggle = (record: DataType) => {
    // Logic to toggle user status goes here
  };

  const handleUserClick = (record: DataType) => {
    setSelectedUser(record);
    setModalVisible(true);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
      render: (text: string, record: DataType) => (
        <Link
          style={{ color: "black" }}
          onClick={() => handleUserClick(record)}
          to={""}
        >
          {text}
        </Link>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: "10% " },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      sorter: (a: DataType, b: DataType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "5%",
      render: (role: string) => (
        <Tag
          color={
            role == "Virtual Attorney"
              ? "#2b2d42"
              : role == "Social Lender"
              ? "#001d3d"
              : role == "Investor"
              ? "#F6C142"
              : role == "Social Investor"
              ? "#e09f3e"
              : role == "OMNI®️ PRO"
              ? "#786BBE"
              : "#FC3441"
          }
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "white",
            padding: "2px 4px",
          }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: "15%",
      sorter: (a: DataType, b: DataType) => a.company.localeCompare(b.company),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (_: any, record: DataType) => {
        const onChange = async (checked: any) => {
          try {
            await dispatch(
              isVerifiedUser({
                user_id: record.key,
                isVerified: checked.toString(),
              })
            );
          } catch (error) {
            console.error("Error updating user:", error);
          }
        };

        return (
          <Space size="middle">
            {/* <Tag
              style={{ width: "80px", textAlign: "center" }} // Adjust the width as needed
              color={status ? "green" : "red"}
            >
              {status ? "Active" : "Inactive"}
            </Tag> */}
            <Switch
              style={{ width: "20px" }}
              defaultChecked={record.status}
              onChange={onChange}
            />
          </Space>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => {
        const handleDelete = async (record: DataType) => {
          confirm({
            title: "Delete this user?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            content:
              "Deleting a User is irreversible, are you sure you want to proceed?",
            cancelText: "No",
            async onOk() {
              await dispatch(deleteUser(record.key));
              dispatch(getAllUsers());
            },
            onCancel() {},
          });
        };
        // const handleEdit = (record: DataType) => {
        //   navigate("/profile/edit");
        // };
        return (
          <Space size="middle">
            {/* <EditOutlined
              style={{ fontSize: 22, marginLeft: 6 }}
              onClick={() => handleEdit(record)}
            /> */}
            <DeleteOutlined
              style={{ fontSize: 22, marginLeft: 6 }}
              onClick={() => handleDelete(record)}
            />
          </Space>
        );
      },
    },
  ];

  const sortedUsers = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const userData =
    searchValue !== ""
      ? sortedUsers
          .filter((user) =>
            user.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .filter((user) => user.role !== "admin")
          .map((user) => ({
            key: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: formattedDate(user?.createdAt),
            address: `${user.personalInformation.address} ${user.personalInformation.city}`,
            status: user.isVerified,
            company: user.company,
            ssn: user.personalInformation.ssn,
            gender: user.personalInformation.gender,
            plan: user.status,
          }))
      : sortedUsers
          .filter((user) => user.role !== "admin")
          .map((user) => ({
            key: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: formattedDate(user?.createdAt),
            address: `${user.personalInformation.address} ${user.personalInformation.city}`,
            status: user.isVerified,
            company: user.company,
            ssn: user.personalInformation.ssn,
            gender: user.personalInformation.gender,
            plan: user.status,
          }));

  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  // const handleCreateUser = () => {
  //   // setSelectedProperty(record);
  //   // navigate("/propertyForm/editProperty");
  // };

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          // marginTop: "20px",
        }}
      >
        <InputField
          value={searchValue}
          onChangeText={(val) => handleChange(val)}
          placeholder={"Search user"}
          size="large"
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
        {/* <AppButton
          text="Add User"
          textStyle={{
            width: 130,
          }}
          size="large"
          onClick={() => handleCreateUser()}
        /> */}
      </div>
      <AppTable
        dataSource={userData}
        columns={columns}
        onChange={(pagination: any, filtered: any, sorter: any) => {}}
        pagination={{ defaultPageSize: 10 }}
      />
      <Modal
        style={{ fontSize: "30px" }}
        title="User Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <p>Address: {selectedUser.address}</p>
            <p>Company: {selectedUser.company}</p>
          </div>
        )}
      </Modal>
    </Suspense>
  );
};

export default Users;
