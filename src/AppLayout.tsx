import React, {PropsWithChildren} from "react";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import {
    Box,
    Container,
    Typography, useTheme,
} from "@mui/material";
import {Outlet, useRevalidator, useRouteLoaderData} from "react-router-dom";
import {IAuthUser} from "@/security/auth";

interface IAppLayout {
    outlet?: any;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({outlet}) => {
    const theme = useTheme();
    const loader = useRouteLoaderData("root");
    const { user } = loader as { user: IAuthUser | null };

    console.log('AppLayout', user);

    return (
        <Box
            className="App"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                background: theme.palette.secondary.gradientMain,
                minHeight: '100vh',
            }}
        >
            <HeaderNavigation user={user}/>

            {/*main page content*/}
            <Container
                maxWidth="lg"
                component="main"
            >
                {outlet ? outlet : <Outlet />}
            </Container>

            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    p: 4,
                    marginTop: 'auto',
                }}
            >
                <Typography
                    variant="body1"
                    component="div"
                    sx={{
                        textAlign: "center",
                    }}
                >
                    Copyright © { (new Date()).getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}

export default AppLayout;