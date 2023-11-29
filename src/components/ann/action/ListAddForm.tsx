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
import DateW3c from "@/util/DateW3c";

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

interface AddPostForm {
  posts: any;
  postChanger(posts: any, newPostId: string): void;
}

const ListAddForm: React.FunctionComponent<AddPostForm> = ({posts, postChanger}) => {
  const groups: Record<string,string> = {};
  profileGroups.forEach((i) => groups[i.id] = i.title)

  const formId = 'list-add-form';

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPermissionGroups, setIsPermissionGroups] = useState<boolean>(false);
  const [permissionSelectedGroups, setPermissionSelectedGroups] = useState<string[]>([]);

  const handleAddAchievement = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString() ?? '';
    const description = data.get('description')?.toString() ?? '';
    const whocansee = data.get('whocansee')?.toString() ?? '';

    console.log([
      title,
      description,
      whocansee,
      permissionSelectedGroups,
    ]);
    setIsLoading(false);
    setPermissionSelectedGroups([]);
    setIsPermissionGroups(false);

    const l = JSON.parse(JSON.stringify(posts[posts.length - 1]));
    l.data.title = title;
    l.data.description = description;
    l.id = 'post-id-' + DateW3c.now();
    l.data.id = 'another-list-id-' + DateW3c.now();
    l.data.createdAt = new DateW3c();
    l.data.updatedAt = new DateW3c();
    l.createdAt = new DateW3c();
    l.updatedAt = new DateW3c();

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
      className="form form-add list-form"
      component="form"
      onSubmit={handleAddAchievement}
    >
      <Typography variant={'h6'} component={'div'} sx={{pb:1}}>Add list</Typography>
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

export default ListAddForm;
