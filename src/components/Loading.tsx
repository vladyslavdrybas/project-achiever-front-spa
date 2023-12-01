import React from "react";
import {Avatar, Box} from "@mui/material";
import Logo from "@/components/Logo";

interface LoadingProps {
  size?: number,
}

const Loading: React.FunctionComponent<LoadingProps> = ({size = 34}) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <Box
        component="div"
        sx={{
          position: 'relative',
          top: 0,
          left: 0,
          zIndex: 100,
          display: 'block',
          // p: size/100 < 0.5 ? '4px' : size/100,
          bgcolor: 'secondary.background',
          // boxShadow: `rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;`,
          borderRadius: '4px',
          minWidth: size,
          minHeight: size,
        }}
      >
        {/*<Avatar*/}
        {/*  className="ld ld-heartbeat"*/}
        {/*  src="/asset/img/ANN_V1_crop.png"*/}
        {/*  alt="Achiever Notifier Network Loading..."*/}
        {/*  sx={{*/}
        {/*    width: size,*/}
        {/*    height: size,*/}
        {/*  }}*/}
        {/*/>*/}

        <Box
          component="img"
          sx={{
            width: size,
            height: size,
            position: 'absolute',
            zIndex: 103,
          }}
          src={'/asset/img/ANN_V1_crop_a.png'}
        />

        <Box
          component="img"
          sx={{
            width: size,
            height: size,
            position: 'absolute',
            zIndex: 101,
          }}
          src={'/asset/img/ANN_V1_crop_n_small.png'}
        />

        <Box
          component="img"
          sx={{
            width: size,
            height: size,
            position: 'absolute',
            zIndex: 102,
          }}
          src={'/asset/img/ANN_V1_crop_n_big.png'}
        />
      </Box>
    </Box>
  )
}

export default Loading;
