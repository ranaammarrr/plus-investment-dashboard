import React, { useEffect, useState } from "react";
import { Select, Space, Typography } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  RadarChartOutlined,
  RiseOutlined,
  BoldOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import {
  deleteProperty,
  getAllProperties,
} from "../../../Redux/PropertyListing/propertyActions";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../../Components/Button/AppButton";
import { Button, Modal } from "antd";
import { getAllCategories, createCategories, deleteCategory } from "../../../Redux/Category/categoryAction";
import { deleteTag, getAllPropertyTags, postTags } from "../../../Redux/Tags/tagsAction";
import { formattedDate } from "../../../Utils/helperFunctions";

const { confirm } = Modal;

const PropertyType: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [labelValue, setLabelValue] = useState<string>("");
  const [addCategorySearch, setAddCategorySearch] = useState<string>("");

  const dispatch = useAppDispatch();
  const { tag } = useAppSelector((state) => state.tag);

  // Modal handlers Start.... 
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
   await dispatch(postTags({tagName:labelValue}))
   dispatch(getAllPropertyTags())
    setLabelValue("");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Modal Handlers Ended ....

  const handleChange = (val: string) => {
    setSearchValue(val);
  };


  const handleLabelChange = (value: string) => {
    setLabelValue(value);
  };

  const handleAddCategory = () => {
    showModal();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "label",
      key: "label",
      width: "10%",
      sorter: (a:  DataType, b:DataType ) => a.label.localeCompare(b.label),
    },
    {
      title: "Published",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      sorter: (a: DataType, b: DataType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  
    {
      title: "Action",
      key: "action",
      width:"10%",
      render: (_: any, record: DataType) => {
        const handleDelete = async (_id: string) => {
          confirm({
            title: "Delete this property-type?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            content:
              "Deleting a property-type is irreversible, are you sure you want to proceed?",
            cancelText: "No",
            async onOk() {
          await dispatch(deleteTag({tag_id: _id}));
          dispatch(getAllPropertyTags());
        },
        onCancel() {},
      });
        };

        return (
          <Space size="middle">
            <DeleteOutlined
              style={{ fontSize: 22, marginLeft: 6 }}
              onClick={() => handleDelete(record.id)}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllPropertyTags());
  }, [dispatch]);

  const sortedTags = [...tag].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const tagsData =
    searchValue !== ""
      ? sortedTags
          .filter((item) =>
            item.tagName.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => ({
            id: item._id,
            label: item.tagName,
            createdAt:formattedDate(item.createdAt)
          }))
      : sortedTags.map((item) => ({
        id: item._id,
        label: item.tagName,
        createdAt:formattedDate(item.createdAt)
      }));



  return (
    <>
      {/* Modal Code....  */}

      <Modal
        open={open}
        title="Add property type"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <AppButton
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </AppButton>,
        ]}
      >
        <div>
          <Typography.Title level={5}>Name</Typography.Title>
          <InputField
            value={labelValue}
            onChangeText={(value) => handleLabelChange(value)}
            placeholder={"Enter property type"}
            size="large"
            inpuStyles={{ width: "100%" }}
          />
        </div>
        {/* <div>
          <Typography.Title level={5}>Icon</Typography.Title>
          <Select
            placeholder="Select Icon"
            size="large"
            value={addCategorySearch}
            style={{ width: "100%" }}
            onChange={(val) => handleAddSearch(val)}
            showSearch
            filterOption={(input, option) =>
              typeof option?.value === 'string' &&
              option?.value.toLowerCase().includes(input.toLowerCase())
            }
            
          >
            <Select.Option value="RealEstate">
              <RadarChartOutlined style={{ fontSize: "18px" }} /> Real Estate
            </Select.Option>
            <Select.Option value="Crypto">
              <BoldOutlined style={{ fontSize: "18px" }} /> Crypto
            </Select.Option>
            <Select.Option value="Finance">
              <RiseOutlined style={{ fontSize: "18px" }} /> Finance
            </Select.Option>
          </Select>
        </div> */}
      </Modal>

      {/* End Modal COde.....  */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
        // marginTop: "20px",
      }}>

      <InputField
        value={searchValue}
        onChangeText={(val) => handleChange(val)}
        placeholder={"Search property type"}
        size="large"
        // inpuStyles={{ width: "20%", marginBottom: 20 }}
        inpuStyles={{ width: "90%" }}
        suffix={<SearchOutlined />}
        />
        <AppButton
          text="Add property type"
          size="large"
          onClick={() => handleAddCategory()}
          />

          </div>
      <div style={{ minWidth: "50%" }}>
        <AppTable
          dataSource={tagsData}
          columns={columns}
          onChange={(pagination: any, filtered: any, sorter: any) => {
        }}
          pagination={{ defaultPageSize: 10 }}
        />
      </div>
    </>
  );
};

export default PropertyType;
