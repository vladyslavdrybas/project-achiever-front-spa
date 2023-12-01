import React from "react";
import {
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
              component={Logo}
              size={233}
              sx={{
                filter: `drop-shadow(13px 21px 13px #162850)`,
                background: 'none',
                mt: 4,
              }}
            />
        </Container>
    );
}

export default CoverScreen;
