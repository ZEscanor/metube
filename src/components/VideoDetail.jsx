import { useState,useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import ReactPlayer from "react-player"; // for showcasing video

import {Typography, Box, Stack, Card} from '@mui/material';

import { CheckCircle } from "@mui/icons-material";

import {Videos} from './';

import { fetchFromAPI } from "../utils/fetchFromAPI";


import { demoProfilePicture } from "../utils/constants";



const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null)
  const [comments, setComments] = useState(null)
  const {id} = useParams();
  useEffect(()=>{
   fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))

      fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=100`)
      .then((data) => setComments(data.items))
  
  },[id]);
  /*How comments are structured relevent data from items call
      Box
      MiniProfilePic #optional - comments.snippet.authorChannelId connect to our channel details state
      UserName     --   comments.snippet.authorDisplayName
      DatePosted ---   .snippet.publishedAt
      text      .snippet. textDisplay or text orignal
      UPVOTE/DOWNVOTE- OPTIONAL  would be just state but .snippet.LikeCount
      REPLYBUTTON also just state
      REPLIES .snippet.totalReplyCount


  */

  if(!videoDetail?.snippet || !comments) return 'Loading....' // need this in order to load data or else page breaks
 
  const {snippet: {title, channelId, channelTitle}, statistics: { viewCount, likeCount} } = videoDetail;
  console.log(comments, " comment Array")
  console.log(comments[0].snippet.topLevelComment.snippet.authorProfileImageUrl," sniipet")
  return (
    <Box minHeight= "95vh">
      <Stack direction= {{xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width:'100%', position: 'sticky', top: '86px'}}>
            <ReactPlayer url={`https//www.youtube.com/watch?v=${id}`}
           className= 'react-player' controls
          />
          <Typography color='#fff' variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Stack direction= "row" justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
            <Link to={`/channel/${channelId}`}>
              <Typography variant = {{sm: 'subtitle1', md: 'h6'}} color= '#fff'>
                {channelTitle}
                <CheckCircle sx={{fontSize: '12px', color: 'gray', ml:'5px'}}  />
              </Typography>
            </Link>
            <Stack direction= "row" gap="20px" alignItems="center">
              <Typography variant="body1" sx={{opacity:0.7}}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body1" sx={{opacity:0.7}}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>


            </Stack>
          </Stack>
          </Box>
        </Box>
        <Box px={2} py={{md:1, xs:5}} justifyContent= "center" alignItems= "center">
        <Videos videos= {videos} direction="column"/>

      </Box>

      <Stack  display="flex" direction={"column"} flexWrap='wrap' justifyContent='start' gap={2} sx={{width:{md:"300px", xs:"100%"}}}>
      {comments.map((comment)=> (
        <Card sx={{backgroundColor: "#1e1e1e",color: "red"}}  justifyContent= "center" alignItems= "center">
          {/* {comment.snippet.topLevelComment.id} */}
        <img src= {comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || demoProfilePicture} alt="hello "/>
        <Typography>         
          {comment.snippet.topLevelComment.snippet.authorDisplayName}
          </Typography> 
          <Typography>    
          {comment.snippet.topLevelComment.snippet.textOriginal}
          </Typography>   
        </Card>
      )) }
      </Stack>
      </Stack>
    
    
    </Box>
  )
}

export default VideoDetail


