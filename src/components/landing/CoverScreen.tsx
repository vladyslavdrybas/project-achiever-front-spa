import React from "react";
import {
    Avatar,
    Box,
    Container,
    Typography,
} from "@mui/material";
import Logo from "@/components/Logo";

const CoverScreen: React.FunctionComponent = () => {
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
            }}
        >
            <Typography
                variant="body1"
                component="p"
                sx={{
                    textAlign: "center",
                    mt: 3,
                }}
            >
                Have been struggled to fill achievements before each interview?
                Hard to remember what to say asking promotion?
                Want to keep ypursefl in tone?
                It is no more a problem with Achiever Notifier.
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    textAlign: "center",
                    mt: 3,
                }}
            >
                Never forget what you have done.
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    textAlign: "center",
                    mt: 2,
                }}
            >
                Be proud of your achievements.
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    textAlign: "center",
                    mt: 2,
                }}
            >
                Motivator will remind you all of them.
            </Typography>

            <Box
                sx={{
                    mt: 4,
                }}
            >
                {/*<Avatar*/}
                {/*    className="avatar-drop-shadow"*/}
                {/*    src="/logo.svg"*/}
                {/*    alt="Achiever Notifier Network"*/}
                {/*    sx={{*/}
                {/*        width: 233,*/}
                {/*        height: 233,*/}
                {/*    }}*/}
                {/*/>*/}
              <Logo size={233} />
            </Box>
        </Container>
    );
}

export default CoverScreen;
