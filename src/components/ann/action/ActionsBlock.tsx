import React, {useState} from "react";
import {
  Box,
  Button,
  Paper,
} from "@mui/material";
import AchievementAddForm from "@/components/ann/action/AchievementAddForm";
import UserProfileAvatarLink from "@/components/user/UserProfileAvatarLink";
import ListAddForm from "@/components/ann/action/ListAddForm";
import {config} from "@/config";

interface ActionsBlockProps {
  types: string[];
  profile: any;
  posts: any;
  postChanger: any;
}

interface ICreatingState {
  states: Record<string,boolean>;
  types: Record<string,boolean>;
  isCreating(): boolean;
  isCreatingType(type:string): boolean;
  addType(type:string): void;
  hasType(type:string): boolean;
  switchCreating(type:string): ICreatingState;
  close(): void;
}

const creatingStateDefault: ICreatingState = {
  states: {
    achievement: false,
    list: false,
    group: false,
  },
  types: {
    achievement: false,
    list: false,
    group: false,
  },
  isCreating(): boolean {
    return Object.values(this.states).reduce((a, b)=> a || b, false);
  },
  isCreatingType(type: string): boolean {
    if (!this.hasType(type)) {
      return false;
    }

    return this.states[type];
  },
  switchCreating(type:string): ICreatingState {
    if (!this.hasType(type)) {
      return this;
    }

    Object.keys(this.states).forEach(key => {
      this.states[key] = key === type ? !this.states[key] : false;
    });

    return this;
  },
  hasType(type:string): boolean {
    return typeof this.types[type] === 'boolean' && this.types[type];
  },
  addType(type:string): void {
    if (typeof this.types[type] === 'boolean') {
      this.types[type] = true;
    }
  },
  close(): void {
    Object.keys(this.states).forEach(key => {
      this.states[key] = false;
    });
  }
}

const ActionsBlock: React.FunctionComponent<ActionsBlockProps> = ({
  types,
  profile,
  posts,
  postChanger,
}) => {
  types.forEach(t => {
    creatingStateDefault.addType(t);
  });

  const [creatingState, setCreatingState] = useState<ICreatingState>(creatingStateDefault);
  const [isCreating, setIsCreating] = useState<boolean>(creatingStateDefault.isCreating());

  console.log(creatingState);

  return (
    <Paper
      className={`post post-add post-achievement`}
      sx={{
        mb: 1,
        p: 1,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "start",
        alignContent: "center",
      }}
    >
      <Box
        className="flex-row-start"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'start',
          alignContent: 'center',
        }}
      >
        <UserProfileAvatarLink profile={profile} cls="user-stripe-avatar"/>

        {creatingState.hasType(config.features.achievement.title) && !creatingState.isCreatingType(config.features.achievement.title) && (
          <Button
            onClick = {() => {
                setCreatingState(creatingState.switchCreating(config.features.achievement.title));
                setIsCreating(creatingState.isCreating());
              }
            }
          >
            Add achievement
          </Button>
        )}

        {creatingState.hasType(config.features.list.title) && !creatingState.isCreatingType(config.features.list.title) && (
          <Button
            onClick = {() => {
                setCreatingState(creatingState.switchCreating(config.features.list.title));
                setIsCreating(creatingState.isCreating());
              }
            }
          >
            Add list
          </Button>
        )}
      </Box>

      {isCreating && (
        <Box
          sx={{
            pt: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {creatingState.isCreatingType(config.features.achievement.title) && (
            <AchievementAddForm
              posts={posts}
              postChanger={postChanger}
            />
          )}
          {creatingState.isCreatingType(config.features.list.title) && (
            <ListAddForm
              posts={posts}
              postChanger={postChanger}
            />
          )}

          <Box
            className="form-action-buttons flex-row-start"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'end',
              alignContent: 'end',
              pt: 1,
              width: '100%',
            }}
          >
            <Button
              className="action-block-btn btn-close"
              id={`action-block-btn-close`}
              onClick = {() => {
                  creatingState.close();
                  setCreatingState(creatingState);
                  setIsCreating(creatingState.isCreating());
                }
              }
              sx={{
                mr: 0,
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default ActionsBlock;
