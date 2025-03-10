import { ChatState } from "../context/ChatProvider"
import SideDrawer from "../components/miscellaneous/SideDrawer"
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const Chatpage = () => {
 const {user} = ChatState()
 const [fetchAgain,setFetchAgain ] =useState("");

 return(
  <div style={{width:"100%"}} >
    {user && <SideDrawer/>}
    <Box
    d="flex"
    justifyContent = 'space-between'
    w='100%'
    h='91.5vh'
    p='10px'
    >
      {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
    </Box>
  </div>
 );
 
};

export default Chatpage