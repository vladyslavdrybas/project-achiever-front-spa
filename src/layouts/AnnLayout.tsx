import React from "react";

import {
  Box,
  Grid,
} from "@mui/material";
import {Outlet, useRouteLoaderData} from "react-router-dom";

const AnnLayout: React.FunctionComponent = () => {
    const { leftBlocks, middleBlocks, rightBlocks, semiBlocks } = useRouteLoaderData('ann-user') as { leftBlocks: any[], middleBlocks: any[], rightBlocks: any[], semiBlocks: any[] };

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
                <Outlet />
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
    );
}

export default AnnLayout;
