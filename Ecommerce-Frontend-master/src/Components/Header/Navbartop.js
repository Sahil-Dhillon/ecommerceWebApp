import React, { useState } from 'react';
// import { FaBars, FaWhatsapp, FaFacebook } from 'react-icons/fa';
// import { links, social } from '../data';

const useYScrollOffset = () => {
    const [yOffset, setYOffset] = useState(0)
    const handleScroll = () => {
        setYOffset(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return yOffset
}
const Navbar = () => {
    var navScrollBgClass = "nan"
    var navScrollLinkClass = "nan"
    if (useYScrollOffset() < 70) {
        navScrollBgClass = 'navbar  fixed-top navbar-expand-lg bg-transparent navbar-dark '
    }
    else {
        navScrollBgClass = 'navbar  fixed-top navbar-expand-lg bg-white navbar-light'
        navScrollLinkClass = 'text-black'
    }

    return (
        <>

            <nav className={navScrollBgClass} >
                <div class="container-md">
                    <div className="navbar-brand text-line fw-light" onClick={() => window.location.href = '/'}>
                        <img className="nav-logo-img d-inline-block align-text-center mx-2" width="40" height="40" src="./logo192.png" alt="logo" />
                        A Venture by Vault Securities
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">A Venture by Vault Securities</h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 nav-links-ul">
                                <li>
                                    <a href="#section-2" className={navScrollLinkClass}>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="##" className={navScrollLinkClass}>
                                        Contact
                                    </a>
                                </li>
                                <a href="##" >
                                    <li className="login-btn">Login | Sign Up</li>
                                </a>
                                {/* <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li> */}
                                {/* <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr class="dropdown-divider" />
                                        </li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </>
    );
};

export default Navbar;
