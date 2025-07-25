"use client";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup.string().required("Password is required."),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"])
    .required("Choose your gender."),
  user_type: yup
    .string()
    .oneOf(["admin", "customer"], "Please enter Admin or Customer")
    .required("Choose your role."),
});
export default function RegisterForm() {
  const router = useRouter();
  const role = [
    { value: "admin", label: "Admin" },
    { value: "customer", label: "Customer" },
  ];
  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: {} });

  const onClickRegister = async (formData) => {
    try {
      console.log("formData", formData);
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        user_type: formData.user_type,
      };

      const response = await axios.post("/api/users", userData);
      // console.log("Responsedata", response);

      //route to login

      if (response.status === 200 || response.status === 201) {
        alert("Registration successful , please log in");
        router.push("/login");
      } else {
        alert("Registration Failed.");
      }
    } catch (error) {
      console.log("Data fetching error", error);
      alert(error || "Something went wrong!");
    }
    reset();
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onClickRegister)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography mt={10} variant="subtitled2" fontWeight={"bold"}>
        Please , register to sign in
      </Typography>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 500, p: 2, mt: 1 }}>
        <Stack spacing={3}>
          <TextField
            label="Enter your name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            label="Enter your email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            type="password"
            label="Enter your password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <FormControl error={!!errors.user_type}>
            <InputLabel id="userType">User Type</InputLabel>
            <Controller
              name="user_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="User Type"
                  labelId="userType"
                  value={field.value || ""}
                >
                  {role.map((type, index) => (
                    <MenuItem key={index} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            ></Controller>
            <FormHelperText>{errors.user_type?.message}</FormHelperText>
          </FormControl>
          <FormControl error={!!errors.gender}>
            <FormLabel id="gender">Gender</FormLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup row {...field}>
                  {gender.map((genderType, index) => (
                    <FormControlLabel
                      sx={{ color: "orange" }}
                      key={index}
                      value={genderType.value}
                      control={<Radio />}
                      label={genderType.label}
                    ></FormControlLabel>
                  ))}
                </RadioGroup>
              )}
            ></Controller>
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ bgcolor: "orange" }}>
            REGISTER
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
