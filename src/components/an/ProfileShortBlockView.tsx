import React from "react";

import {
    Avatar,
    Paper,
    Typography,
} from "@mui/material";
import {TProfileResponse} from "@/api/types";
import colorFromUsername from "@/util/ColorFromUsername";

interface ProfileShortBlockViewProps {
    profile: TProfileResponse | null;
}

const ProfileShortBlockView: React.FunctionComponent<ProfileShortBlockViewProps> = ({profile}) => {
    return !profile ? (<></>) : (
        <Paper
            sx={{
                minHeight: "20vh",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                p: 1,
            }}
        >
            <Avatar
                sx={{
                    backgroundColor: colorFromUsername(profile.username),
                    width: '89px',
                    height: '89px',
                }}
                aria-label="recipe"
            >
                { profile.firstname ? profile.firstname[0].toUpperCase() : '' }
                { profile.lastname ? profile.lastname[0].toUpperCase() : '' }
                { !profile.lastname && !profile.firstname ? profile.username[0].toUpperCase() : '' }
            </Avatar>


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

export default ProfileShortBlockView;