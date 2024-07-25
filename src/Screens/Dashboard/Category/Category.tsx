import React, { useEffect, useState } from "react";
import { Select, Space, Typography } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  RadarChartOutlined,
  RiseOutlined,
  BoldOutlined,
  ExclamationCircleOutlined,
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
import {
  getAllCategories,
  createCategories,
  deleteCategory,
} from "../../../Redux/Category/categoryAction";
import { formattedDate } from "../../../Utils/helperFunctions";

const { confirm } = Modal;

const Category: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [labelValue, setLabelValue] = useState<string>("");
  const [addCategorySearch, setAddCategorySearch] = useState<string>("");

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

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
    await dispatch(
      createCategories({ label: labelValue, icon: addCategorySearch })
    );
    dispatch(getAllCategories());
    setLabelValue("");
  };

  const handleCancel = () => {
    setOpen(false);
  };

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

  const handleAddCategory = () => {
    showModal();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "label",
      key: "label",
      width: "10%",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      width: "10%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "10%",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
    },

    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: any, record: DataType) => {
        const handleDelete = async (id: string) => {
          confirm({
            title: "Delete this category?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            content:
              "Deleting a category is irreversible, are you sure you want to proceed?",
            cancelText: "No",
            async onOk() {
              await dispatch(deleteCategory(id));
              dispatch(getAllCategories());
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
    dispatch(getAllCategories());
  }, [dispatch]);

  const categoryData =
    searchValue !== ""
      ? categories
          .filter((category) =>
            category.label.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((category) => ({
            label: category.label,
            icon: category.icon,
            value: category.value,
            createdAt: formattedDate(category.createdAt),
            id: category._id,
          }))
          .reverse()
      : categories
          .map((category) => ({
            label: category.label,
            icon: category.icon,
            value: category.value,
            createdAt: formattedDate(category.createdAt),
            id: category._id,
          }))
          .reverse();

  return (
    <>
      {/* Modal Code....  */}

      <Modal
        open={open}
        title="Add category"
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
            placeholder={"Enter category name"}
            size="large"
            inpuStyles={{ width: "100%" }}
          />
        </div>
        <div>
          <Typography.Title level={5}>Icon</Typography.Title>
          <Select
            placeholder="Select Icon"
            size="large"
            value={addCategorySearch}
            style={{ width: "100%" }}
            onChange={(val) => handleAddSearch(val)}
            showSearch
            filterOption={(input, option) =>
              typeof option?.value === "string" &&
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
        </div>
      </Modal>

      {/* End Modal COde.....  */}

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
          placeholder={"Search category"}
          size="large"
          // inpuStyles={{ width: "20%", marginBottom: 20 }}
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
        <AppButton
          text="Add category"
          size="large"
          onClick={() => handleAddCategory()}
        />
      </div>
      <div style={{ minWidth: "50%" }}>
        <AppTable
          dataSource={categoryData}
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
        />
      </div>
    </>
  );
};

export default Category;
