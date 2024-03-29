import { useState,useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import ReactPlayer from "react-player"; // for showcasing video

import {Typography, Box, Stack, Card, CardMedia} from '@mui/material';

import { CheckCircle } from "@mui/icons-material";

import {Videos, Comments, LoadingPage} from './';

import { fetchFromAPI } from "../utils/fetchFromAPI";


import { demoProfilePicture } from "../utils/constants";



const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(0)
  const [comments, setComments] = useState(null)
  const {id} = useParams();
  useEffect(()=>{
   fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10`)  // given the limitations of this api max Results doesnt work, by default you get 50 results which can overpopulate
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
 
  if(!videoDetail?.snippet ||!videos || !comments === 0 ) return <LoadingPage/> // need this in order to load data or else page breaks
  console.log(comments, "comments")
  const {snippet: {title, channelId, channelTitle}, statistics: { viewCount, likeCount} } = videoDetail;
   
  const Catvids = videos.slice(0,14)
  
  //console.log(CatComments[5].snippet.topLevelComment.snippet.textOriginal.length)
  
  //console.log(videos,Catvids)

  /*console.log(comments, " comment Array")
  console.log(comments[0].snippet.topLevelComment.snippet.authorProfileImageUrl," sniipet")*/
  return (
    <Box minHeight= "95vh">
      <Stack direction= {{xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width:{xs:'85%', md: "100%"},  top: '86px'}}>  {/* position:sticky?*/}
            <ReactPlayer url={`https//www.youtube.com/watch?v=${id}`}
           className= 'react-player' controls
          />
          <Typography color='#fff' variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Stack direction= "row" justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
            <Link to={`/channel/${channelId}`}>
              <Typography variant = {{sm: 'subtitle1', md: 'h6'}} color= '#fff'>
              <CardMedia
        image= {videoDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
         alt={title}
         sx={{borderRadius:'50%', height:'25px', width: '25px' , mb: 2, border: '1px solid #e3e3e3'}}/>
                {channelTitle}
                <CheckCircle sx={{fontSize: '12px', color: 'gray', ml:'5px'}}  />
              </Typography>
            </Link>
            <Stack direction= "row" gap="20px" alignItems="center">
              <Typography variant="body1" >  {/* sx={{opacity:0.7}}*/}
                {parseInt(viewCount).toLocaleString()} Views
              </Typography>
              <Typography variant="body1"> {/* sx={{opacity:0.7}}*/}
                {parseInt(likeCount).toLocaleString()} Likes
              </Typography>
             
              
            </Stack>
            
          </Stack>
          
          </Box>
        </Box>
        <Box px={1} py={{md:1, xs:5}} justifyContent= "center" alignItems= "center" width={{xs: "100%", md:"350px" }} >
        <Videos videos= {Catvids} direction="column"/>

      </Box>

      {comments && <Comments comments={comments}/>} {/* fixed a bug where if the video had comments disabled it wont not load the page at all based on previous versions of code */}
      {!comments && <Typography color="#fff" fontSize={"0.7rem"} fontWeight={"bold"} paddingRight={"30px"} >Comments are Disabled For This Video</Typography>}
      
      </Stack>
    
    
    </Box>
  )
}

export default VideoDetail
