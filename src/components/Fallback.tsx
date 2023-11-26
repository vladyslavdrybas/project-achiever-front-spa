import React from "react";
import {
  Box,
  useTheme,
} from "@mui/material";
import Loading from "@/components/Loading";

const Fallback: React.FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.secondary.background,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        m: 0,
        p: 0,
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Loading size={89}/>
    </Box>
  );
}

export default Fallback;
