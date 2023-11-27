import React from "react";
import {
  Link,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import UserProfileAvatar from "@/components/user/UserProfileAvatar";
import {UserProfileAvatarProps} from "@/components/user/types";

const UserProfileAvatarLink: React.FunctionComponent<UserProfileAvatarProps> = ({profile, cls}) => {
  return null === profile ? (<></>) : (
    <Link
      className="user-stripe-link router-link"
      component={RouterLink}
      to={`/ann/${profile.username}`}
    >
      <UserProfileAvatar profile={profile} cls={cls}/>
    </Link>
  )
}

export default UserProfileAvatarLink;
