import React, {useState} from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Button,
    IconButton,
    Container,
    Avatar,
    Tooltip,
    Menu,
    MenuItem,
} from "@mui/material";
import SignInIcon from '@mui/icons-material/Login'
import {IAuthUser} from "@/security/auth";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import colorFromUsername from "@/util/ColorFromUsername";

const pages: any[] = [
    {
        name: 'Users',
        link: '/users',
        isProtected: false,
    },
    {
        name: 'Notifications',
        link: '/notifications',
        isProtected: true,
    },
];

interface NavigationProps {
    user: IAuthUser|null;
}

const HeaderNavigation: React.FunctionComponent<NavigationProps> = ({user}) => {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            color="transparent"
            position="static"
            sx={{
                mb: 2,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 2,
                        }}
                    >
                        <ReactLink
                            to="/"
                        >
                            <Avatar
                                className="avatar-navigation-logo"
                                alt="logo"
                                src="/logo.svg"
                            />
                        </ReactLink>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        {
                            pages.map((page) => (
                                <>
                                    {
                                        page.isProtected && user
                                        && (
                                            <Button
                                                key={page.name}
                                                onClick={() => {
                                                    handleCloseNavMenu();
                                                    navigate(page.link);
                                                }}
                                                sx={{ my: 2, mx: 2, display: 'block' }}
                                            >
                                                {page.name}
                                            </Button>
                                        )
                                    }
                                    {
                                        !page.isProtected
                                        && (
                                            <Button
                                                key={page.name}
                                                onClick={() => {
                                                    handleCloseNavMenu();
                                                    navigate(page.link);
                                                }}
                                                sx={{ my: 2, mx: 2, display: 'block' }}
                                            >
                                                {page.name}
                                            </Button>
                                        )
                                    }
                                </>
                                )
                            )
                        }
                    </Box>

                    { user
                        && (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mt: '8px' }}>
                                        <Avatar
                                            sx={{
                                                backgroundColor: colorFromUsername(user.username ?? 'AN'),
                                                width: '34px',
                                                height: '34px',
                                            }}
                                            aria-label="recipe"
                                        >
                                            { user.firstname ? user.firstname[0].toUpperCase() : '' }
                                            { user.lastname ? user.lastname[0].toUpperCase() : '' }
                                            { !user.lastname && !user.firstname ? (user.username ?? 'AN')[0].toUpperCase() : '' }
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {
                                        [
                                            (<ReactLink to={`/ann/${user.username}`}>Me</ReactLink>),
                                            (<ReactLink to={`/ann/${user.username}/lists`}>Lists</ReactLink>),
                                            (<ReactLink to={`/ann/${user.username}/groups`}>Groups</ReactLink>),
                                            (<ReactLink to={"/settins"}>Setting</ReactLink>),
                                            (<ReactLink to={"/signout"}>SignOut</ReactLink>),
                                        ].map((setting, index) => (
                                            <MenuItem key={`drown-header-nav-${index}`} onClick={handleCloseUserMenu}>
                                                {setting}
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </Box>
                        )
                    }

                    { !user
                        && (
                            <ReactLink to="/signin">
                                <SignInIcon sx={{ p: 0, mt: '13px' }}/>
                            </ReactLink>
                        )
                    }

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default HeaderNavigation;