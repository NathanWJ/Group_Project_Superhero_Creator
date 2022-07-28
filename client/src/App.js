import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// Above allows for routing and individual pages instead of everything on one page: 
// - Add <BrowserRouter><BrowserRouter/> tags at the highest level wrapper of the return
// - Add <Routes><Routes/> tags around the individual pages
// - Add "Route" components to the paths and elements

//TODO: Update imports for all the component pages to import 
//TODO: If two or more elements are at the same "path" create a "Main.js" in "views" folder
import HeroAll from './components/HeroAll';
import HeroCompare from './components/HeroCompare';
import HeroCreate from './components/HeroCreate';
import HeroEdit from './components/HeroEdit';
import HeroViewOne from './components/HeroViewOne';
import UserRegistration from "./components/UserRegistration"
import UserLogin from "./components/UserLogin"

//TODO: Update "element" tags to match src>components files
//TODO: Update "path" tags 
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handelLogin = (props) => {
    console.log(loggedIn);
    setLoggedIn(!loggedIn)
  }
  console.log(loggedIn);

  return (
    <div className="App">
      <>
        <BrowserRouter>


          <Routes>
            <Route path="/" element={<HeroAll />}  loggedIn={loggedIn} />
            <Route path="/heroes/new" element={<HeroCreate />} />
            <Route path="/heroes/:id" element={<HeroViewOne />} />
            <Route path="/heroes/edit/:id" element={<HeroEdit />} />
            <Route path="/heroes/compare" element={<HeroCompare />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/login" element={<UserLogin handelLogin={handelLogin} />} setLoggedIn={setLoggedIn}  />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;