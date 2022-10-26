import { Stack, Box } from "@mui/material";
import {VideoCard, ChannelCard, LoadingPage} from "./";

const Videos = ({videos, direction}) => {
  console.log(videos)
  if(!videos?.length) return <LoadingPage/>
  return (
    <Stack direction={direction ||"row"} flexWrap='wrap'
    justifyContent='start' alignItems="start" gap={2}>
      {videos.map((item,idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item}/>}
          {item.id.channelId && <ChannelCard channelDetail={item}/>}
        </Box>
      ))}</Stack>
  )
}

export default Videos