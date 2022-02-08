import React, { useEffect, useState } from 'react'
import { ImCross, ImCheckmark } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails } from '../../Redux/Actions/orderActions'
import CheckoutSteps from './Components/checkoutsteps'
const OrderStatus = () => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { id: orderId } = useParams()
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);
    return (
        <div className="min-vh-100" style={{ background: "var(--primary-2)", }}>
            <Link to="/">Home</Link>
            <div className="container-md">
                <div className="row  justify-content-center">
                    <div className="col-12 g-0 px-4 col-sm-10 col-md-8 m-4 bg-light">
                        {orderDetails.order && orderDetails.order.paymentStatus.status == "TXN_SUCCESS" ? <ImCheckmark fill='MediumSeaGreen' /> : <ImCross fill='red' />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus
