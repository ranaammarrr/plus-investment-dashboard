import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { Select, Avatar } from "antd";
import InputField from "../../../Components/InputFeild/InputFeild";
import { theme } from "../../../Theme/theme";
import { UserOutlined } from "@ant-design/icons";
import AppButton from "../../../Components/Button/AppButton";

const { Option } = Select;

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    gender: undefined,
    company: "",
  });

  const handleChange = (name: string, value: string) => {
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        background: theme.palette.secondary.light,
        minHeight: "70%",
        padding: "40px 0",
        borderRadius: "15px",
        border: "1px solid #ccc",
      }}
    >
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "50%",
              width: "fit-content",
              margin: "0 auto",
              padding: "8px",
            }}
          >
            <Avatar
              icon={<UserOutlined style={{ fontSize: 110 }} />}
              style={{ width: 120, height: 120 }}
            />
          </Box>
          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6}>
              <InputField
                placeholder="Full Name"
                size="large"
                value={profileData.fullName}
                onChangeText={(value) => handleChange("fullName", value)}
                style={{ marginBottom: "20px" }}
              />
              <Select
                placeholder="Select Gender"
                style={{ width: "100%", marginBottom: "20px" }}
                size="large"
                value={profileData.gender}
                onChange={(value: string | undefined) =>
                  handleChange("gender", value ? value.toString() : "")
                }
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                placeholder="Email"
                size="large"
                value={profileData.email}
                onChangeText={(value) => handleChange("email", value)}
                style={{ marginBottom: "20px" }}
              />
              <InputField
                placeholder="Company"
                size="large"
                value={profileData.company}
                onChangeText={(value) => handleChange("company", value)}
              />
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AppButton
              text="Save"
              textStyle={{
                marginRight: "15px",
                width: 120,
              }}
              size="large"
            />
            <AppButton
              text="Cancel"
              textStyle={{
                width: 120,
              }}
              size="large"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
