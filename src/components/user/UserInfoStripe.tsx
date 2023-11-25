import {
    Avatar,
    Box,
    Button,
    Typography,
} from "@mui/material";
import colorFromUsername from "@/util/ColorFromUsername";
import React from "react";
import {Link as RouterLink, useRouteLoaderData} from "react-router-dom";
import Link from "@mui/material/Link";
import {IAuthUser} from "@/security/auth";

interface UserInfoStripeProps {
    user: any;
}

const UserInfoStripe: React.FunctionComponent<UserInfoStripeProps> = ({user}) => {
    console.log('UserInfoStripe', user);
    const { user:authUser } = useRouteLoaderData("root") as { user: IAuthUser | null };

    return (
        <Box
            className="user-stripe flex-row-start"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'start',
                alignContent: 'center',
            }}
        >
            <Avatar
                className="user-stripe-avatar"
                sx={{
                    backgroundColor: colorFromUsername(user.username),
                }}
            >
                { user.firstname ? user.firstname[0].toUpperCase() : '' }
                { user.lastname ? user.lastname[0].toUpperCase() : '' }
                { !user.lastname && !user.firstname ? user.username[0].toUpperCase() : '' }
            </Avatar>

            <Link
                className="user-stripe-link router-link"
                component={RouterLink}
                to={`/ann/${user.username}`}
            >
                {(user.firstname || user.lastname) && (
                    <Typography
                        className="user-stripe-username"
                        variant="body1"
                        component="span"
                    >
                        {user.firstname} {user.lastname}
                    </Typography>
                )}

                {!user.firstname && !user.lastname && (
                    <Typography
                        className="user-stripe-username"
                        variant="body1"
                        component="span"
                        sx={{
                            fontSize: '1.6rem',
                        }}
                    >
                        {user.username}
                    </Typography>
                )}
            </Link>

            {authUser?.id !== user.id && (
                <Button
                    sx={{
                        marginRight: 'auto',
                    }}
                >
                    Follow
                </Button>
            )}
        </Box>
    )
}

export default UserInfoStripe;