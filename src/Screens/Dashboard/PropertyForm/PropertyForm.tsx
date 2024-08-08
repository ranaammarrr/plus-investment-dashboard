import React, { useEffect, useState } from "react";
import AppButton from "../../../Components/Button/AppButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Select, Input, Checkbox, Card, Avatar } from "antd";
import { Grid } from "@mui/material";
import InputField from "../../../Components/InputFeild/InputFeild";
import { DataType } from "../../../Components/Table/AppTable";
import { useAppDispatch, useAppSelector } from "../../../Hooks/reduxHook";
import { editProperty } from "../../../Redux/EditProperty/EditPropertyAction";
import { getAllUsers } from "../../../Redux/User/userAction";
import { useFormik } from "formik";
import { addPropertyValidationSchema } from "../../../Utils/validators";
import { UploadFile } from "antd/lib";
import UploadImage from "../PropertyListing/UploadImage";
import { uploadMedia } from "../../../Utils/helperFunctions";

const PropertyForm: React.FC = () => {
  const location = useLocation();
  const property: DataType = location.state?.property || {};
  const { Title } = Typography;
  const { tag } = useAppSelector((state) => state.tag);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: property.key || "",
      name: property.name || "",
      bathNo: property.bathNo || "",
      roomNo: property.roomNo || "",
      address: property.address || "",
      postalCode: property.postalCode || "",
      price: property.stringPrice || "",
      type: property.type || "",
      image: property.image || "",
      detail: property.detail || "",
      isFeatured: property.isFeatured || false,
    },
    validationSchema: addPropertyValidationSchema,
    onSubmit: async (values) => {
      try {
        await addPropertyValidationSchema.validate(values, {
          abortEarly: false,
        });
        if (values.image && values.image.length > 0) {
          setIsUploading(true);
          const uploadedImages = await uploadMedia(values.image);
          values.image = uploadedImages;
          setIsUploading(false);
          console.log("uploadedImages", uploadedImages);
        }
        dispatch(
          editProperty({
            property_id: property.key,
            type: values.type,
            name: values.name,
            address: values.address,
            postalCode: values.postalCode,
            roomNo: values.roomNo,
            bathNo: values.bathNo,
            price: values.price,
            detail: values.detail,
            isFeatured: values.isFeatured,
            image: values.image,
          })
        ).then((res) => {
          if (res.type !== "editProperty/all/rejected") {
            navigate("/propertyListing");
          }
        });
      } catch (error: any) {
        console.error("Validation Error:", error.errors);
      }
    },
  });
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleFileChange = (info: { fileList: any }) => {
    const files = info.fileList
      .map((file: { originFileObj: any }) => file.originFileObj)
      .filter(Boolean);

    formik.setFieldValue("image", files);
  };

  const handleFilePreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src) {
      if (file.originFileObj) {
        src = URL.createObjectURL(file.originFileObj);
      } else {
        console.error(
          "File is missing originFileObj, cannot generate preview."
        );
        return;
      }
    }

    const previewWindow = window.open();
    if (previewWindow) {
      previewWindow.document.write(`<img src="${src}" width="100%">`);
      previewWindow.document.close();
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
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
                  value={formik.values.price}
                  onChangeText={(value) => {
                    // Remove non-digit characters
                    formik.setFieldValue("price", value);
                  }}
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
                <Title level={5}>Want to make this property featured?</Title>
                <Checkbox
                  checked={formik.values.isFeatured}
                  onChange={(e) =>
                    formik.setFieldValue("isFeatured", e.target.checked)
                  }
                >
                  {formik.values.isFeatured ? "Featured" : "Not Featured"}
                </Checkbox>
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
                    flexDirection: "row",
                  }}
                >
                  {formik.values.image.map((img: string, index: number) => (
                    <Card key={index} style={{ marginRight: "10px" }}>
                      <img
                        style={{ height: "50px", width: "50px" }}
                        src={img}
                      />
                    </Card>
                  ))}
                  <UploadImage
                    maxFiles={5}
                    accept="image/*"
                    onChange={handleFileChange}
                    onPreview={handleFilePreview}
                  />
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

export default PropertyForm;
