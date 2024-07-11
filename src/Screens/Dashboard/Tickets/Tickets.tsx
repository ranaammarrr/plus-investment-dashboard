import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Input, Modal, Select, Space, Switch, Tag, Typography } from "antd";
import {
  SearchOutlined,
  EditOutlined
} from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { formattedDate, truncateText } from "../../../Utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import FilterOption from "../../../Components/FilterOption/FilterOption";
import AppButton from "../../../Components/Button/AppButton";
import { getAllTickets } from "../../../Redux/Tickets/TicketsActions";

const { confirm } = Modal;


const Tickets: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState<
  string | undefined
  >(undefined);
  const [inputValue, setInputValue] = useState('');
  const { tickets } = useAppSelector((state) => state.ticket);

  console.log("tickets",tickets)

  const handleCategoryChange = (value: string) => {
    setSelectedTickets(value);
  };

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  // const handleInputChange = (e:any) => {
  //   setInputValue(e.target.value);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  let uniqueStatus = Array.from(new Set(tickets && tickets.map((item:any) => item.status))); 
   let filters = uniqueStatus.map((item) => ({ type:item}));

  filters.unshift({ type: "All" });

  const filteredTickets = tickets && tickets.filter((item:any) => {
    if (selectedTickets && selectedTickets !== "All") {
      return item.status === selectedTickets;
    }
    return true;
  });
  const handleResponseOpen =  (status:string)=>{
    if(status === "closed"){
      setIsModalOpen(true)
    }

  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      // sorter: (a: DataType, b: DataType) => {
      //   const createdAtA = a.createdAt || "";
      //   const createdAtB = b.createdAt || "";
      //   return createdAtA.localeCompare(createdAtB);
      // },
      render: (name: string, record: DataType) => {
        console.log(record)
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              padding: "5px",
              cursor: "pointer",
            }}
           onClick={()=>handleResponseOpen(record.status)}
          >
            {/* <img
            src={timelineImg}
            alt=""
            style={{ width: 50, marginRight: 10 }}
          /> */}
            {/* <Avatar
              style={{ marginRight: "12px" }}
              size="large"
              icon={<UserOutlined />}
            /> */}
            <span>{name}</span>
          </div>

        );
      },
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "20%",
    },

    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "20%",
     
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
      title: "Action",
      key: "status",
      width:"5%",
      render: (_: any,record: DataType) => {
       const handleResponse = () => {
        let localInputValue = ''; // Initialize a local state

          const handleLocalInputChange = (e: any) => {
            localInputValue = e.target.value;
          };
        confirm({
          icon:<EditOutlined style={{display:"none"}} />,
          title: 'Type your response',
          okText: 'Send',
          okType: 'primary',
          content: (
            <Input.TextArea
            defaultValue={localInputValue}
            onChange={handleLocalInputChange}
            placeholder='Enter your response'
            rows={4} // Setting the rows to give it a long text area appearance
          />
          ),
          cancelText: "No",
          async onOk() {
            // await dispatch(deleteCategory(id));
            // dispatch(getAllCategories());
          },
          onCancel() {},
       }
      )}
 

        return (
          <>
          { record.status === "closed" ? <AppButton
            text="Ticket Closed"
            size="small"
            textStyle={{backgroundColor:"grey", color:"white"}}
            disabled
            // onClick={() => handleResponse()}
            /> :

            <AppButton
            text="Respond"
            textStyle={{width:"110px"}}
            size="small"
            onClick={() => handleResponse()}
            />
          }
<Modal title="Response from Support" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              
              <Typography.Text>{record.response}</Typography.Text>
      </Modal>
          </>
        );
      },
    },
  ];


  // const sortedTimeline = [...filteredTickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const data:any = 
    searchValue !== ""
      ? filteredTickets && filteredTickets
          .filter((item:any) =>
            item?.user?.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item:any) => ({
            name: item?.user?.name,
            subject: item?.subject,
            message: item?.message,
            status: item?.status,
            createdAt:formattedDate(item.createdAt),
            response:item.response.text
            
          }))
      : filteredTickets && filteredTickets.map((item:any) => ({
        name: item?.user?.name,
        subject: item?.subject,
        message: item?.message,
        status: item.status,
        createdAt:formattedDate(item.createdAt),
        response:item.response.text
         
        }));




  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  

 

  return (
    <>
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
