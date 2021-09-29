import React from 'react'
import VideoConsultationBanner from '../../Components/Jumbotrons/videoConsultation'
import Hero from './Components/hero'
import HowItWorks from './Components/howItWorks'
import ServicesSection from './Components/servicesSection'
function Home() {

    return (
        <>
            <Hero />
            <HowItWorks />
            <div
                style={{ backgroundColor: "var(--light-1)" }}
            >
                <VideoConsultationBanner />
                <ServicesSection />
            </div>
        </>
    )
}
export default Home