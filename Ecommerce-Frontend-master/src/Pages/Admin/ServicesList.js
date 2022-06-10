import React, { useEffect } from 'react'
import { FaAngleDown, FaAngleUp, FaCross, FaTrash } from 'react-icons/fa';
import { IoAddSharp } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import DataError from '../../Components/DataError';
import Loading from '../../Components/Loading';
import { detailsServices, listServices } from '../../Redux/Actions/serviceActions';
const addServiceHandler = (e) => {
    console.log(e);

};

const ServiceCard = ({ title, options }) => {
    // const [iconFace, setIconFace] = useState("Down");
    // useEffect(() => {
    //     document.querySelector(".subgroup-tabs-admin-services").addEventListener('mouseover', () => {
    //         document.querySelectorAll(".subgroup-tabs-admin-services .fab-service-add").forEach((e) => {
    //             e.classList.toggle("d-none");
    //         })
    //     })
    // }, [])


    return (
        <div>
            <div className="card">
                <h2 class="mx-auto my-3 card-title">{title}</h2>
                <div className="card-body p-0">
                    <div className="row p-4">
                        {
                            options.map((data, index) => {
                                const { item, _id, services } = data
                                return (
                                    <div className="col-6 subgroup-tabs-admin-services">
                                        <h4 className="card-title">{item}</h4>
                                        <ol className="list-group list-group-numbered">
                                            {
                                                services.map((data, index) => {
                                                    const { availability, details, name, price, _id } = data

                                                    return (
                                                        <div className="">
                                                            <div className="d-flex justify-content-between align-items-center border ">

                                                                <li key={index} class="w-100" >
                                                                    <div class="ms-2 me-auto p-2 d-flex justify-content-between align-items-center " >
                                                                        <div class="fw-300">{name}</div>
                                                                        <FaTrash fill="#F44336" type='button' />
                                                                    </div>
                                                                </li>
                                                                <div className=" border-start px-2" type='button'>
                                                                    {
                                                                        // <FaAngleUp className='collapsed p-0' data-bs-toggle="collapse" data-bs-target={`#${item}${name}content`} aria-expanded="false" aria-controls={`${item}${name}content`} /> :
                                                                        <FaAngleDown className='collapsed p-0' data-bs-toggle="collapse" data-bs-target={`#${item}${name}content`} aria-expanded="false" aria-controls={`${item}${name}content`} />
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div id={`${item}${name}content`} class="accordion-collapse collapse card rounded-0" >
                                                                <div class="card-footer">
                                                                    <ul>
                                                                        {availability ? <li>Available to serve.</li> :
                                                                            <li className='text-danger'>Unavailable</li>}
                                                                        <li>{price}</li>
                                                                        <li>{details}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </ol>
                                        <div className="position-relative h-0">
                                            <div className="fab-service-add " onClick={addServiceHandler}>

                                                <MdAdd className='fab-add-icon position-absolute top-50 start-50 translate-middle fs-4' data-bs-toggle="modal" data-bs-target="#addServiceBackdrop" />

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <ul class="d-grid  my-5 list-unstyled">

            </ul>
        </div>
    )
};

const ServicesList = () => {
    const dispatch = useDispatch()
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList
    const serviceDetails = useSelector((state) => state.serviceDetails);
    const loadingServiceDetails = serviceDetails.loading
    const errorServiceDetails = serviceDetails.error
    const { service } = serviceDetails;
    useEffect(() => {
        dispatch(listServices())
    }, [dispatch]);



    console.log(services)
    return (
        <div className="min-vh-100" style={{ background: "var(--primary-2)", }
        }>
            <div class="modal fade" id="addServiceBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addServiceBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addServiceBackdropLabel">Add New Service</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row mb-3">
                                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" id="inputName" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputDetails" class="col-sm-2 col-form-label">Details</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" id="inputDetails" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputPrice" class="col-sm-2 col-form-label">Price</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" id="inputPrice" />
                                    </div>
                                </div>
                                <fieldset class="row mb-3">
                                    <legend class="col-form-label col-sm-2 pt-0">Is Avaiabile?</legend>
                                    <div class="col-sm-10">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value={true} checked />
                                            <label class="form-check-label" for="gridRadios1">
                                                Yes
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value={false} />
                                            <label class="form-check-label" for="gridRadios2">
                                                No
                                            </label>
                                        </div>Graphic Designer - Larana, Inc.
                                        Create Branding Design for clients product
                                        Making branding design for client or company needs
                                        Experiences
                                        2020
                                        Senior Graphic Designer - Fauget
                                        Create design for product promotion from companies
                                        Making design content for branding client  needs
                                        Making illustration for branding client  needs
                                        2021

                                    </div>
                                </fieldset>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <button type="button" class="btn btn-primary">Understood</button> */}
                                    <button type="submit" class="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-md p-4 overflow-hidden">
                <div className="row justify-content-start ">
                    <h2 className="fs-3 fw-bold text-center p-2 col-12 text-light">Available Services</h2>
                    {loading ? <Loading />
                        : error ? <DataError>{error}</DataError>
                            :
                            services.map((data, index) => {
                                return (
                                    <div key={index} className="">
                                        <ServiceCard {...data} />

                                    </div>
                                )
                            })
                    }
                </div>

            </div>
        </div>
    )
}

export default ServicesList
