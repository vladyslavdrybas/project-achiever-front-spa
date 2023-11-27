import React from "react";

import {
  Box,
  Link,
} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import {generateUrl} from "@/util/PostUtils";

interface PostSharesProps {
  post: any;
}

const PostShares: React.FunctionComponent<PostSharesProps> = ({post}) => {
  const shareUrl = generateUrl(post);
  const title = post.title;

  return (
    <Box
      className="share-buttons flex-row-start"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'start',
        alignContent: 'center',
        pt: 1,
        '&:last-child': {
          mr: 0,
        }
      }}
    >
      <Link
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(shareUrl)}`}
        target="_blank"
        sx={{
          mr: 1,
        }}
      >
        <LinkedInIcon
          sx={{
            width: '34px',
            height: '34px',
          }}
        />
      </Link>
      <Link
        href={`https://telegram.me/share/url?url=${encodeURI(shareUrl)}&text=${encodeURI(title)}`}
        target="_blank"
        sx={{
          mr: 1,
        }}
      >
        <TelegramIcon
          sx={{
            width: '34px',
            height: '34px',
          }}
        />
      </Link>
    </Box>
  )
}

export default PostShares;