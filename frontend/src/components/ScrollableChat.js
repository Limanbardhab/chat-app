import React from 'react';
import { Tooltip } from "@chakra-ui/tooltip";


import ScrollableFeed from 'react-scrollable-feed';
import { isLastmessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic';
import { ChatState } from "../context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";


const ScrollableChat = ({messages}) => {

  const {user} = ChatState();

  return (
    <ScrollableFeed>
      {messages && messages.map((m,i)=>{
        <div style={{display:"flex"}} key={m._id}>
          {
            (isSameSender(messages,m,i,user._id) || isLastmessage(messages,i,user._id)) && 
            (<Tooltip 
              lable={m.sender.name }
              placement="bottom-start"
              hasArrow
            > 
            <Avatar 
              mt="7px"
              mr={1}
              size="sm"
              cursor="pointer"
              name={m.sender.name}
              src={m.sender.pic}
            />

            </Tooltip>
      )}
        <span 
         style={{
          backgroundColor:`${
          m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
          }`,
          borderRadius:"20px",
          padding:"5px 15px",
          maxWidth:"75%",
          margineLeft:isSameSenderMargin(messages,m,i,user._id),
          marginTop: isSameUser(messages,m,i,user._id) ? 3 : 10,
         }}
        >
          {m.content}
        </span>


        </div>
      })}
    </ScrollableFeed>
  )
}

export default ScrollableChat