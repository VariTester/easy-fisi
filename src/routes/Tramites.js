// import Hero from "../components/Hero";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import AyahuascaImage from "../assets/images/selva2.jpg"
// import AboutUsData from "../components/AboutUsData";

import Footer from '../components/home/footer/Footer';
import Tramites from '../components/home/mainContent/tramites/Tramites'
import Side from '../components/home/sideContent/side/Side';
function Tramitesroute (){
    return(
        <>
              <main>
        <div className='container'>
            <section className='mainContent'>
                {/* <Mvistos/> */}
                <Tramites/>
                {/* <Cursos/>
                <Foro/> */}
 
            </section>

            <section className='sideContent'>
              <Side/>
            </section>
        </div>
      </main>

       
        {/* <section className='sideContent'>
            <Side/>
        </section> */}
        {/* <Navbar/>
        <Hero 
            cName = "hero-mid"
            // heroImg = "https://images.unsplash.com/photo-1570998401604-dc1cb6929fff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heroImg = {AyahuascaImage}
            title = "About Us"
            text = "Why are we the best choice for you?"
            // buttonText = "Retreat Plans"
            // url = "/"
            // btnClass = "show"
        />
        <AboutUsData/>
        <Footer/> */}
        
        </>
    )
}

export default Tramitesroute;