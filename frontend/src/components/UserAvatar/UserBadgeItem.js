import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = (user,handleFunction) => {
  return (
  <Box 
   px={2}
   py={1}
   borderRadius="lg"
   mb={2}
   variant="solid"
   fontSize={12}
   backgroundColor="purple"
   color="white"
   cursor="pointer"
   onClick={handleFunction}
  >
     {user.name}
  </Box>
  )
}

export default UserBadgeItem;