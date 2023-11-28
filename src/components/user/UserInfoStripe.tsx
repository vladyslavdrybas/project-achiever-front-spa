import {
    Box,
    Button,
} from "@mui/material";
import React from "react";
import {Link as RouterLink, useRouteLoaderData} from "react-router-dom";
import Link from "@mui/material/Link";
import {IAuthUser} from "@/security/auth";
import UserProfileAvatarLink from "@/components/user/UserProfileAvatarLink";

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
              flexWrap: 'nowrap',
              alignItems: 'center',
              alignContent: 'flex-start',
            }}
        >
          <UserProfileAvatarLink profile={user} cls="user-stripe-avatar"/>

            <Link
                className="user-stripe-link router-link"
                component={RouterLink}
                to={`/ann/${user.username}`}
            >
              {!user.firstname && !user.lastname ?
                (
                  <>{user.username}</>
                ) : (
                  <>{user.firstname} {user.lastname}</>
                )
              }
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
