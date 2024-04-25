import React, { useEffect, useState } from "react";
import { Space, Switch, Typography } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppTable, { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { deleteProperty, getAllProperties } from "../../../Redux/PropertyListing/listingAction";
import { Link } from "react-router-dom";





const PropertyListing: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useAppDispatch();
  // const { users, isLoading } = useAppSelector((state) => state.user);
  const { properties } = useAppSelector((state) => state.property);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text: string, record: DataType) => {
        return (
          // <Link to={`/profile/${record.key}`}>{text}</Link>
          <Link to={`/propertyForm/editProperty`}>
            {" "}
            <Typography.Text>{text}</Typography.Text>
          </Link>
        );
      },
     
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      
    },
    { title: "PostalCode", dataIndex: "postalCode", key: "postalCode", width: "10%" },
    { title: "Address", dataIndex: "address", key: "address", width: "25%" },
    { title: "Type", dataIndex: "role", key: "role", width: "10%" },
    { title: "Detail", dataIndex: "detail", key: "detail", width: "10%" },
    {
      title: "Approved",
      key: "approved",
      width:"10%",
      render: (_: any, record: DataType) => {
        const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
        return (
          <Space size="middle">
            <Switch
            defaultChecked={false} onChange={onChange}
            
              style={{ fontSize: 22, marginLeft: 6 , }}
              // onClick={() => handleToggle(record)}
            />
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => {
        const handleDelete = async (id: string) => {
          console.log("deletee iddd")
         await dispatch(deleteProperty(id)); 
         dispatch(getAllProperties())

        };
        return (
          <Space size="middle">
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
    dispatch(getAllProperties())
  }, [dispatch]);

  const propertyData =
    searchValue !== ""
      ? properties
          .filter((property: { name: string; }) =>
            property.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((property) => ({
            key: property._id,
            name: property.name,
            price: property.price,
            postalCode:property.postalCode,
            address:property.address,
            role: property.type,
            detail:property.detail
          }))
      : properties.map((property) => ({
          key: property._id,
          name: property.name,
          price: property.price,
          postalCode:property.postalCode,
          address:property.address,
          role: property.type,
          detail:property.detail
        }));

  const handleChange = (val: string) => {
    console.log(val);
    setSearchValue(val);
  };


  return (
    <>
      <InputField
        value={searchValue}
        onChangeText={(val) => handleChange(val)}
        placeholder={"Search properties"}
        size="large"
        inpuStyles={{ width: "20%", marginBottom: 20 }}
        suffix={<SearchOutlined />}
      />
      <AppTable
        dataSource={propertyData} 
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default PropertyListing;
