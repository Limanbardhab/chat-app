import React ,{useEffect} from 'react'
import { Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs,} from "@chakra-ui/react"
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from "react-router-dom";


const Homepage = () => {

   const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) navigate.push('/chats');

  }, [navigate]);





  return (
    <Container maxW="xl" centerContent>
      <Box
        d="felx"
        justifyContent="cernter"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontFamily="work sans" fontSize="3xl">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" >
          <TabList>
            <Tab w={'50%'}>Login</Tab>
            <Tab w={'50%'}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage