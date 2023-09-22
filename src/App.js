import React from "react";
import Header from "./components/common/header/Header"
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Homepages from "./components/home/Homepages";

const App = () =>{
  return(
    <>
      <Router>
      <Header/>
        <Route>
          <Route path='/' component={Homepages}/>
          {/* <Route path='/singlepage/:id' element={<Singlepages/>}></Route>
          <Route  path='/noticias' element={<Noticias/>}></Route> */}
          {/* <Route path='/singlepage/:id' element={<SinglePage/>} /> */}
        </Route>
        {/* <Footer/> */}
      </Router>
    </>
  )
}

export default App
