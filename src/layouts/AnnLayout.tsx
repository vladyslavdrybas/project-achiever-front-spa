import React from "react";

import {
    Grid,
} from "@mui/material";
import {Outlet, useRouteLoaderData} from "react-router-dom";

const AnnLayout: React.FunctionComponent = () => {
    const { leftBlocks, middleBlocks } = useRouteLoaderData('ann-user') as { leftBlocks: React.ReactElement[], middleBlocks: React.ReactElement[] };

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                {leftBlocks.map(e => (<>{e}</>))}
            </Grid>
            <Grid item xs={9}>
                {middleBlocks.map(e => (<>{e}</>))}
                <Outlet />
            </Grid>
        </Grid>
    );
}

export default AnnLayout;
