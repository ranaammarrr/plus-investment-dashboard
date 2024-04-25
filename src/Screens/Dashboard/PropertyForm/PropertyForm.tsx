import React, { useState } from "react";
import { Grid } from "@mui/material";
import InputField from "../../../Components/InputFeild/InputFeild";
import { Card, Radio, Typography } from 'antd'; // Import Radio component from Ant Design
import { HomeOutlined, DollarOutlined, ShoppingOutlined , CameraOutlined } from '@ant-design/icons'; // Import icons
import AppButton from "../../../Components/Button/AppButton";
import { Link } from "react-router-dom";


const PropertyForm: React.FC = () => {

    const { Title } = Typography;

  const [propertyFormData, setPropertyFormData] = useState({
    name: "",
    bathNo: "",
    roomNo: "",
    address: "",
    postalCode: "",
    price: "",
    type: "" 
  });

  const handleChange = (name: string, value: string) => {
    setPropertyFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: any) => {
    setPropertyFormData({ ...propertyFormData, type: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ backgroundColor: "white", borderRadius: "5px", padding: "20px", boxShadow:"2px" }}>
        {/* Radio buttons group */}
        <Radio.Group onChange={handleRadioChange} value={propertyFormData.type}>
          <Radio.Button value="rent"><HomeOutlined /> Rent</Radio.Button>
          <Radio.Button value="sale"><DollarOutlined /> Sale</Radio.Button>
          <Radio.Button value="purchase"><ShoppingOutlined /> Purchase</Radio.Button>
        </Radio.Group>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <InputField
              placeholder="Name"
              size="large"
              value={propertyFormData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              placeholder="Bath No"
              size="large"
              value={propertyFormData.bathNo}
              onChangeText={(value) => handleChange("bathNo", value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              placeholder="Room No"
              size="large"
              value={propertyFormData.roomNo}
              onChangeText={(value) => handleChange("roomNo", value)}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Address Card */}
      <Title level={5}>Address Details</Title>
       
      <Card style={{ backgroundColor: "white", borderRadius: "5px", padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputField
              placeholder="Address"
              size="large"
              value={propertyFormData.address}
              onChangeText={(value) => handleChange("address", value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              placeholder="Postal Code"
              size="large"
              value={propertyFormData.postalCode}
              onChangeText={(value) => handleChange("postalCode", value)}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Price and Image Card */}
      <Title level={5}>Price and Image</Title>
      
      <Card style={{ backgroundColor: "white", borderRadius: "5px", padding: "20px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputField
              placeholder="Price"
              size="large"
              value={propertyFormData.price}
              onChangeText={(value) => handleChange("price", value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              placeholder="Type"
              size="large"
              value={propertyFormData.type}
              onChangeText={(value) => handleChange("type", value)}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ width: "100%", height: "200px", borderRadius: "15px", backgroundColor: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CameraOutlined style={{ fontSize: "50px", color: "#aaaaaa" }} />
            </div>
          </Grid>
        </Grid>
      </Card>


         {/* Submit Button */}
         <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <AppButton size="middle" >Submitted</AppButton>
        </Link>
      </div>
    </div>
  );
};

export default PropertyForm;
