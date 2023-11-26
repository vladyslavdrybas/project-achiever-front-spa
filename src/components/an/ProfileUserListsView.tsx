import React from "react";
import {
  Paper,
  Link,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {TProfileResponse} from "@/api/types";

interface ProfileUserListsViewProps {
  profile: TProfileResponse|null;
  lists: any;
}

const ProfileUserListsView: React.FunctionComponent<ProfileUserListsViewProps> = ({profile, lists}) => {
  return (null === profile || lists.length === 0) ? (<></>) : (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "start",
        alignContent: "center",
        p: 1,
        mb: 1,
      }}
    >
      <Link
        className="list-title-link router-link"
        component={RouterLink}
        to={`/ann/${profile.username}/lists`}
        sx={{
          mb: 1,
        }}
      >
        Lists
      </Link>
      {lists.map((l:any) => (
        <Link
          className="list-item-link router-link"
          component={RouterLink}
          to={`/list/${l.id}`}
          sx={{
            mt: '0.5rem',
          }}
        >
          {l.title}
        </Link>
      ))}
    </Paper>
  )
}

export default ProfileUserListsView;
