import React, {useState} from "react";
import {Box, Chip, Paper, Tab, Typography} from "@mui/material";
import DateW3c from "@/util/DateW3c";
import {config} from "@/config";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ShareButtons from "@/components/ShareButtons";
import {generateListUrl} from "@/util/UrlGenerator";

interface ListDetailsBlockProps {
  list: any;
}

const ListDetailsBlock: React.FunctionComponent<ListDetailsBlockProps> = ({list}) => {
  const isNew = Math.floor(((new DateW3c()).getTime() - (new DateW3c(list.createdAt)).getTime())/1000) < config.post.periodOfNewInSeconds;
  const [value, setValue] = useState<string>('none');

  const handlePostTabChange = async (event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        p: 1,
        mb: 1,
      }}
    >
      <Typography
        className="post-title"
        variant="body1"
        component="div"
      >
        {list.title}{isNew && (<Chip variant="new" label="new" color="success"/>)}
      </Typography>

      <Box
        className="post-subheader"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <Typography
          className="date-created-at date"
          variant="body1"
          component="div"
          sx={{
            mr: {xs: 1, md: 2},
          }}
        >
          created: {list.createdAt.toUserView()}
        </Typography>

        <Typography
          className="subheader"
          variant="body1"
          component="div"
        >
          achievements: {list.achievementsAmount > 0 ? list.achievementsAmount : 'none'}
        </Typography>
      </Box>

      <Typography
        className="post-description"
        variant="body1"
        component="div"
        sx={{
          pt: 1,
        }}
      >
        {list.description}
      </Typography>

      <Box sx={{ width: '100%', typography: 'body1', pt: 1 }}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handlePostTabChange} aria-label="post details">
              <Tab label="Share" value={`list-share-${list.id}`} />
              <Tab label="Comments" value={`list-comments-${list.id}`} />
            </TabList>
          </Box>
          <TabPanel value={`list-share-${list.id}`}>
            <ShareButtons shareUrl={generateListUrl(list)} title={list.title}/>
          </TabPanel>
          <TabPanel value={`post-comments-${list.id}`}>
            Comments
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  )
}

export default ListDetailsBlock;
