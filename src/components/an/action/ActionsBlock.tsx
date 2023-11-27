import React, {useState} from "react";
import {
  Box,
  Button,
  Paper,
} from "@mui/material";
import AchievementAddForm from "@/components/an/action/AchievementAddForm";
import UserProfileAvatarLink from "@/components/user/UserProfileAvatarLink";

interface ActionsBlockProps {
  types: string[];
  profile: any;
}

interface ICreatingState {
  states: Record<string,boolean>;
  isCreating(): boolean;
  isCreatingType(type:string): boolean;
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
    return typeof this.states[type] === 'boolean';
  },
  close(): void {
    Object.keys(this.states).forEach(key => {
      this.states[key] = false;
    });
  }
}

const ActionsBlock: React.FunctionComponent<ActionsBlockProps> = ({types, profile}) => {
  const [creatingState, setCreatingState] = useState<ICreatingState>(creatingStateDefault);
  const [isCreating, setIsCreating] = useState<boolean>(creatingStateDefault.isCreating());

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

        {creatingState.hasType('achievement') && !creatingState.isCreatingType('achievement') && (
          <Button
            onClick = {() => {
                setCreatingState(creatingState.switchCreating('achievement'));
                setIsCreating(creatingState.isCreating());
              }
            }
          >
            Add achievement
          </Button>
        )}
      </Box>

      {isCreating && (
        <Box
          sx={{pt: 2}}
        >
          {creatingState.isCreatingType('achievement') && (
            <AchievementAddForm />
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
