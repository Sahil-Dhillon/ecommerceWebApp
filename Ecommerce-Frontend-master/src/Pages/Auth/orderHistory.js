import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthError } from '../../Components/DataError'
import Loading from '../../Components/Loading'
import { fetchOrderHistory } from '../../Redux/Actions/orderActions'
const OrdersCard = (props) => {
    const { subgroup, name, details, timeSlot, comment, price } = props
    return (
        <div class="card mb-2 border border-0">
            <div class="row g-0">
                <div class="col-md-4">
                    {/* <img src="https://source.unsplash.com/nature" class="img-fluid rounded-start" alt="..." width="200"  /> */}
                </div>
                <div class="col-md-8">
                    <div class="card-body ">
                        <h4 class="card-title">{subgroup}/{name}</h4>
                        <p class="card-text">{details}</p>
                        {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                        <div>
                            Preffered time slot:
                            <strong className="px-2">{timeSlot}</strong>
                        </div>
                        <p>{comment === "undefined" ? "No extra information added" : comment}</p>
                        <div className="d-flex align-items-center w-full justify-content-between">
                            <strong className="border-end px-3 fs-2">₹{price}</strong>

                        </div>
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
                <h2 className="text-white p-3 text-center">Order History</h2>
                {
                    loading ? (
                        <Loading></Loading>
                    ) : error ? (
                        <AuthError>{error}</AuthError>
                    ) : (
                        orders.map((data, index) => {

                            return (

                                <OrdersCard {...data} key={index} />
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default OrderHistory
