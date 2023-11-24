import React from "react";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import {
    Avatar,
    Box,
    Container,
    Typography, useTheme,
} from "@mui/material";
import {Link as ReactLink, Outlet, useRouteLoaderData} from "react-router-dom";
import {IAuthUser} from "@/security/auth";

interface IAppLayout {
    outlet?: any;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({outlet}) => {
    const theme = useTheme();
    const { user } = useRouteLoaderData("root") as { user: IAuthUser | null };

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
                    pt: 8,
                    marginTop: 'auto',
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}
            >
                <ReactLink
                    to="/"
                >
                    <Avatar
                        alt="logo"
                        src="/logo.svg"
                        sx={{
                            width: "34px",
                            height: "34px",
                            mr: 2,
                        }}
                    />
                </ReactLink>
                <Typography
                    variant="body1"
                    component="div"
                    sx={{
                        textAlign: "center",
                    }}
                >
                    Achiever Notifier Network © { (new Date()).getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}

export default AppLayout;