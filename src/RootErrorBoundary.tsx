import { useRouteError } from "react-router-dom";
import {
    Box,
    Typography,
} from "@mui/material";
import React from "react";

const RootErrorBoundary: React.FunctionComponent = () => {
    const error: any = useRouteError();
    console.error(error);

    return (
        <Box>
            <Typography variant="h1" component="h1">Oops!</Typography>
            <Typography variant="body1" component="p">Sorry, an unexpected error has occurred.</Typography>
            <Typography variant="body1" component="p">
                <i>{error.statusText || error.message}</i>
            </Typography>
        </Box>
    );
}

export default RootErrorBoundary;