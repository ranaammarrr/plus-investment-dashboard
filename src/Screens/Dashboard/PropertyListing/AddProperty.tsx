import React, { useEffect, useState } from "react";
import AppButton from "../../../Components/Button/AppButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Typography, Select, Input, Checkbox } from "antd";
import { Grid } from "@mui/material";
import InputField from "../../../Components/InputFeild/InputFeild";
import { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { addProperty } from "../../../Redux/EditProperty/EditPropertyAction";
import { getAllUsers } from "../../../Redux/User/userAction";
import { useFormik } from "formik";
import SelectUserBar from "../PropertyForm/SelectUserBar";
import UploadImage from "./UploadImage";
import { addPropertyValidationSchema } from "../../../Utils/validators";
import { UploadFile } from "antd/lib";
import { getAllPropertyTags } from "../../../Redux/Tags/tagsAction";

const AddProperty: React.FC = () => {
  const location = useLocation();
  const property: DataType = location.state?.property || {};
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formatPrices = (value: any) => {
    if (!value) return "";
    return value.replace(/[$,]/g, "");
  };
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { tag } = useAppSelector((state) => state.tag);
  const formik = useFormik({
    initialValues: {
      id: property.key || "",
      name: property.name || "",
      bathNo: property.bathNo || "",
      roomNo: property.roomNo || "",
      address: property.address || "",
      postalCode: property.postalCode || "",
      price: property.price || "",
      type: property.type || "",
      detail: property.detail || "",
      image: [],
      userName: "",
      companyName: "",
      role: "",
      byAdmin: true,
      isFeatured: property.isFeatured || false,
    },
    validationSchema: addPropertyValidationSchema,
    onSubmit: async (values) => {
      try {
        await addPropertyValidationSchema.validate(values, {
          abortEarly: false,
        });
        dispatch(
          addProperty({
            user_id: selectedUser._id,
            type: values.type,
            name: values.name,
            address: values.address,
            postalCode: values.postalCode,
            roomNo: values.roomNo,
            bathNo: values.bathNo,
            price: values.price,
            lat: 38.96211244028492,
            lng: -76.92993273480376,
            image: values.image,
            detail: values.detail,
            isFeatured: values.isFeatured,
            // byAdmin:true,
          })
        ).then((res) => {
          if (res.type !== "property/add/rejected") {
            navigate("/propertyListing");
          }
        });
      } catch (error: any) {
        console.error("Validation Error:", error.errors);
        // error.errors.forEach((errorMessage: any) => {
        //   message.error(errorMessage);
        // });
      }
    },
  });
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    if (selectedUser) {
      formik.setFieldValue("userName", selectedUser.name || "");
      formik.setFieldValue("companyName", selectedUser.company || "");
      formik.setFieldValue("role", selectedUser.role || "");
    }
  }, [selectedUser]);

  const handleFileChange = (info: { fileList: any }) => {
    const files = info.fileList
      .map((file: { originFileObj: any }) => file.originFileObj)
      .filter(Boolean);

    // Update Formik's state with the array of files
    formik.setFieldValue("image", files);
  };

  const handleFilePreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src) {
      // Check that file.originFileObj is not undefined before using it
      if (file.originFileObj) {
        src = URL.createObjectURL(file.originFileObj);
      } else {
        console.error(
          "File is missing originFileObj, cannot generate preview."
        );
        return; // Exit the function if there's no file to process
      }
    }

    const previewWindow = window.open();
    if (previewWindow) {
      previewWindow.document.write(`<img src="${src}" width="100%">`);
      previewWindow.document.close(); // Ensure the document stream is properly closed
    }
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user); // Store the selected user in the state
  };

  useEffect(() => {
    dispatch(getAllPropertyTags());
  }, [dispatch]);
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography.Title level={3}>Seller's Details</Typography.Title>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography.Title level={5}>Select Seller</Typography.Title>
          <SelectUserBar onSelectUser={(user) => handleSelectUser(user)} />
          {selectedUser && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography.Title level={5}>Seller's Name</Typography.Title>
                <Typography.Text>{formik.values.userName}</Typography.Text>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography.Title level={5}>Seller's Company</Typography.Title>
                <Typography.Text>{formik.values.companyName}</Typography.Text>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography.Title level={5}>Seller's Badge</Typography.Title>
                <Typography.Text>{formik.values.role}</Typography.Text>
              </Grid>
            </Grid>
          )}
        </div>
        <Divider />
        <Typography.Title level={3}>Property Details</Typography.Title>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography.Title level={5}>Title</Typography.Title>
                <InputField
                  placeholder="Name"
                  size="large"
                  value={formik.values.name}
                  onChangeText={(value) => formik.setFieldValue("name", value)}
                  error={
                    formik.touched.name && formik.errors.name
                      ? {
                          isError: true,
                          message: formik.errors.name as string,
                        }
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography.Title level={5}>No of Bathrooms</Typography.Title>
                <InputField
                  placeholder="No of Bathrooms"
                  size="large"
                  value={formik.values.bathNo}
                  onChangeText={(value) =>
                    formik.setFieldValue("bathNo", value)
                  }
                  error={
                    formik.touched.bathNo && formik.errors.bathNo
                      ? {
                          isError: true,
                          message: formik.errors.bathNo as string,
                        }
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography.Title level={5}>Number of Rooms</Typography.Title>
                <InputField
                  placeholder="No of Rooms"
                  size="large"
                  value={formik.values.roomNo}
                  onChangeText={(value) =>
                    formik.setFieldValue("roomNo", value)
                  }
                  error={
                    formik.touched.roomNo && formik.errors.roomNo
                      ? {
                          isError: true,
                          message: formik.errors.roomNo as string,
                        }
                      : undefined
                  }
                />
              </Grid>
            </Grid>
            {/* Address Card */}
            <Title level={5}>Address</Title>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <InputField
                  placeholder="Address"
                  size="large"
                  value={formik.values.address}
                  onChangeText={(value) =>
                    formik.setFieldValue("address", value)
                  }
                  error={
                    formik.touched.address && formik.errors.address
                      ? {
                          isError: true,
                          message: formik.errors.address as string,
                        }
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  placeholder="Postal Code"
                  size="large"
                  value={formik.values.postalCode}
                  onChangeText={(value) =>
                    formik.setFieldValue("postalCode", value)
                  }
                  error={
                    formik.touched.postalCode && formik.errors.postalCode
                      ? {
                          isError: true,
                          message: formik.errors.postalCode as string,
                        }
                      : undefined
                  }
                />
              </Grid>
            </Grid>
            {/* Price  */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography.Title level={5}>Price</Typography.Title>
                <InputField
                  placeholder="Price"
                  size="large"
                  value={formatPrices(formik.values.price)}
                  onChangeText={(value) => formik.setFieldValue("price", value)}
                  error={
                    formik.touched.price && formik.errors.price
                      ? {
                          isError: true,
                          message: formik.errors.price as string,
                        }
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Typography.Title level={5}>Type</Typography.Title>
                <Select
                  placeholder="Select type"
                  size="large"
                  style={{ width: "100%" }}
                  defaultValue={formik.values.type || undefined}
                  onChange={(value) => formik.setFieldValue("type", value)}
                >
                  {tag &&
                    tag.map((item, index) => (
                      <Select.Option key={index} value={item.tagName}>
                        {item.tagName}
                      </Select.Option>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={6} sm={12}>
                <Typography.Title level={5}>Description</Typography.Title>
                <Input.TextArea
                  placeholder="Description"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  value={formik.values.detail}
                  onChange={(e) =>
                    formik.setFieldValue("detail", e.target.value)
                  }
                  onBlur={formik.handleBlur("detail")}
                />
                {formik.touched.detail && formik.errors.detail === "string" && (
                  <div style={{ color: "red" }}>{formik.errors.detail}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Title level={5}>Image</Title>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "15px",
                    border: "dashed 1px",
                    borderColor: "#A8A8A8",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <UploadImage
                    maxFiles={5}
                    accept="image/*"
                    onChange={handleFileChange}
                    onPreview={handleFilePreview}
                  />
                  <div style={{ marginTop: 8, textAlign: "center" }}>
                    Accepted format .jpg .png only
                  </div>
                </div>
              </Grid>
            </Grid>
            {/* Submit Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <AppButton size="large" htmlType="submit">
                Submit
              </AppButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddProperty;
