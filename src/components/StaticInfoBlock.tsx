import React from "react";
import {
  Avatar,
  Box,
  Link,
  Typography,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const links: any[] = [
  {
    'title': 'About',
    'link': '/about',
  },
  {
    'title': 'Privacy & Terms',
    'link': '/privacyandterms',
  },
  {
    'title': 'Help',
    'link': '/help',
  },
];

const StaticInfoBlock: React.FunctionComponent = () => {
  return (
    <Box
      className="static-info-block"
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        p: 1,
        mb: 1,
        fontSize: "0.55rem",
        fontFamily: 'greycliff-regular',
      }}
    >
      <Link
        className="static-info-link-item router-link"
        component={RouterLink}
        to={links[0].link}
      >
        <Typography className="static-info-link-text" variant="body1" component="span">{links[0].title}</Typography>
      </Link>
      <Link
        className="static-info-link-item router-link"
        component={RouterLink}
        to={links[1].link}
      >
        <Typography className="static-info-link-text" variant="body1" component="span">{links[1].title}</Typography>
      </Link>
      <Link
        className="static-info-link-item router-link last"
        component={RouterLink}
        to={links[2].link}
        sx={{
          marginRight: '0rem',
        }}
      >
        <Typography className="static-info-link-text" variant="body1" component="span">{links[2].title}</Typography>
      </Link>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "center",
          justifyItems: "center",
          alignItems: "center",
          alignContent: "center",
          mt: 0.8,
        }}
      >
        <Avatar
          alt="logo"
          src="/logo.svg"
          sx={{
            width: "21px",
            height: "21px",
            mr: 0.55,
          }}
        />
        <Typography className="static-info-link-text" variant="body1" component="span">Achiever Notifier Network © { (new Date()).getFullYear()}</Typography>
      </Box>
    </Box>
  )
}

export default StaticInfoBlock;
