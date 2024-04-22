import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { theme } from "../../Theme/theme";
import { logo } from "../../Assets/assets";
import { loginUser } from "../../Redux/Auth/authAction";
import { useAppDispatch } from "../../Hooks/reduxHook";
import { useFormik } from "formik";
import InputField from "../../Components/InputFeild/InputFeild";
import { loginValidationSchema } from "../../Utils/validators";
import AppButton from "../../Components/Button/AppButton";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {});
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((res) => {
        if (!res.payload!.message) {
          navigate("/");
        }
      });
    },
  });

  return (
    <Box sx={{ height: "100vh", backgroundColor: theme.palette.primary.main }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item xs={7} sx={{ display: { xs: "none", sm: "block" } }}>
          <Grid container direction="column" alignItems="center">
            <img src={logo} alt="logo" width={300} height={400} />
          </Grid>
        </Grid>
        <Grid item sx={{ flexBasis: { xs: "80%", sm: "100%" } }} xs={12} sm={5}>
          <Card
            sx={{
              width: { xs: "80%", sm: 400 },
              height: { xs: "80%", sm: 300 },
              padding: theme.spacing(4),
              borderRadius: theme.spacing(2),
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" pb={4} align="center">
                Sign In
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} mb={1}>
                    <InputField
                      placeholder="Email"
                      value={formik.values.email}
                      onChangeText={formik.handleChange("email")}
                      error={
                        formik.touched.email && formik.errors.email
                          ? {
                              isError: true,
                              message: formik.errors.email as string,
                            }
                          : undefined
                      }
                      size="large"
                    />
                  </Grid>
                  <Grid item xs={12} mb={2}>
                    <InputField
                      placeholder="Password"
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      error={
                        formik.touched.password && formik.errors.password
                          ? {
                              isError: true,
                              message: formik.errors.password as string,
                            }
                          : undefined
                      }
                      inputType={"password"}
                      size="large"
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: theme.palette.error.main,
                        display: "flex",
                        justifyContent: "flex-end",
                        fontSize: "14px",
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AppButton
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      bgColor={theme.palette.primary.main}
                      onClick={formik.handleSubmit}
                    >
                      Sign In
                    </AppButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
