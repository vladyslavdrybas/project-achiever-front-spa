import React, {useState} from "react";
import {Button, Box} from "@mui/material";
import AchievementListOwnedRequest from "@/api/requests/AchievementListOwnedRequest";
import {config} from "@/config";
import {toast} from "react-toastify";
import PostsCollectionRequest from "@/api/requests/PostsCollectionRequest";

interface ShowMorePostsButtonProp {
  variant: 'newer' | 'older';
  username: string;
  type: string;
  posts: any;
  postChanger: any;
}

const ShowMorePostsButton: React.FunctionComponent<ShowMorePostsButtonProp> = ({
  variant,
  username,
  type,
  posts,
  postChanger
}) => {
  const [isNoMoreEntries, setIsNoMoreEntries] = useState<boolean>(false);

  const handlePosts = async () => {
    const timestamp = variant === 'older' ? posts[posts.length - 1].createdAt.getTime() : posts[0].createdAt.getTime();

    console.log([
      variant,
      posts[posts.length - 1].createdAt.getTime(),
      posts[0].createdAt.getTime(),
      timestamp,
    ]);

    let getPostsRequest = null;
    switch (type) {
      case 'list':
        getPostsRequest = new AchievementListOwnedRequest(
          username,
          Math.floor(timestamp/1000),
          config.api.load.offset,
          config.api.load.limit,
          variant
        );
        break;
      case 'achievement':
        getPostsRequest = new PostsCollectionRequest(
          username,
          Math.floor(timestamp/1000),
          config.api.load.offset,
          config.api.load.limit,
          variant
        );
        break;
      default:
        toast.error('Undefined posts type.');
        return;
    }

    let collection = [];
    try {
      await getPostsRequest.send();
      collection = getPostsRequest.response;
    } catch (e: any) {
      toast.error(e.message);
      return;
    }

    if (collection.length > 0) {
      console.log(posts.length);
      if (variant === 'older') {
        posts = posts.concat(collection);
      } else if (variant === 'newer') {
        posts = collection.concat(posts);
      }
      console.log(posts.length);

      postChanger(posts);
    } else {
      setIsNoMoreEntries(true);
    }
  }

  return isNoMoreEntries ? (<></>) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <Button
        disabled={isNoMoreEntries}
        className="btn btn-show-more"
        onClick={handlePosts}
      >
        Show {variant === 'older' ? 'more' : 'new'}
      </Button>
    </Box>
  )
}

export default ShowMorePostsButton;
