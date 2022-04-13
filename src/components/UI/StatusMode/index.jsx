import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function StatusMode(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {props.active ? (
        <Box
          sx={{
            bgcolor: "#2dce89",
            width: "0.375rem",
            height: " 0.375rem",
            marginRight: "0.375rem",
            verticalAlign: "middle",
            borderRadius: "50%",
          }}
        />
      ) : (
        <Box
          sx={{
            bgcolor: "#fb6340",
            width: "0.375rem",
            height: " 0.375rem",
            marginRight: "0.375rem",
            verticalAlign: "middle",
            borderRadius: "50%",
          }}
        />
      )}
      <Typography variant="body2" color="#525F7F" sx={{ fontWeight: 200 }}>
        {props.active ? "Active" : "Inactive"}
      </Typography>
    </Box>
  );
}

export default StatusMode;
