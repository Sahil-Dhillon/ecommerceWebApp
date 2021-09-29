import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { CardData } from '../../Local Data/mainServicesData'
const handleAdd = () => {
    // alert("added!")
}
function handleCloseModal(e) {
    // const inputId = e.target.getAttribute('data-item-input-id')
    // console.log(e.target)
    console.log(e)
    document.getElementById(e).checked = false
}
const UseChooseServiceCard = () => {
    const { group, subgroup } = useParams()
    // const groupFilter = CardData.filter(item => item.title === group);
    // console.log(groupFilter[0].options)
    const [servicesData, setservicesData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/services')
            console.log(data)
            const groupFilter = await data.filter(item => item.title === group);
            console.log(groupFilter[0].options)
            const subgroupFilter = await groupFilter[0].options.filter(item => item.item === subgroup);
            const filterData = await subgroupFilter[0].services
            setservicesData(filterData)
        }
        fetchData()
    }, [])
    return (
        <div className="col-12 col-md-6">
            <h2>Choose type of service</h2>
            <ol className="list-group list-group-numbered">
                {
                    servicesData.map((data, index) => {
                        const { name, price } = data
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
                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
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
                                                <div class="form-floating my-2">
                                                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "80px" }}></textarea>
                                                    <label for="floatingTextarea2">Give some more information about your order {`(optional)`}.</label>
                                                </div>
                                                <button class="btn btn-primary float-end" data-bs-target={`#select${name}TimeSlotModal`} data-bs-toggle="modal" data-bs-dismiss="modal">Continue</button>
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
                                                <div className=" my-2">Select Time Slot Suitable for you.</div>
                                                <button class="btn btn-primary float-end" data-bs-target={`#select${name}InfoModal`} data-bs-toggle="modal">Go to Cart</button>
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
