import React, {useState} from "react";
import {Button, Box} from "@mui/material";
import _AchievementListOwnedRequest from "@/api/requests/_AchievementListOwnedRequest";
import {config} from "@/config";
import {toast} from "react-toastify";
import _PostsCollectionRequest from "@/api/requests/_PostsCollectionRequest";

interface ShowMorePostsButtonProp {
  variant: string;
  username: string;
  target: string;
  posts: any;
  postChanger: any;
}

const ShowMorePostsButton: React.FunctionComponent<ShowMorePostsButtonProp> = ({
  variant,
  username,
  target,
  posts,
  postChanger
}) => {
  const [isNoMoreEntries, setIsNoMoreEntries] = useState<boolean>(false);

  const handlePosts = async () => {
    setIsNoMoreEntries(true);
    const timestamp = variant === config.api.load.timerange.older ? posts[posts.length - 1].createdAt.getTime() : posts[0].createdAt.getTime();

    console.log([
      variant,
      posts[posts.length - 1].createdAt.getTime(),
      posts[0].createdAt.getTime(),
      timestamp,
    ]);

    let getPostsRequest = null;
    switch (target) {
      case config.features.list.title:
        getPostsRequest = new _AchievementListOwnedRequest(
          username,
          Math.floor(timestamp/1000),
          config.api.load.offset,
          config.api.load.limit,
          variant
        );
        break;
      case config.features.achievement.title:
        getPostsRequest = new _PostsCollectionRequest(
          username,
          Math.floor(timestamp/1000),
          config.api.load.offset,
          config.api.load.limit,
          variant
        );
        break;
      default:
        toast.error('Undefined posts target.');
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
      if (variant === config.api.load.timerange.older) {
        posts = posts.concat(collection);
      } else if (variant === config.api.load.timerange.newer) {
        posts = collection.concat(posts);
      }
      console.log(posts.length);

      postChanger(posts);

      setIsNoMoreEntries(false);
    } else {
      setIsNoMoreEntries(true);

      if (variant === config.api.load.timerange.newer) {
        setTimeout(() => {
          console.log(`show newer button in ${config.api.load.millisecondsToWaitForNextRequest} milliseconds`);
          setIsNoMoreEntries(false);
        }, config.api.load.millisecondsToWaitForNextRequest);
      }
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
        {variant === config.api.load.timerange.older ? 'Show more' : 'Check new'}
      </Button>
    </Box>
  )
}

export default ShowMorePostsButton;
