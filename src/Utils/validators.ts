import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const addPropertyValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  bathNo: Yup.number()
    .typeError("Bath number must be a number")
    .required("Number of bathrooms is required")
    .positive("Number of bathrooms must be positive")
    .integer("Number of bathrooms must be an integer"),
  roomNo: Yup.number()
    .typeError("Room number must be a number")
    .required("Number of rooms is required")
    .positive("Number of rooms must be positive")
    .integer("Number of rooms must be an integer"),
  address: Yup.string().required("Address is required"),
  postalCode: Yup.number()
    .typeError("Postal code must be a number")
    .required("Postal code is required")
    .positive("Postal code must be positive")
    .integer("Postal code must be an integer"),
  price: Yup.string().required("Price is required"),
  type: Yup.string().required("Type is required"),
  detail: Yup.string().required("Detail is required"),
});
