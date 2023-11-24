import React from "react";
import {
    Button,
    Stack,
} from "@mui/material";
import {Link as ReactLink} from "react-router-dom";

const AuthActionButtonsScreen: React.FunctionComponent = () => {
    return (
        <Stack
            maxWidth="lg"
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{
                mt: 6,
            }}
        >
            <ReactLink to={"/signup"}>
                <Button
                    variant="contained"
                    color="primary"
                >
                    Register
                </Button>
            </ReactLink>

            <ReactLink to={"/signin"}>
                <Button
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </ReactLink>
        </Stack>
    );
}

export default AuthActionButtonsScreen;
