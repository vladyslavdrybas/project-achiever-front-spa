import React, {useState} from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  Chip,
  Autocomplete,
  Typography,
} from "@mui/material";
import {Dayjs} from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers";
import {profileGroups, profileLists} from "@/artifacts/faked";
import {toast} from "react-toastify";

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

interface AchievementForm {
  posts: any;
  postChanger(posts: any, newPostId: string): void;
}

const AchievementAddForm: React.FunctionComponent<AchievementForm> = ({posts, postChanger}) => {
  const lists: Record<string,string> = {};
  const groups: Record<string,string> = {};
  profileLists.forEach((i) => lists[i.id] = i.title)
  profileGroups.forEach((i) => groups[i.id] = i.title)

  const maxHashes: number = 10;
  const formId = 'achievement-add-form';

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completeAt, setCompleteAt] = useState<Dayjs | null>(null);
  const [startAt, setStartAt] = useState<Dayjs | null>(null);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [isPermissionGroups, setIsPermissionGroups] = useState<boolean>(false);
  const [permissionSelectedGroups, setPermissionSelectedGroups] = useState<string[]>([]);

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
      hashTags,
      list,
      whocansee,
      permissionSelectedGroups,
    ]);
    setIsLoading(false);
    setHashTags([]);
    setPermissionSelectedGroups([]);
    setIsPermissionGroups(false);
    setStartAt(null);
    setCompleteAt(null);

    console.log(posts);
    const l = posts.pop();
    l.data.title = 'BlaBla';
    l.id = 'some id';
    l.data.id = 'another id';

    posts.unshift(l);
    console.log(posts);

    postChanger(posts, l.id);
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
    <Box
      id={formId}
      className="form form-add achievement-form"
      component="form"
      onSubmit={handleAddAchievement}
    >
      <Typography variant={'h6'} component={'div'} sx={{pb:1}}>Add achievement</Typography>
      <TextField
        className="form-add-textfield"
        disabled={isLoading}
        margin="normal"
        required
        fullWidth
        id={`${formId}-title`}
        label="Title"
        name="title"
        sx={{
          mb: 2,
          mt: 0,
        }}
      />
      <TextField
        className="form-add-textfield"
        disabled={isLoading}
        margin="normal"
        required
        fullWidth
        id={`${formId}-description`}
        label="Description"
        name="description"
        multiline
        maxRows={20}
        sx={{
          mb: 2,
          mt: 0,
        }}
      />
      <DateTimePicker
        className="form-add-date-time-picker"
        disabled={isLoading}
        value={startAt}
        onChange={(e: Dayjs|null) => {
            setStartAt(e);
          }
        }
        ampm={false}
        sx={{
          minWidth: "100%",
          mb: 2,
          mt: 0,
        }}
      />
      <DateTimePicker
        className="form-add-date-time-picker"
        disabled={isLoading}
        value={completeAt}
        onChange={(e: Dayjs|null) => {
            setCompleteAt(e);
          }
        }
        ampm={false}
        sx={{
          minWidth: "100%",
          mb: 2,
          mt: 0,
        }}
      />

      <Autocomplete
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
        value={hashTags}
        onChange={(event: any, newValues: string[] | null) => {
            if (null === newValues) {
              newValues = [];
            }
            if (newValues) {
              const hashTag = newValues[newValues.length - 1].trim();

              if (hashTag === '') {
                newValues.pop();
                toast.error(`Trying to add empty hash tag.`);
                return;
              }

              for (let i = 0; i < newValues.length - 2; i++)
              {
                if (newValues[i] === hashTag) {
                  newValues.pop();
                  break;
                }
              }
            }
            if (newValues.length > maxHashes) {
              newValues = newValues.slice(0,maxHashes);
              toast.error(`Max ${maxHashes} hash tags allowed.`);
            }
            setHashTags(newValues);
          }
        }
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip variant="tag" color="secondary" label={option} {...props({ index })} />
          ))
        }
        renderInput={(params) => <TextField
            className="form-add-textfield"
            label="Add Hash Tags"
            {...params}
            onKeyDown={(e: any) => {
              if (e.key === " " && e.target.value) {
                const hashTag = e.target.value.toString().trim();
                if (hashTag === '') {
                  toast.error(`Trying to add empty hash tag.`);
                  return;
                }
                if (!hashTags.includes(hashTag)) {
                  if (hashTags.length < maxHashes) {
                    hashTags.push(hashTag);
                    setHashTags(hashTags);
                  } else {
                    toast.error(`Max ${maxHashes} hash tags allowed.`);
                  }
                  e.target.value = null;
                } else {
                  e.target.value = hashTag;
                }
              }
            }}
          />
        }
        sx={{
          mb: 2,
          mt: 0,
        }}
      />

      <FormControl
        fullWidth
        sx={{
          mb: 2,
          mt: 0,
        }}
      >
        <InputLabel id={`${formId}-select-list-label`}>List</InputLabel>
        <Select
          className="form-add-select"
          labelId={`${formId}-select-list-label`}
          id={`${formId}-select-list`}
          label="List"
          name="list"
          required
        >
          {Object.keys(lists).map((key:string) => (
            <MenuItem key={key} value={key}>{lists[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        sx={{
          mb: 2,
          mt: 0,
        }}
      >
        <InputLabel id={`${formId}-select-whocansee-label`}>Who can see</InputLabel>
        <Select
          className="form-add-select"
          labelId={`${formId}-select-whocansee-label`}
          id={`${formId}-select-whocansee`}
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
        <FormControl
          fullWidth
          sx={{
            mb: 2,
            mt: 0,
          }}
        >
          <InputLabel id={`${formId}-select-groups-label`}>Groups</InputLabel>
          <Select
            className="form-add-select"
            labelId={`${formId}-select-groups-label`}
            label="Groups   "
            id={`${formId}-select-groups`}
            multiple
            value={permissionSelectedGroups}
            onChange={handleSelectGroupChange}
            input={<OutlinedInput id={`${formId}-select-groups-input`} label="Chip" />}
            renderValue={(selected: any) => (
              <>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value:string) => (
                  <Chip variant="filled" color="secondary" key={value} label={groups[value]} />
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
          width: '100%',
        }}
      >
        <Button
          className="form-add-btn btn-action"
          id={`${formId}-btn-submit`}
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
  )
}

export default AchievementAddForm;
