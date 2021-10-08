import React, { useEffect, useState } from 'react'

const CheckoutSteps = (props) => {
    const [progressBarWidth, setProgressBarWidth] = useState("0")
    const [checkpoint1BgClass, setcheckpoint1BgClass] = useState("bg-secondary")
    const [checkpoint2BgClass, setcheckpoint2BgClass] = useState("bg-secondary")
    const [checkpoint3BgClass, setcheckpoint3BgClass] = useState("bg-secondary")
    const [checkpoint4BgClass, setcheckpoint4BgClass] = useState("bg-secondary")
    // const [step, setStep] = useState("0")
    // window.onload = () => {
    //     setStep(document.getElementById("checkoutSteps").getAttribute("data-step"))
    // }
    // console.log(step)
    useEffect(() => {
        if (props.step1) {
            setProgressBarWidth("25%")
            setcheckpoint1BgClass("bg-primary")
            setcheckpoint2BgClass("bg-secondary")
            setcheckpoint3BgClass("bg-secondary")
            setcheckpoint4BgClass("bg-secondary")
        }
        if (props.step2) {
            setProgressBarWidth("50%")
            setcheckpoint1BgClass("bg-primary")
            setcheckpoint2BgClass("bg-primary")
            setcheckpoint3BgClass("bg-secondary")
            setcheckpoint4BgClass("bg-secondary")
        }
        if (props.step3) {
            setProgressBarWidth("75%")
            setcheckpoint1BgClass("bg-primary")
            setcheckpoint2BgClass("bg-primary")
            setcheckpoint3BgClass("bg-primary")
            setcheckpoint4BgClass("bg-secondary")
        }
        if (props.step4) {
            setProgressBarWidth("100%")
            setcheckpoint1BgClass("bg-primary")
            setcheckpoint2BgClass("bg-primary")
            setcheckpoint3BgClass("bg-primary")
            setcheckpoint4BgClass("bg-primary")
        }
    }, [props])
    return (
        <div className="row justify-content-center m-4">
            <div className="position-relative col-10 col-md-8 my-4 ">
                <div class="progress position-absolute top-50 start-50 translate-middle w-100 " style={{ height: "8px" }}>
                    <div class="progress-bar " style={{ width: progressBarWidth }} role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className={`progress-checkpoints position-absolute top-0 translate-middle p-2 border border-2 border-light rounded-circle ${checkpoint1BgClass}`} style={{ left: "25%" }}></div>
                <span className="text-primary position-absolute translate-middle-x p-2" style={{ left: "25%" }}>SignIn</span>
                <div className={`progress-checkpoints position-absolute top-0 start-50 translate-middle p-2 border border-2 border-light rounded-circle ${checkpoint2BgClass}`}></div>
                <span className="text-primary position-absolute start-50 translate-middle-x p-2" style={{ left: "25%" }}>Address</span>
                <div className={`progress-checkpoints position-absolute top-0 translate-middle p-2 border border-2 border-light rounded-circle ${checkpoint3BgClass}`} style={{ left: "75%" }}></div>
                <span className="text-primary position-absolute translate-middle-x p-2" style={{ left: "75%" }}>Checkout</span>
                <div className={`progress-checkpoints position-absolute top-0 start-100 translate-middle p-2 border border-2 border-light rounded-circle ${checkpoint4BgClass}`}></div>
                <span className="text-primary position-absolute start-100 translate-middle-x p-2 lh-1" style={{ left: "25%" }}>Order Placed</span>
            </div>
        </div>
    )
}

export default CheckoutSteps
