import React from 'react';
// import { FaBars, FaWhatsapp, FaFacebook } from 'react-icons/fa';
// import { links, social } from '../data';


const Navbar = () => {
    return (
        <nav>
            <div className="scroll-nav-cont">
                <div className="nav-logo-cont">
                    <h3>A Venture by Vault Securities</h3>
                </div>
                <ul className="nav-links-ul">
                    <a href="##">
                        <li>Electronics</li>
                    </a>
                    <a href="##">
                        <li>Plumbing</li>
                    </a>
                    <a href="##">
                        <li>Household</li>
                    </a>
                </ul>
                {/* <ul className="nav-social-ul">
                    <li><a href="#"><FaWhatsapp /></a></li>
                    <li><a href="#"><FaFacebook /></a></li>
                </ul> */}
            </div>
        </nav>
    );
};

export default Navbar;
