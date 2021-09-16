import FooterIntro from "./FooterIntro"
import FooterLinks from "./FooterLinks"
import React from 'react';
const Footer = () => {

    return (
        <footer className="footer" >
            <div className="footer__container">
                <div className="container">
                    <div className="footer__container__block">
                        <div className="row ml-minus-15 mr-minus-15">
                            <div className="col-6 p-15">
                                <FooterIntro />
                            </div>
                            <div className="col-6 p-15">
                                <FooterLinks />
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; Copy right Fshop {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}
export default Footer;