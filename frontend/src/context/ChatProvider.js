// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const ChatContext = createContext();

// const ChatProvider = ({ children }) => {
//   const [selectedChat, setSelectedChat] = useState("");
//   const [user, setUser] = useState(null);
//   const [notification, setNotification] = useState([]);
//   const [chats, setChats] = useState([]);

//   const history = useHistory();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setUser(userInfo);

//     if (!userInfo) history.push("/");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [history]);

//   return (
//     <ChatContext.Provider
//       value={{
//         selectedChat,
//         setSelectedChat,
//         user,
//         setUser,
//         notification,
//         setNotification,
//         chats,
//         setChats,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const ChatState = () => {
//   return useContext(ChatContext);
// };

// export default ChatProvider;


import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const navigate = useNavigate(); // ✅ Use useNavigate() for React Router v6

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/"); // Redirect to login if no user
    } else {
      setUser(userInfo); // ✅ Correctly set user data
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use ChatContext
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
