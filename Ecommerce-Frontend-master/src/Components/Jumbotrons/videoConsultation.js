import React from 'react'

const VideoConsultationBanner = () => {

    return (
        <div className="container-fluid p-4  text-black justify-content-sm-between align-items-center justify-content-center text-center text-sm-start" style={{ background: "white" }}>
            <h2 className="fs-2 ">Wanna Consult something about any service?</h2>
            <h3 className="fs-5 pb-3 fw-light">Book a free audio/text/video consultation anytime.</h3>
            <h4 className="fs-6 text-secondary">Available: 9:00am to 7:30pm</h4>
            <button className="btn btn-dark px-4">Book</button>
        </div>
    )
}
export default VideoConsultationBanner