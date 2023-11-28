import React from "react";
import {
  Paper,
  Link,
  Avatar,
  Box,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {TProfileResponse} from "@/api/types";

interface ProfileUserListsViewProps {
  profile: TProfileResponse|null;
  followed: any;
}

const ProfileUserFollowedView: React.FunctionComponent<ProfileUserListsViewProps> = ({profile, followed}) => {
  return (null === profile || followed.length === 0) ? (<></>) : (
    <Paper
      sx={{
        display: "flex",
        flexDirection: {
          xs: 'row',
          md: "column"
        },
        flexWrap: "wrap",
        justifyContent: {
          xs: 'flex-start',
          md: "center"
        },
        alignItems: {
          xs: "center",
          md: "start",
        },
        alignContent: {
          xs: "center",
          md: "flex-start",
        },
        p: 1,
        mb: 1,
      }}
    >
      <Link
        className="list-title-link router-link"
        component={RouterLink}
        to={`/ann/${profile.username}/followed`}
        sx={{
          mb: {
            xs: 0,
            md: 1,
          },
          mr: {
            xs: 1,
            md: 0,
          },
          '&::after': {
            xs: {
              content: '":"',
              paddingLeft: '2px',
              marginRight: '8px',
            },
            md: {
              content: '""',
              paddingLeft: 0,
              marginRight: 0,
            },
          },
        }}
      >
        Followed
      </Link>
      {followed.map((l:any) => (
        <Box
          className="user-stripe flex-row-start"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'start',
            alignContent: 'center',
            mt: {
              xs: 0,
              md: '0.5rem',
            },
            mr: {
              xs: 1,
              md: 0,
            },
          }}
        >
          <Avatar
            className="user-stripe "
            src={l.avatar}
          />
          <Link
            className="list-item-link router-link"
            component={RouterLink}
            to={`/ann/${l.username}`}
            sx={{
              mt: '0.5rem',
              pl: 1,
            }}
          >
            {l.name}
          </Link>
        </Box>
      ))}
    </Paper>
  )
}

export default ProfileUserFollowedView;
