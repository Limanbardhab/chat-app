import './App.css';
import {Route, Routes} from "react-router-dom";
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import { Router } from 'express';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route Path="/" element={<Homepage/>} exact />
          <Route path="/chats" element={<Chatpage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
