import "./FooterStyles.css"

// import FooterLogo from "../assets/images/logo.png"

const Footer = () =>{
    return(
        <div className="footer">
            <div className="top">
                <div>
                    {/* <img src={FooterLogo}></img> */}
                    <p>¡ Your best option for an ayahuasca healing !</p>
                </div>
                <div>
                <a href='https://wa.me/51992329593?text=Hi I need more information ' target='_blank'>
                <i className="fab fa-whatsapp-square"></i>
                </a>

                    <a href="https://www.facebook.com/profile.php?id=61556666640051&mibextid=LQQJ4d">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    <a href="https://youtube.com/@AmazonNaturalHealingCenter?si=0VPNcChM04YDAlpc">
                        <i className="fa-brands fa-youtube-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>
                </div>
            </div>
            <div className="bottom">
                <div>
                    <h4>Project</h4>
                    <a href="/">Changelog</a>
                    <a href="/">Status</a>
                    <a href="/">License</a>
                    <a href="/">All versions</a>
                </div>
                <div>
                    <h4>Project</h4>
                    <a href="/">Github</a>
                    <a href="/">Issues</a>
                    <a href="/">Project</a>
                    <a href="/">Twitter</a>
                </div>
                <div>
                    <h4>Project</h4>
                    <a href="/">Support</a>
                    <a href="/">Troubleshooting</a>
                    <a href="/">Contact Us</a>
                </div>
            </div>
        </div>
    )
}

export default Footer