import React from "react";
import {Box, SvgIcon} from "@mui/material";
import {ReactComponent as LogoIcon} from "@/artifacts/asset/img/ANN_V1_crop.svg";

interface LogoProps {
  size?: number,
}

const Logo: React.FunctionComponent<LogoProps> = ({size = 34}) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        p: size/100 < 0.5 ? '4px' : size/100,
        bgcolor: 'secondary.background',
        boxShadow: `rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;`,
        borderRadius: '4px',
      }}
    >
      {/*<Box*/}
      {/*  component="img"*/}
      {/*  sx={{*/}
      {/*    width: size,*/}
      {/*    height: size,*/}
      {/*  }}*/}
      {/*  src={'/ANN_V1_crop.png'}*/}
      {/*/>*/}
      <SvgIcon
        sx={{
          fontSize: size,
        }}
        component={LogoIcon}
        inheritViewBox={true}
      />
    </Box>
  )
}

export default Logo;
