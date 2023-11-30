import React from "react";
import {Box, Grid} from "@mui/material";

interface ThreeColumnGridProps {
  leftBlocks: any[];
  middleBlocks: any[];
  rightBlocks: any[];
  semiBlocks: any[];
  outlet: any;
}

const ThreeColumnGrid: React.FunctionComponent<ThreeColumnGridProps> = ({
  leftBlocks,
  middleBlocks,
  rightBlocks,
  semiBlocks,
  outlet,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        {leftBlocks.map(e => (<>{e}</>))}
        <Box
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
            flexDirection: 'column',
          }}
        >
          {semiBlocks.map(e => (<>{e}</>))}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        {middleBlocks.map(e => (<>{e}</>))}
        {outlet}
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            flexDirection: 'column',
          }}
        >
          {semiBlocks.map(e => (<>{e}</>))}
        </Box>
        {rightBlocks.map(e => (<>{e}</>))}
      </Grid>
    </Grid>
  )
}

export default ThreeColumnGrid;
