import React from "react";
import {
  Paper,
  Link,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {TProfileResponse} from "@/api/types";
import {config} from "@/config";

interface ProfileUserListsViewProps {
  profile: TProfileResponse|null;
  groups: any;
}

const ProfileUserGroupsView: React.FunctionComponent<ProfileUserListsViewProps> = ({profile, groups}) => {
  return (null === profile || groups.length === 0) ? (<></>) : (
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
        to={`/ann/${profile.username}/groups`}
        sx={{
          mt: {
            xs: '0.5rem',
            md: 0,
          },
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
        Groups
      </Link>

      {groups.map((l:any) => (
        <Link
          className="list-item-link router-link"
          component={RouterLink}
          to={`/ann/${profile.username}/${config.features.group.title}/${l.id}`}
          sx={{
            mt: '0.5rem',
            mr: {
              xs: 1,
              md: 0,
            },
            '&:last-child::after': {
              content: '""',
              paddingLeft: 0,
              paddingRight: 0,
            },
            '&::after': {
              xs: {
                content: '"|"',
                paddingLeft: '4px',
                marginRight: '4px',
              },
              md: {
                content: '""',
                paddingLeft: 0,
                marginRight: 0,
              },
            },
          }}
        >
          {l.title}
        </Link>
      ))}
    </Paper>
  )
}

export default ProfileUserGroupsView;
