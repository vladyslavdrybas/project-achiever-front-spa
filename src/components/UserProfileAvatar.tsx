import React from "react";
import {Avatar} from "@mui/material";
import colorFromUsername from "@/util/ColorFromUsername";
import {avatar} from "@/artifacts/faked";
import {TProfileResponse} from "@/api/types";
import {IAuthUser} from "@/security/auth";

interface UserProfileAvatarProps {
  profile: TProfileResponse | IAuthUser | null;
  cls: string;
  alt?: string;
}

const UserProfileAvatar: React.FunctionComponent<UserProfileAvatarProps> = ({profile, cls}) => {
  const profileAvatar: string = profile?.avatar ?? avatar() ?? null;
  const username = profile?.username ?? 'u';

  return null === profile ? (<></>) : (
    <>
      {
        null === profileAvatar ?
          (
            <Avatar
              className={cls}
              sx={{
                backgroundColor: colorFromUsername(username),
              }}
            >
              { profile.firstname ? profile.firstname[0].toUpperCase() : '' }
              { profile.lastname ? profile.lastname[0].toUpperCase() : '' }
              { !profile.lastname && !profile.firstname ? username[0].toUpperCase() : '' }
            </Avatar>
          ) : (
            <Avatar
              className={cls}
              src={profileAvatar}
            />
          )
      }
    </>
  )
}

export default UserProfileAvatar;
