import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Avatar, Box ,Text} from '@chakra-ui/react';

const UserListItem = ({handleFunction}) => {

  const {user}=ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#3882AC",
        color: "White",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mc={2}
      borderRadius="lg"
      >
        <Avatar
         mr={2}
         size="sm"
         cursor="pointer"
         name={user.name}
         src={user.pic}
        />
        <Box>
         <Text>{user.name}</Text>  
         <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
         </Text>
        </Box>
      </Box>
  );
}

export default UserListItem;