import React from 'react'
import UseServicesCard from './mainServicesSec'
import './sec-2-card.css'
const Services = () => {
    return (
        <section id="service-section">
            <div className="container-md p-4 px-4 ">
                <div className="row">
                    <div className="col-12">
                        <h2 className="fs-3 fw-bold text-center p-2">Scroll through a wide range of services</h2>
                    </div>
                    <UseServicesCard />
                </div>
            </div>
        </section>
    )
}

export default Services;