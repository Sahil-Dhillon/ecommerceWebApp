import React from 'react'

import { FaClock, FaDoorOpen, FaPencilAlt, FaTools } from 'react-icons/fa'

const HowItWorks = () => {
    return (
        <section id="howItWorks" className="p-3 pb-5">
            <div className="container-md text-white ">
                <h2 className="my-4 py-2 ps-3 text-white text-center text-md-start" style={{ border: "2px dashed var(--white50)" }}>
                    How it Works!</h2>
                <div className="section-2-steps-card ">
                    <h3 className="fs-6 mb-0 mx-2">Choose type of service</h3>
                    <FaTools className="fs-5" />
                </div>
                <div className="section-2-steps-card ">
                    <h3 className="fs-6 mb-0 mx-2">Provide more info</h3>
                    <FaPencilAlt className="fs-5" />
                </div>
                <div className="section-2-steps-card">
                    <h3 className="fs-6 mb-0 mx-2">Choose preffered time slot</h3>
                    <FaClock className="fs-5" />
                </div>
                <div className="section-2-steps-card">
                    <h3 className="fs-6 mb-0 mx-2">Our professional will be at site on time</h3>
                    <FaDoorOpen className="fs-5" />
                </div>
            </div>
        </section>
    )
}
export default HowItWorks;