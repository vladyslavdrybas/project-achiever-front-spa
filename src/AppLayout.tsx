import React from "react";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import {
    Avatar,
    Box,
    Container,
    Typography,
} from "@mui/material";
import {Link as ReactLink, Outlet, useNavigation, useRouteLoaderData} from "react-router-dom";
import {IAuthUser} from "@/security/auth";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";

interface IAppLayout {
    outlet?: React.JSX.Element;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({outlet}) => {
    const { user } = useRouteLoaderData("root") as { user: IAuthUser | null };
    const navigation = useNavigation();
    const isLoading: boolean = navigation.state === "loading";
    console.log('AppLayout', user);
    console.log(navigation.state);

    let renderElement: React.JSX.Element = <Loading size={55}/>;
    if (!isLoading) {
      renderElement = outlet ? outlet : <Outlet />;
    }

    return (
      <Box
        className="app"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'secondary.background',
          minHeight: '100vh',
        }}
      >
        <HeaderNavigation user={user}/>

        {/*main page content*/}
        <Container
          maxWidth="lg"
          component="main"
        >
          {renderElement}
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
            {/*<Avatar*/}
            {/*  alt="logo"*/}
            {/*  src="/logo.svg"*/}
            {/*  sx={{*/}
            {/*    width: "34px",*/}
            {/*    height: "34px",*/}
            {/*    mr: 2,*/}
            {/*  }}*/}
            {/*/>*/}
            <Logo size={34} />
          </ReactLink>
          <Typography
            variant="body1"
            component="div"
            sx={{
              ml: 2,
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
