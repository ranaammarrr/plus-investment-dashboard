import React, { useEffect, useState } from "react";
import { Dropdown, Modal, Space, Switch, Typography } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import {
  approvedProperty,
  deleteProperty,
  getAllProperties,
} from "../../../Redux/PropertyListing/propertyActions";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../../Components/Button/AppButton";
import FilterOption from "../../../Components/FilterOption/FilterOption";
import { getAllPropertyTags } from "../../../Redux/Tags/tagsAction";
import { truncateText } from "../../../Utils/helperFunctions";

const PropertyListing: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<DataType | null>(
    null
  );

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  // const items = filters.map((filter, index) => ({
  //   label: (
  //     <Space>
  //       {/* {filter.icon} */}
  //       {filter.type}
  //     </Space>
  //   ),
  //   key: index.toString(),
  //   onClick: () => handleCategoryChange(filter.type),
  // }));

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const { confirm } = Modal;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { properties } = useAppSelector((state) => state.property);
  const { tag } = useAppSelector((state) => state.tag);
  useEffect(() => {
    dispatch(getAllPropertyTags());
  }, [dispatch]);
  
  const filteredProperty = properties.filter((property) => {
    if (selectedCategory && selectedCategory !== "All") {
      return property.type === selectedCategory;
    }
    return true;
  });
  let filters = tag && tag.map((tag) => ({ type: tag.tagName }));

  filters.unshift({ type: "All" });

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a: DataType, b: DataType) => {
        const imageA = a.name || "";
        const imageB = b.name || "";
        return imageA.localeCompare(imageB);
      },
      render: (name:string, record: DataType) => {
        const handleNavigate = (id: string) => {
          navigate("/propertyDetails", { state: { propertyID: id } });

          <Typography.Paragraph ellipsis={{ rows: 1, expandable: true, symbol: "more" }}>
          {name}
        </Typography.Paragraph>
        };
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate(record.key)}
          >
            <img
              src={record.image[0]}
              alt=""
              style={{ width: 50, marginRight: 10 }}
            />
            <span>{record.name}</span>
          </div>
        );
      },
    },

    {
      title: "Owner",
      dataIndex: "userName",
      key: "userName",
      width: "15%",
      sorter: (a: DataType, b: DataType) =>
        a.userName.localeCompare(b.userName),
    },

    { title: "Address", dataIndex: "address", key: "address", width: "20%",
      render: (address: string) => (
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
          {address}
        </Typography.Paragraph>
      ),
     },
    {
      title: "Type",
      dataIndex: "role",
      key: "role",
      width: "10%",
      sorter: (a: DataType, b: DataType) => a.role.localeCompare(b.role),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      width: "5%",
      render: (featured: any, record: DataType) => {
        return (
          <Space size="middle">
            <CheckCircleOutlined
              disabled
              // defaultChecked={record.isFeatured}
              // onChange={onChange}
              style={{
                fontSize: 22,
                marginLeft: 6,
                color: featured ? "#06B640" : "grey",
              }}
            />
          </Space>
        );
      },
    },

    {
      title: "Approved",
      key: "approved",
      width: "10%",
      render: (_: any, record: DataType) => {
        const onChange = async (checked: boolean) => {
          try {
            await dispatch(
              approvedProperty({ propertyId: record.key, approved: checked })
            );
          } catch (error) {
            console.error("Error updating property:", error);
          }
        };
        return (
          <Space size="middle">
            <Switch
              defaultChecked={record.approved}
              onChange={onChange}
              style={{ fontSize: 22, marginLeft: 6 }}
            />
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_: any, record: DataType) => {
        const handleDelete = async (id: string) => {
          confirm({
            title: "Delete this property?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            content:
              "Deleting a property is irreversible, are you sure you want to proceed?",
            cancelText: "No",
            async onOk() {
              await dispatch(deleteProperty(id));
              dispatch(getAllProperties());
            },
            onCancel() {},
          });
        };
        const handleEdit = (record: DataType) => {
          setSelectedProperty(record);
          navigate("/propertyForm/editProperty", {
            state: { property: record },
          });
        };

        return (
          <Space size="middle">
            <EditOutlined
              style={{ fontSize: 22, marginLeft: 6 }}
              onClick={() => handleEdit(record)}
            />
            <DeleteOutlined
              style={{ fontSize: 22, marginLeft: 6 }}
              onClick={() => handleDelete(record.key)}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  const propertyData =
    searchValue !== ""
      ? filteredProperty
          .filter((property: { name: string }) =>
            property.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((property) => ({
            key: property._id,
            name: truncateText(property.name),
            price: parseFloat(property.price).toLocaleString('en-US', {
              style: "currency",
              currency: "USD",
              currencyDisplay: "symbol",
              minimumFractionDigits: 0
            }),
            postalCode: property.postalCode,
            address: truncateText(property.address),
            // createdAt:property.createdAt
            role: property.type,
            detail: property.detail,
            bathNo: property.bathNo,
            image: property.image,
            roomNo: property.roomNo,
            type: property.type,
            approved: property.approved,
            userName: property.user.name,
            featured: property.isFeatured,
            latitude:property.location.lat,
            longitude:property.location.lng,

          }))
          .reverse()
      : filteredProperty.map((property) => ({
          key: property._id,
          name: property.name,
          price: parseFloat(property.price).toLocaleString('en-US', {
            style: "currency",
            currency: "USD",
            currencyDisplay: "symbol",
            minimumFractionDigits: 0
          }),
          postalCode: property.postalCode,
          address: property.address,
          // createdAt:property.c,
          role: property.type,
          detail: property.detail,
          bathNo: property.bathNo,
          roomNo: property.roomNo,
          image: property.image,
          type: property.type,
          approved: property.approved,
          userName: property.user.name,
          featured: property.isFeatured,
          latitude:property.location.lat,
            longitude:property.location.lng,
        }))
        .reverse();

  const handleChange = (val: string) => {
    setSearchValue(val);
  };

  const handleAddProperty = () => {
    navigate("/propertyForm/addProperty");
  };

  return (
    <>
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
          placeholder={"Search properties"}
          size="large"
          inpuStyles={{ width: "90%" }}
          suffix={<SearchOutlined />}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FilterOption
            options={filters}
            onChangeFilter={handleCategoryChange}
            selectedCategory={selectedCategory}
          />

          <AppButton
            text="Add Property"
            size="large"
            onClick={() => handleAddProperty()}
          />
        </div>
      </div>

      <AppTable
        dataSource={propertyData}
        columns={columns}
        onChange={(pagination: any, filtered: any, sorter: any) => {}}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default PropertyListing;
