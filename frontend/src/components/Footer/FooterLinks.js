import React, { useState } from "react";
import ShowFooterLinks from "./ShowFooterLinks";
const FooterLinks = () => {
    const [state] = useState({
        pages: [
            { id: 1, name: 'home', route: '/' },
            { id: 2, name: 'about', route: '/about' },

        ],
        partners: [
            { id: 1, name: 'Bitis', route: 'https://www.bitis.com/' },
        ],
        headings: {
            pages: 'pages',
            partners: 'partners',
            destinations: 'destinations',
        },
    });
    const { headings, pages, partners } = state;
    return (
        <div className="row">
            <div className="col-6 s-6 sx-6 p-15">
                <h3 className="footer__heading">{headings.pages}</h3>
                <ShowFooterLinks links={pages} />
            </div>
            <div className="col-6 s-6 sx-6 p-15">
                <h3 className="footer__heading">{headings.partners}</h3>
                <ShowFooterLinks links={partners} external={true} />
            </div>
        </div>
    )
}
export default FooterLinks