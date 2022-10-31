import React from 'react';
import {Typography, Box, Stack, Card, CardMedia} from '@mui/material';
import { demoProfilePicture } from "../utils/constants";

const Comments = ({comments}) => {

  // const CatComments = comments.slice(1,50)
  const CatComments = comments.filter(comment=> comment.snippet.topLevelComment.snippet.textOriginal.length < 300) // There have been some spammy comments so to help with consistency we filter out comments with an overabundance of words
  return (
    <Stack  direction={"column"}  flexWrap='wrap' justifyContent='start' gap={2} sx={{width:{md:"25%", xs:"100%"}, wordBreak:"break-all"}}>
      {CatComments.map((comment)=> (
        <Card sx={{backgroundColor: "#000",color: "white"}}  justifyContent= "center" alignItems= "center">
          {/* {comment.snippet.topLevelComment.id} */}
          <CardMedia
        image= {comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl|| demoProfilePicture}
         alt={""}
         sx={{borderRadius:'50%', height:'30px', width: '30px' , border: '1px solid #e3e3e3'}}/>
        {/* <img  src= {comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || demoProfilePicture} alt="" 
         style={{borderRadius: "50%",width:"30px", height:"30px"}} /> */}
        <Typography fontSize={"0.7rem"} fontWeight={"bold"}>         
          {comment.snippet.topLevelComment.snippet.authorDisplayName}
          </Typography> 
          <Typography  fontSize={"0.5rem"} fontWeight={"bold"}>    
          {comment.snippet.topLevelComment.snippet.textOriginal}
          </Typography>   
        </Card>
      )) }
      </Stack>
     
  )
}

export default Comments