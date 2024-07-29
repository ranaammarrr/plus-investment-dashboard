import React from "react";
import { Typography, Divider, Card, Row, Col } from "antd";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../../Utils/validators";
import { useAppDispatch } from "../../../Hooks/reduxHook";
import { changePassword } from "../../../Redux/Auth/authAction";
import InputField from "../../../Components/InputFeild/InputFeild";
import AppButton from "../../../Components/Button/AppButton";

const ProfileSetting: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values: any) => {
      dispatch(changePassword(values)).then((res) => {
        if (!res.payload!.message) {
          navigate("/users");
        }
      });
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundColor: "#E7E8D8",
        padding: "20px",
      }}
    >
      <Card style={{ width: 600 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
          }}
        >
          <Typography.Title
            level={4}
            style={{
              display: "flex",
              flexDirection: "column",
              // marginLeft: "5px",
              margin: "0px 10px",
            }}
          >
            Change Password
          </Typography.Title>
        </div>
        {/* <Divider /> */}
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col span={24}>
              <Typography.Title level={5}>Old Password</Typography.Title>
              <InputField
                placeholder="Old Password"
                size="large"
                value={formik.values.oldPassword}
                onChangeText={(value) =>
                  formik.setFieldValue("oldPassword", value)
                }
                error={
                  formik.touched.oldPassword && formik.errors.oldPassword
                    ? {
                        isError: true,
                        message: formik.errors.oldPassword as string,
                      }
                    : undefined
                }
              />
            </Col>
            <Col span={24}>
              <Typography.Title level={5}>New Password</Typography.Title>
              <InputField
                placeholder="New Password"
                size="large"
                value={formik.values.newPassword}
                onChangeText={formik.handleChange("newPassword")}
                error={
                  formik.touched.newPassword && formik.errors.newPassword
                    ? {
                        isError: true,
                        message: formik.errors.newPassword as string,
                      }
                    : undefined
                }
              />
            </Col>
            <Col span={24}>
              <Typography.Title level={5}>Confirm Password</Typography.Title>
              <InputField
                placeholder="Confirm Password"
                size="large"
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange("confirmPassword")}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? {
                        isError: true,
                        message: formik.errors.confirmPassword as string,
                      }
                    : undefined
                }
              />
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <AppButton type="primary" size="large" htmlType="submit">
              Change Password
            </AppButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSetting;
