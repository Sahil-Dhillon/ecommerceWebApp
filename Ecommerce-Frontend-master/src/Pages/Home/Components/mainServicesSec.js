import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../../Components/Loading'
import DataError from '../../../Components/DataError'
import { listServices } from '../../../Redux/Actions/serviceActions'
import { useDispatch, useSelector } from 'react-redux'
// import { bootstrap } from 'bootstrap'
// import { CardData } from '../../../Local Data/mainServicesData'

const ServiceCard = ({ link, title, imgLink, details, options }) => {
    const history = useHistory()
    return (
        <div class="card m-2">
            <h5 class="card-header m-2 bg-transparent">{title}</h5>
            <div class="card-body">
                <img src={imgLink} alt={title} className="card-img mh-100" style={{ height: "180px" }} />
                <ul class="list-group list-group-flush my-2">
                    {
                        details.map((detail, index) => {
                            return (
                                <li key={index} class="list-group-item pb-1">{detail}</li>
                            )
                        })
                    }
                </ul>
                <button type="button" class="btn btn-primary py-1 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Next
                </button>
                <div class="modal fade" id="exampleModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content rounded-6 shadow">
                            <div class="modal-body p-5">
                                <h2 class="fw-bold mb-0">{title}</h2>

                                <ul class="d-grid  my-5 list-unstyled">
                                    {
                                        options.map((data, index) => {
                                            const { item, _id } = data
                                            return (
                                                <li key={index} class="gap-4 border-bottom p-2 " >
                                                    <Link
                                                        onClick={() => history.push(`/Services/${title}/${item}`)}
                                                        className="d-flex justify-content-between align-items-center" data-bs-dismiss="modal">
                                                        <div>
                                                            <h5 class="mb-0">{item}</h5>
                                                        </div>
                                                        <FaArrowRight />
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <button type="button" class="btn btn-lg  btn-light mt-5 w-100" data-bs-dismiss="modal" >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UseServicesCard = () => {

    const dispatch = useDispatch()
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList
    useEffect(() => {
        dispatch(listServices())
    }, [dispatch]);
    return (
        <>
            {loading ? <Loading />
                : error ? <DataError>{error}</DataError>
                    :
                    services.map((data, index) => {
                        return (
                            <div key={index} className="col-md-6">
                                <ServiceCard {...data} />
                            </div>
                        )
                    })
            }

        </>
    )
}

export default UseServicesCard;