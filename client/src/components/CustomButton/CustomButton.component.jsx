import { Button, Box } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      sx={{
        backgroundColor: "#010836",
        color: "#fff",
        padding: "5px 50px",
        fontWeight: 600,
        letterSpacing: "1px",
        "&:hover": {
          backgroundColor: "#21C8AA",
          color: "#fff",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
