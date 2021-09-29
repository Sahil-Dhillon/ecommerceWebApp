import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {

    return (

        <footer class=" bottom-0 start-0 py-2 py-md-5 container-fluid" style={{ backgroundColor: "#fff" }}>
            <div class="row">
                <div class="col-12 col-md-4 py-2 py-md-0">
                    <h5>Currently serving in</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2 p-0 text-muted">Hisar,Haryana</li>

                    </ul>
                </div>



                <div class="col-md-4 col-12 order-md-1 order-2">
                    <ul class="nav flex-md-column flex-wrap">
                        <li class="nav-item mb-2 px-2 p-md-0"><a href="#" class="nav-link p-0 text-muted">About Us</a></li>
                        <li class="nav-item mb-2 px-2 p-md-0"><a href="#" class="nav-link p-0 text-muted">Privacy Policy</a></li>
                        <li class="nav-item mb-2 px-2 p-md-0"><a href="#" class="nav-link p-0 text-muted">Terms and Conditions</a></li>
                        <li class="nav-item mb-2 px-2 p-md-0"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                        <li class="nav-item mb-2 px-2 p-md-0"><a href="#" class="nav-link p-0 text-muted">Contact Us</a></li>
                    </ul>
                </div>

                <div class="col-md-4 col-12 order-1 py-4 py-md-0">
                    <form>
                        <h5>Register as a Professional</h5>
                        {/* <p>Interested in working our company as an expert</p> */}
                        <div class="d-flex w-100 gap-2">
                            <label for="newsletter1" class="visually-hidden">Phone</label>
                            <input id="newsletter1" type="nummber" class="form-control" placeholder="Phone" />
                            <button class="btn btn-dark" type="button">Register</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center py-4 my-4 border-top">
                <div className="d-flex align-items-center">
                    <img className="d-inline-block mx-2" width="40" height="40" src="./logo192.png" alt="logo" />
                    <p className="m-0">&copy; 2021 Vault Securities, Inc. All rights reserved.</p>
                </div>
                <ul class="list-unstyled d-flex">
                    <li class="ms-3 fs-3"><a class="link-dark p-0" href="#"><FaInstagram /></a></li>
                    <li class="ms-3 fs-3"><a class="link-dark" href="#"><FaTwitter /></a></li>
                    <li class="ms-3 fs-3"><a class="link-dark" href="#"><FaFacebook /></a></li>
                </ul>
            </div>

        </footer>

    )
}

export default Footer