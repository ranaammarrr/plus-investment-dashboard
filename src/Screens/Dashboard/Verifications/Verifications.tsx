import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import {
  approveVerificationStatus,
  getAllVerificationsRequests,
} from "../../../Redux/Verifications/verificationsAction";
import { formattedDate } from "../../../Utils/helperFunctions";
import { Card, Col, Modal, Row, Space, Tag, Tooltip, Typography } from "antd";
import AppButton from "../../../Components/Button/AppButton";
import { theme } from "../../../Theme/theme";
import "./verification.css";

const Verifications: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<any>({});

  const dispatch = useAppDispatch();
  const { verifications } = useAppSelector((state) => state.verification);

  useEffect(() => {
    dispatch(getAllVerificationsRequests());
  }, [dispatch]);

  const showModal = (image: string) => {
    setModalImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalImage("");
  };

  const uniqueUsers = Array.from(
    new Set(verifications?.map((v) => v.user.name))
  );
  const filteredUsers = uniqueUsers.map((i) => ({ text: i, value: i }));

  const groupedByUser: any = verifications?.reduce(
    (acc: any, verification: any) => {
      const userId: any = verification.user.userId;
      if (!acc[userId]) acc[userId] = [];
      acc[userId].push(verification);
      return acc;
    },
    {}
  );

  const mostRecentData = [];
  for (const userId in groupedByUser) {
    const userVerifications = groupedByUser[userId];
    userVerifications.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    mostRecentData.push(userVerifications[0]);
  }

  const countVerificationStatuses = (verifications: any) => {
    const counts = {
      pending: 0,
      approved: 0,
      rejected: 0,
      total: 0,
    };
    counts.total += verifications.length;
    verifications.forEach((verification: any) => {
      if (verification.status === "pending") {
        counts.pending += 1;
      } else if (verification.status === "approved") {
        counts.approved += 1;
      } else if (verification.status === "rejected") {
        counts.rejected += 1;
      }
    });

    return counts;
  };
  const counts = verifications
    ? countVerificationStatuses(verifications)
    : null;
  const data =
    filteredInfo.userName && filteredInfo.userName.length
      ? verifications.map((verification) => ({
          userName: verification.user.name,
          doc_type: verification.doc_type,
          item: verification.item,
          status: verification.status,
          createdAt: formattedDate(verification.createdAt),
          id: verification._id,
          userId: verification.user.userId,
        }))
      : mostRecentData.map((verification) => ({
          userName: verification.user.name,
          doc_type: verification.doc_type,
          item: verification.item,
          status: verification.status,
          createdAt: formattedDate(verification.createdAt),
          id: verification._id,
          userId: verification.user.userId,
        }));

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
  };
  console.log("filteredInfo", filteredInfo);
  const handleSearch = (val: string) => {
    setSearchValue(val);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      width: "15%",
      sorter: (a: DataType, b: DataType) =>
        a.userName.localeCompare(b.userName),
      filters: filteredUsers,
      onFilter: (value: any, record: any) => record.userName === value,
      filterMultiple: true,
      render: (userName: string, record: DataType) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          <span>{userName}</span>
        </div>
      ),
    },
    {
      title: "Document Type",
      dataIndex: "doc_type",
      key: "doc_type",
      width: "12%",
      sorter: (a: any, b: any) => a.doc_type.localeCompare(b.doc_type),
    },
    {
      title: "Items",
      dataIndex: "item",
      key: "item",
      width: "20%",
      render: (item: string, record: DataType) => {
        const isLink = item.startsWith("http");
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              padding: "5px",
              cursor: isLink ? "pointer" : "default",
            }}
            onClick={() => isLink && showModal(item)}
          >
            {isLink ? (
              <Tooltip title="Click to view the image">Image</Tooltip>
            ) : (
              <span>{item}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      sorter: (a: DataType, b: DataType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
      render: (status: string) => (
        <Tag
          color={
            status === "approved"
              ? "success"
              : status === "pending"
              ? "orange"
              : status === "rejected"
              ? "red"
              : "#f4d35e"
          }
          bordered={false}
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 14,
            padding: "2px 4px",
          }}
        >
          {status && status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "status",
      width: "8%",
      render: (_: any, record: DataType) => {
        const onChange = async (status: any) => {
          try {
            await dispatch(
              approveVerificationStatus({
                status: status,
                verificationId: record.id,
              })
            );
            dispatch(getAllVerificationsRequests());
          } catch (error) {
            console.error("Error updating user:", error);
          }
        };
        return (
          <Space size="middle">
            <AppButton
              bgColor={
                record.status === "approved"
                  ? "grey"
                  : theme.palette.primary.main
              }
              text="Approve"
              onClick={() => onChange("approved")}
              disabled={record.status === "approved"}
            />
            <AppButton
              text="Reject"
              bgColor={record.status === "rejected" ? "grey" : "#C80036"}
              onClick={() => onChange("rejected")}
              disabled={record.status === "rejected"}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {counts && (
        <Row gutter={24} style={{ marginBottom: "20px", padding: 20 }}>
          <Col span={6}>
            <Card
              className="zoom-card"
              bordered={false}
              hoverable
              style={{
                textAlign: "center",
                borderRadius: "8px",
                background: "#ECF2FF",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography.Text
                  style={{
                    color: "#5d87ff",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {counts.total}
                </Typography.Text>
                <Typography.Text
                  style={{
                    color: "#5d87ff",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Total Requests
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="zoom-card"
              hoverable
              bordered={false}
              style={{
                textAlign: "center",
                borderRadius: "8px",
                background: "#FEF5E5",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography.Text
                  style={{
                    color: "#ffae1f",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {counts.pending}
                </Typography.Text>
                <Typography.Text
                  style={{
                    color: "#ffae1f",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Pending Requests
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              bordered={false}
              hoverable
              className="zoom-card"
              style={{
                textAlign: "center",
                borderRadius: "8px",
                background: "#E6FFFA",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography.Text
                  style={{
                    color: "#13deb9",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {counts.approved}
                </Typography.Text>
                <Typography.Text
                  style={{
                    color: "#13deb9",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Approved Requests
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="zoom-card"
              hoverable
              bordered={false}
              style={{
                textAlign: "center",
                borderRadius: "8px",
                background: "#FDEDE8",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography.Text
                  style={{
                    color: "#fa896b",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {counts.rejected}
                </Typography.Text>
                <Typography.Text
                  style={{
                    color: "#fa896b",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Rejected Requests
                </Typography.Text>
              </div>
            </Card>
          </Col>
        </Row>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <InputField
          value={searchValue}
          onChangeText={handleSearch}
          placeholder={"Search"}
          size="large"
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
      </div>
      <div style={{ padding: 20 }}>
        <AppTable
          dataSource={data}
          columns={columns}
          onChange={handleChange}
          pagination={{ defaultPageSize: 8 }}
        />
      </div>
      <Modal open={isModalVisible} footer={null} onCancel={handleCancel}>
        <div style={{ padding: "20px" }}>
          <img
            src={modalImage}
            alt="Verification"
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Verifications;
