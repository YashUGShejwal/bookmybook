import { TextField } from "@mui/material";
import React from "react";

const CustomTextfield = ({ ...props }) => {
  return <TextField variant="standard" {...props} />;
};

export default CustomTextfield;
