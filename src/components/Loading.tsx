import React, {useEffect, useState} from "react";
import {Box, SvgIcon} from "@mui/material";
import {ReactComponent as LogoIconLetterA} from "@/artifacts/asset/img/ANN_V1_crop_a.svg";
import {ReactComponent as LogoIconLetterSmallN} from "@/artifacts/asset/img/ANN_V1_crop_n_small.svg";
import {ReactComponent as LogoIconLetterBigN} from "@/artifacts/asset/img/ANN_V1_crop_n_big.svg";


interface LoadingProps {
  size?: number,
}

const colorsOrder: string[] = ['#de4b1e', '#162850', '#f68426'];

const Loading: React.FunctionComponent<LoadingProps> = ({size = 34}) => {
  const [colors, setColors] = useState<string[]>(colorsOrder);
  const [changeTrigger, setChangeTrigger] = useState<boolean>(false);

  useEffect(() => {
    const colorSwitchInterval = setInterval(() => {
      console.log('loading...:' + Date.now(), colors);
      colors.unshift(colors.pop() as string);
      setColors(colors);
      setChangeTrigger(!changeTrigger);
    }, 618);

    return () => clearInterval(colorSwitchInterval);
  });

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
          p: size/100 < 0.5 ? '4px' : size/100,
          bgcolor: 'secondary.background',
          // boxShadow: `rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;`,
          borderRadius: '4px',
          minWidth: size,
          minHeight: size,
        }}
      >

        <SvgIcon
          sx={{
            fontSize: size,
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 103,
            color: colors[1],
          }}
          component={LogoIconLetterA}
          inheritViewBox={true}
        />

        <SvgIcon
          sx={{
            fontSize: size,
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 102,
            color: colors[0],
          }}
          component={LogoIconLetterBigN}
          inheritViewBox={true}
        />

        <SvgIcon
          sx={{
            fontSize: size,
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 101,
            color: colors[2],
          }}
          component={LogoIconLetterSmallN}
          inheritViewBox={true}
        />

      </Box>
    </Box>
  )
}

export default Loading;
