import React, { useEffect, useState } from "react";
import {
  Avatar,
  Dropdown,
  Input,
  Menu,
  Modal,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from "antd";
import { SearchOutlined, EditOutlined, DownOutlined } from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { formattedDate, truncateText } from "../../../Utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import FilterOption from "../../../Components/FilterOption/FilterOption";
import AppButton from "../../../Components/Button/AppButton";
import {
  createResponse,
  getAllTickets,
} from "../../../Redux/Tickets/TicketsActions";

const { confirm } = Modal;

const Tickets: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseText, setResponseText] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState<string | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = useState("");
  const [textValue, setTextValue] = useState<string>("");
  const [recordId, setRecordId] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);

  const { tickets } = useAppSelector((state) => state.ticket);
  const handleCategoryChange = (value: string) => {
    setSelectedTickets(value);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  // const handleInputChange = (e:any) => {
  //   setInputValue(e.target.value);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  let uniqueStatus = Array.from(
    new Set(tickets && tickets.map((item: any) => item.status))
  );
  let filters = uniqueStatus.map((item) => ({ type: item }));

  filters.unshift({ type: "All" });

  const filteredTickets =
    tickets &&
    tickets.filter((item: any) => {
      if (selectedTickets && selectedTickets !== "All") {
        return item.status === selectedTickets;
      }
      return true;
    });
  const handleResponseOpen = (id: string) => {
    const ticket = tickets.find((item: any) => item._id === id);
    if (ticket && ticket.status === "closed") {
      setResponseText(ticket.response?.text || "No response available");
      setIsModalOpen(true);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleLocalInputChange = (e: any) => {
    setTextValue(e.target.value);
  };

  const handleMenuClick = (recordId: string) => {
    setDropdownVisible(dropdownVisible === recordId ? null : recordId);
  };

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      key: "ticketId",
      width: "10%",
    },

    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "20%",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "15%",
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      sorter: (a: DataType, b: DataType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: string) => (
        <Tag
          color={
            status == "open"
              ? "#e09f3e"
              : status == "closed"
              ? "#386641"
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
          {status && status}
        </Tag>
      ),
    },
    {
      title: "Support",
      dataIndex: "name",
      key: "name",
      width: "10%",
      sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
    },
    {
      title: "Action",
      key: "status",
      width: "5%",
      render: (_: any, record: DataType) => {
        return (
          <>
            {record.status === "closed" ? (
              <AppButton
                text="View Reponse"
                size="small"
                textStyle={{ color: "white" }}
                onClick={() => handleResponseOpen(record.id)}
              />
            ) : (
              <AppButton
                text="Respond"
                size="small"
                textStyle={{ width: "115px" }}
                onClick={() => openModal(record.id)}
              />
            )}
          </>
        );
      },
    },
  ];

  const sortedTickets = [...filteredTickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const data: any =
    searchValue !== ""
      ? sortedTickets &&
        sortedTickets
          .filter((item: any) =>
            item?.subject.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item: any) => ({
            id: item._id,
            name: item?.user?.name,
            subject: item?.subject,
            message: item?.message,
            status: item?.status,
            createdAt: formattedDate(item.createdAt),
            response: item?.response?.text,
            ticketId: item.ticketID,
          }))
      : sortedTickets &&
        sortedTickets.map((item: any) => ({
          id: item._id,
          name: item?.user?.name,
          subject: item?.subject,
          message: item?.message,
          status: item.status,
          createdAt: formattedDate(item.createdAt),
          response: item?.response?.text,
          ticketId: item.ticketID,
        }));

  const handleChange = (val: string) => {
    setSearchValue(val);
  };
  const hanndleOk = async () => {
    await dispatch(
      createResponse({
        text: textValue,
        ticketId: recordId,
      })
    );
    dispatch(getAllTickets());
    setIsModalVisible(false);
  };
  const hanndleCancel = () => {
    setIsModalVisible(false);
  };
  const openModal = (id: string) => {
    setRecordId(id);
    setIsModalVisible(true);
  };

  return (
    <>
      <Modal
        title="Add Response"
        open={isModalVisible}
        onCancel={hanndleCancel}
        onOk={hanndleOk}
      >
        <Input.TextArea
          defaultValue={textValue}
          onChange={handleLocalInputChange}
          placeholder="Enter your response"
          rows={4}
        />
      </Modal>
      <Modal
        // style={{ marginTop: "100px" }}
        title="Response from Support"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <Typography.Title level={5}>Response</Typography.Title> */}
        <Typography.Text>{responseText}</Typography.Text>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <InputField
          value={searchValue}
          onChangeText={(val) => handleChange(val)}
          placeholder={"Search ticket"}
          size="large"
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FilterOption
            options={filters}
            onChangeFilter={handleCategoryChange}
            selected={selectedTickets}
          />
        </div>
      </div>
      <AppTable
        dataSource={data}
        columns={columns}
        onChange={(pagination: any, filtered: any, sorter: any) => {}}
        pagination={{ defaultPageSize: 8 }}
      />
    </>
  );
};

export default Tickets;
