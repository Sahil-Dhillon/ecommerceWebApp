import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaUserClock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import DataError from '../../Components/DataError'
import Loading from '../../Components/Loading'
import { detailsServices } from '../../Redux/Actions/serviceActions'
const handleAdd = () => {
    // alert("added!")
}
function handleCloseModal(e) {
    document.getElementById(e).checked = false
}



const UseChooseServiceCard = () => {
    const { group, subgroup } = useParams()
    const [errorMessage, setErrorMessage] = useState(null)
    const [startTime, setStartTime] = useState("09:00")
    const [endTime, setEndTime] = useState("20:00")
    const [startTimeFormatted, setStartTimeFormatted] = useState(startTime)
    const [endTimeFormatted, setEndTimeFormatted] = useState(endTime)
    useEffect(() => {
        timeFormat(startTime, setStartTimeFormatted)
        timeFormat(endTime, setEndTimeFormatted)
        if (startTime < "09:00" || endTime > "20:00") {
            setErrorMessage("Select between 9:00 AM to 8:00 PM")
        } else {
            setErrorMessage(null)
        }
    }, [startTime, endTime])
    const timeFormat = (time, formatTime) => {
        var timeSplit = time.split(':'),
            hours,
            minutes,
            meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours == 12) {
            meridian = "Noon"
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
                hours = 12;
                meridian = "Midnight"
            }
        } else {
            meridian = 'PM';
        }
        formatTime(hours + ':' + minutes + ' ' + meridian);
    }

    const services_group_subgroup = `${group}/${subgroup}`
    const dispatch = useDispatch();
    const serviceDetails = useSelector((state) => state.serviceDetails);
    const { loading, error, service } = serviceDetails;

    useEffect(() => {
        dispatch(detailsServices(services_group_subgroup));
    }, [dispatch, services_group_subgroup]);
    return (
        <>
            {loading ? <Loading />
                : error ? <DataError>{error}</DataError>
                    : (<div className="col-12 col-md-6">
                        <h2>Choose type of service</h2>
                        <ol className="list-group list-group-numbered">
                            {
                                service.map((data, index) => {
                                    const { name, price, details } = data
                                    return (
                                        <>
                                            <li key={index} class="list-group-item d-flex justify-content-between align-items-center  collapsed" data-bs-toggle="collapse" data-bs-target={`#${name}`} aria-expanded="false" aria-controls={name}>
                                                <div class="ms-2 me-auto" >
                                                    <div class="fw-bold">{name}</div>
                                                    ₹{price}
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <input class=" services-input-checkbox mx-2" id={`input${name}`} type="checkbox" value="" onClick={handleAdd} data-bs-toggle="modal" href={`#select${name}InfoModal`} />
                                                    <FaAngleDown />
                                                </div>
                                            </li>
                                            <div id={name} class="accordion-collapse collapse card rounded-0" >
                                                <div class="card-footer">
                                                    {details}
                                                </div>
                                            </div>
                                            <div class="modal fade" id={`select${name}InfoModal`} data-bs-backdrop="static" aria-hidden="true" aria-labelledby={`select${name}InfoModalLabel`} tabindex="-1">
                                                <div class="modal-dialog modal-dialog-centered">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id={`select${name}InfoModalLabel`}>{subgroup}/{name} </h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" data-item-input-id={`input${name}`} aria-label="Close" onClick={(e) => handleCloseModal(e.target.getAttribute("data-item-input-id"))}></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p>{details}</p>
                                                            <div class="form-floating my-2">
                                                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "80px" }}></textarea>
                                                                <label for="floatingTextarea2">Give some more information about your order {`(optional)`}.</label>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <strong className="fs-5">₹{price}</strong>
                                                                <button class="btn btn-primary float-end" data-bs-target={`#select${name}TimeSlotModal`} data-bs-toggle="modal" data-bs-dismiss="modal">Continue to Slot selection</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal fade" id={`select${name}TimeSlotModal`} aria-hidden="true" data-bs-backdrop="static" aria-labelledby={`select${name}TimeSlotModalLabel`} tabindex="-1">
                                                <div class="modal-dialog modal-dialog-centered">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id={`select${name}TimeSlotModalLabel`}>{subgroup}/{name}</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" data-item-input-id={`input${name}`} aria-label="Close" onClick={(e) => handleCloseModal(e.target.getAttribute("data-item-input-id"))} ></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div className=" row">
                                                                <FaUserClock className="col-12 col-md-6" style={{ fontSize: "100px", color: "var(--primary)" }} />
                                                                <div className="col-12 col-md-6 ">
                                                                    <h5>Select Time Slot</h5>
                                                                    <div class="input-group mb-3 ">
                                                                        <label class="input-group-text" for="inputGroupFile01">Start</label>
                                                                        <input type="time" class="form-control" onChange={(e) => setStartTime(e.target.value)} value={startTime} />
                                                                    </div>
                                                                    <div class="input-group mb-3">
                                                                        <label class="input-group-text" for="inputGroupFile01">End</label>
                                                                        <input type="time" class="form-control" onChange={(e) => setEndTime(e.target.value)} value={endTime} />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <p className="text-danger fs-6 m-2">{errorMessage}</p>
                                                            <strong className="">{startTimeFormatted} to {endTimeFormatted}</strong>
                                                            <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                                                <strong className="fs-5">₹{price}</strong>
                                                                <button class="btn btn-primary float-end" data-bs-target={`#select${name}InfoModal`} data-bs-toggle="modal">Add to Cart</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }

                        </ol>
                    </div>
                    )
            }
        </>
    )
}
function Service() {
    console.log(useParams())
    const { group, subgroup } = useParams()
    // const groupFilter = CardData.filter(item => item.title === group);
    // const subgroupFilter = groupFilter[0].options.filter(item => item.item === subgroup);
    // const servicesData = subgroupFilter[0].services
    return (
        <section id="services-hero" className="container-fluid py-5 " >
            <div className="container-md ">
                <div className="row py-2">
                    <div className="col-12 col-md-8">
                        <div className="text-white my-4">
                            <h1 style={{ fontSize: "4rem", fontWeight: "400" }}>
                                {group}/{subgroup}
                            </h1>
                            {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia.</p> */}
                        </div>
                        {/* <h1>{subgroup}</h1> */}
                    </div>
                </div>
                <UseChooseServiceCard />

            </div>


        </section>
    )
}

export default Service
