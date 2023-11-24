import React from "react";
import {
    Box,
    Container,
} from "@mui/material";
import AuthActionButtonsScreen from "@/components/landing/AuthActionButtonsScreen";
import CoverScreen from "@/components/landing/CoverScreen";
import {IAuthUser} from "@/security/auth";
import {useRouteLoaderData} from "react-router-dom";

const HomePage: React.FunctionComponent = () => {
    const { user } = useRouteLoaderData("root") as { user: IAuthUser | null };

    return (
        <>
            <Box
                sx={{
                    minHeight: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}
            >
                <CoverScreen />
                { !user && (<AuthActionButtonsScreen />) }
            </Box>

            {/* timeline */}
            {/* show public timeline of the project */}

            {/* achievements */}
            <Container
                maxWidth="md"
            >

            </Container>
        </>
    );
}

export default HomePage;