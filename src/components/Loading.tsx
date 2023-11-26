import React from "react";
import {Avatar, Box} from "@mui/material";

interface LoadingProps {
  size?: number,
}

const Loading: React.FunctionComponent<LoadingProps> = ({size = 34}) => {
  return (
    <Box
      sx={{
        display:'flex',
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        p: 1,
    }}
    >
      <Avatar
        className="ld ld-heartbeat"
        src="/logo.svg"
        alt="Achiever Notifier Network Loading..."
        sx={{
          width: size,
          height: size,
        }}
      />
    </Box>
  )
}

export default Loading;
