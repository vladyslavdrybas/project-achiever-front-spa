import React, {useState} from "react";
import {
  Paper,
  Box,
  Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, OutlinedInput, Chip, Autocomplete,
} from "@mui/material";
import UserProfileAvatar from "@/components/UserProfileAvatar";
import {Dayjs} from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface AchievementAddBlockProps {
  user: any;
}

const AchievementAddBlock: React.FunctionComponent<AchievementAddBlockProps> = ({user}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [completeAt, setCompleteAt] = useState<Dayjs | null>(null);
  const [startAt, setStartAt] = useState<Dayjs | null>(null);
  const [tags, setTags] = useState<string[]>(['default', 'en', 'ua123']);
  const [isPermissionGroups, setIsPermissionGroups] = useState<boolean>(false);
  const [permissionSelectedGroups, setPermissionSelectedGroups] = useState<string[]>([]);

  const groups: Record<string,string> = {
    'group-uuid1': 'Group1',
    'group-uuid2': 'Group2',
    'group-uuid3': 'Group3',
  }

  const lists: Record<string,string> = {
    'list-uuid1': 'List1',
    'list-uuid2': 'List2',
    'list-uuid3': 'List3',
  }

  const handleAddAchievement = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString() ?? '';
    const description = data.get('description')?.toString() ?? '';
    const whocansee = data.get('whocansee')?.toString() ?? '';
    const startDateTime = startAt?.format() ?? null;
    const completeDateTime = completeAt?.format() ?? null;
    const list = data.get('list')?.toString() ?? '';

    console.log([
      title,
      description,
      startDateTime,
      completeDateTime,
      tags,
      list,
      whocansee,
      permissionSelectedGroups,
    ]);
    setIsLoading(false);
  }

  const handleSelectGroupChange = (event: SelectChangeEvent<typeof permissionSelectedGroups>) => {
    const {
      target: { value },
    } = event;

    setPermissionSelectedGroups(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
        className="user-stripe flex-row-start"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'start',
          alignContent: 'center',
          pb:  1,
        }}
      >
        <UserProfileAvatar profile={user} cls="user-stripe-avatar"/>
        <Button
          onClick = {() => {setIsCreating(!isCreating)}}
        >
          {isCreating ? 'Stop adding ' : 'Add '} achievement
        </Button>
      </Box>

      {isCreating && (
        <Box
          component="form"
          onSubmit={handleAddAchievement}
        >
          <TextField
            disabled={isLoading}
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            sx={{
              mb: 1,
              mt: 0,
            }}
          />
          <TextField
            disabled={isLoading}
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            maxRows={20}
            sx={{
              mb: 1,
              mt: 0,
            }}
          />
          <DateTimePicker
            disabled={isLoading}
            value={startAt}
            onChange={(e: Dayjs|null) => {
                setStartAt(e);
              }
            }
            ampm={false}
            sx={{
              minWidth: "100%",
              mb: 1,
              mt: 0,
            }}
          />
          <DateTimePicker
            disabled={isLoading}
            value={completeAt}
            onChange={(e: Dayjs|null) => {
                setCompleteAt(e);
              }
            }
            ampm={false}
            sx={{
              minWidth: "100%",
              mb: 1,
              mt: 0,
            }}
          />

          <Autocomplete
            clearIcon={false}
            options={[]}
            freeSolo
            multiple
            value={tags}
            onChange={(event: any, newValues: string[] | null) => {
                if (null === newValues) {
                  newValues = [];
                }
                if (newValues) {
                  const tag = newValues[newValues.length - 1].trim();
                  for (let i = 0; i < newValues.length - 2; i++)
                  {
                    if (newValues[i] === tag) {
                      newValues.pop();
                      break;
                    }
                  }
                }
                newValues = newValues.slice(0,10);
                setTags(newValues);
              }
            }
            renderTags={(value, props) =>
              value.map((option, index) => (
                <Chip label={option} {...props({ index })} />
              ))
            }
            renderInput={(params) => <TextField
                label="Add Hashes"
                {...params}
                onKeyDown={(e: any) => {
                  if (e.key === " " && e.target.value) {
                    const tag = e.target.value.toString().trim();
                    if (!tags.includes(tag)) {
                      if (tags.length < 10) {
                        tags.push(tag);
                        setTags(tags);
                      }
                      e.target.value = null;
                    } else {
                      e.target.value = tag;
                    }
                  }
                }}
              />
            }
            sx={{mb: 1, mt: 0,}}
          />

          <FormControl fullWidth sx={{mb: 1, mt: 0,}}>
            <InputLabel id="select-list-label">List</InputLabel>
            <Select
              labelId="select-list-label"
              id="list"
              label="List"
              name="list"
              required
            >
              {Object.keys(lists).map((key:string) => (
                <MenuItem key={key} value={key}>{lists[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{mb: 1, mt: 0,}}>
            <InputLabel id="select-whocansee-label">Who can see</InputLabel>
            <Select
              labelId="select-whocansee-label"
              id="whocansee"
              label="Who can see"
              name="whocansee"
              required
              onChange={(event: SelectChangeEvent) => {
                  const value = event.target.value as string;
                  if ('groups' === value) {
                    setIsPermissionGroups(true);
                  } else {
                    setIsPermissionGroups(false);
                    setPermissionSelectedGroups([]);
                  }
                }
              }
            >
              <MenuItem value={"anyone"}>Anyone</MenuItem>
              <MenuItem value={"connections"}>My Connections</MenuItem>
              <MenuItem value={"groups"}>Groups</MenuItem>
              <MenuItem value={"sharelink"}>Share via link</MenuItem>
            </Select>
          </FormControl>

          {isPermissionGroups && (
            <FormControl fullWidth sx={{mb: 1, mt: 0,}}>
              <InputLabel id="select-group-label">Groups</InputLabel>
              <Select
                labelId="select-group-label"
                label="Groups   "
                id="select-group-multiple-chip"
                multiple
                value={permissionSelectedGroups}
                onChange={handleSelectGroupChange}
                input={<OutlinedInput id="achievement-add-select-group-chip" label="Chip" />}
                renderValue={(selected: any) => (
                  <>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value:string) => (
                      <Chip key={value} label={groups[value]} />
                    ))}
                  </Box>
                  </>
                )}
                MenuProps={MenuProps}
              >
                {Object.keys(groups).map((key:string) => (
                  <MenuItem key={key} value={key}>{groups[key]}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            }}
          >
            <Button
              disabled={isLoading}
              onClick = {() => {setIsCreating(!isCreating)}}
              sx={{
                mr: 2,
              }}
            >
              Close
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              sx={{
                mr: 0,
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}

    </Paper>
  )
}

export default AchievementAddBlock;
