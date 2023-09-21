import React , {useState} from 'react'
import Head from "./Head";
import "./header.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";

const Header = () => {
const [navbar, setnavbar] = useState(false);
  return (
    <>
    <Head/>
    <header>
      <div className="container paddingSmall">
        <nav>
            <ul className={navbar ? 'navbar':'flex'} onClick={()=>setnavbar(false)}>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/culture'>culture</Link></li>
                <li><Link to='/politics'>politics</Link></li>
                <li><Link to='/memes'>memes</Link></li>
                <li><Link to='/sports'>sports</Link></li>
                <li><Link to='/boxed'>boxed</Link></li>
                <li><Link to='/reviews'>reviews</Link></li>
            </ul>
            <button className='barIco' onClick={()=> setnavbar(!navbar)}>
            {navbar ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
        </nav>
      </div> 
    </header>
    </>
  )
}

export default Header
