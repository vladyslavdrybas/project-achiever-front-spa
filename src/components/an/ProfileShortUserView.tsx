import React from "react";

import {
    Paper,
    Typography,
} from "@mui/material";
import {TProfileResponse} from "@/api/types";
import UserProfileAvatar from "@/components/UserProfileAvatar";

interface ProfileShortBlockViewProps {
    profile: TProfileResponse | null;
}

const ProfileShortUserView: React.FunctionComponent<ProfileShortBlockViewProps> = ({profile}) => {
  return !profile ? (<></>) : (
    <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          p: 1,
          mb: 1,
        }}
    >
      <UserProfileAvatar profile={profile} cls="user-info-block-avatar" />

      {(profile.firstname || profile.lastname) && (
          <Typography>{profile.firstname} {profile.lastname}</Typography>
      )}

      {!profile.firstname && !profile.lastname && (
          <Typography>{profile.username}</Typography>
      )}

      {profile.isBanned && (
          <Typography>banned</Typography>
      )}

      {profile.achievementsAmount && (
          <Typography>achievements: {profile.achievementsAmount}</Typography>
      )}
    </Paper>
  );
}

export default ProfileShortUserView;
