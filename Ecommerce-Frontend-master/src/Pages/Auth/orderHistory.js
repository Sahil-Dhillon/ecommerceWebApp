import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthError } from '../../Components/DataError'
import Loading from '../../Components/Loading'
import { fetchOrderHistory } from '../../Redux/Actions/orderActions'

const ItemCard = (props) => {
    const { subgroup, name, details, timeSlot, comment, price } = props
    return (
        <div class="card m-2 border-bottom ">
            <div class="card-body ">
                <h4 class="card-title fs-5">{subgroup}/{name}</h4>
                <p class="card-text">{details}</p>
                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                <div style={{ fontSize: "0.8em" }}>
                    Time slot:
                    <strong className="px-2" >{timeSlot}</strong>
                </div>
                <p style={{ fontSize: "0.8em" }}>{comment ? comment : "No extra information added"}</p>
                <div className="d-flex align-items-center w-full justify-content-between">
                    <strong className="fs-5">₹{price}</strong>

                </div>
            </div>
        </div>
    )
}

const OrderCard = (props) => {
    const { orderItems, serviceAddress, servicesPrice, taxPrice, totalPrice, isPaid, isServed, createdAt } = props
    return (
        <div className="card mb-2 p-2">
            <div className="row">
                <div className="col-md-4">
                    {
                        orderItems.map((data, index) => {
                            return (
                                <ItemCard {...data} key={index} />
                            )
                        })
                    }
                </div>
                <div className="col-md-3">
                    <div className="m-2">

                        <h4>Service Address</h4>
                        <div className="col-12  my-2">
                            <div style={{ fontSize: "0.8em" }}>
                                <p className="m-0 text-capitalize">{serviceAddress.fullName}</p>
                                <p className="m-0">{serviceAddress.address}</p>
                                <p className="m-0">{serviceAddress.address2}</p>
                                <p className="m-0">{serviceAddress.city + ", " + serviceAddress.state}</p>
                                <p className="m-0">{serviceAddress.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="m-2">
                        <ul class="list-unstyled">
                            <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Order Subtotal </strong><span>₹{servicesPrice}</span></li>
                            {/* <li class="d-flex justify-content-between py-1 border-bottom">
                            <strong class="text-muted">Shipping and handling</strong><span>₹{shipping}</span>
                        </li> */}
                            <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Tax</strong><span>₹{taxPrice}</span></li>
                            <li class="d-flex justify-content-between py-1 border-bottom"><strong class="">Total</strong>
                                <strong class="font-weight-bold">₹{totalPrice}</strong>
                            </li>
                            <li class="d-flex justify-content-between py-1 border-bottom"><strong class="">Paid</strong>
                                <strong class="font-weight-bold">{isPaid ? "Yes" : "No"}</strong>
                            </li>
                            <li class="d-flex justify-content-between py-1 border-bottom"><strong class="">Served</strong>
                                <strong class="font-weight-bold">{isServed ? "Yes" : "No"}</strong>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderHistory = () => {
    const orderHistory = useSelector((state) => state.orderHistory);
    const { loading, error, orders } = orderHistory;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrderHistory());
    }, [dispatch]);
    return (
        <div className="min-vh-100" style={{ background: "var(--primary-2)", }}>

            <div className="container-md " >
                <h2 className="text-white p-3 text-center">Order History <span class="badge bg-secondary">{orders ? orders.length : 0}</span></h2>
                {
                    loading ? (
                        <Loading></Loading>
                    ) : error ? (
                        <AuthError>{error}</AuthError>
                    ) : (
                        orders.slice(0).reverse().map((data, index) => {
                            return (
                                <OrderCard {...data} key={index} />
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default OrderHistory
