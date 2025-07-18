import React from 'react'
import Noticias from './noticias/Noticias'
import Home from './mainContent/homes/Home'
// import Footer from './footer/Footer'
// import Noticias from './noticias/Noticias'


//  const Homepages = () => {
//   return (
//     <>
//       <Noticias />
//       <Home />
      
//     </>
    
//   )
// }
const Homepages = ({ usuario }) => {

    return (
    <>
      <Noticias />
      <Home usuario={usuario} />
    </>
    
  )
};


export default Homepages
