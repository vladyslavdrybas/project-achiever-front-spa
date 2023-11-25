import React from "react";
import {
    Avatar,
    Typography,
    Container,
} from "@mui/material";

const Fallback: React.FunctionComponent = () => {
    return (
        <Container
            maxWidth="md"

            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                mt: 2,
                minHeight: "100vh",
            }}
        >
            <Typography
                variant="body1"
                component="p"
                sx={{
                    textAlign: "center",
                }}
            >
                Loading...
            </Typography>

            <Avatar
                className="avatar-drop-shadow"
                src="/logo.svg"
                alt="Achiever Notifier Network"
                sx={{
                    width: 233,
                    height: 233,
                    mt: 4,
                }}
            />
        </Container>
    );
}

export default Fallback;