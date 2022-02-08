import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { AuthError } from '../../Components/DataError';
import Loading from '../../Components/Loading';
import { getOrderDetails, initiateTransaction, payOrder } from '../../Redux/Actions/orderActions';
import { INITIATE_TRANSACTION_RESET, ORDER_PAY_RESET } from '../../Redux/Constants/orderConstants';

const CheckoutItemCard = (props) => {
    const { _id, subgroup, name, details, timeSlot, comment, price } = props
    return (
        <div className="card p-2">
            <h4 className="card-title fs-5 text-wrap">{subgroup}/{name}</h4>
            <div className="row">
                <div className="col-6">
                    <p className=" my-0  text-wrap">{comment}</p>
                    <p className="m-0 text-wrap">{timeSlot}</p>
                </div>
                <div className="col-6">
                    <strong className="fs-5 float-end">₹{price}</strong>
                </div>
            </div>
        </div>
    )
}



const OrderCheckOut = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userSignin);
    const orderDetails = useSelector((state) => state.orderDetails);
    const initiateTransactionState = useSelector((state) => state.initiateTransaction);
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay,
    } = useSelector((state) => state.orderPayment);

    const { id: orderId } = useParams()
    const { order } = orderDetails;
    const { initiationResponse } = initiateTransactionState;
    const [sdkReady, setSdkReady] = useState(false)
    const [txnToken, setTxnToken] = useState()
    const [orderItems, setOrderItems] = useState([])
    const [serviceAddress, setServiceAddress] = useState([])
    const [orderData, setOrderData] = useState({})

    const initiateTransactionHandler = () => {
        if (order, userInfo) {
            dispatch(initiateTransaction(orderId));
        }
    }

    // const txnToken = initiationResponse.body.txnToken
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId, successPay]);

    useEffect(() => {
        if (order) {
            if (successPay) {
                // document.querySelector("#app-close-btn") && document.querySelector("#app-close-btn").click(
                dispatch({ type: INITIATE_TRANSACTION_RESET })
                dispatch({ type: ORDER_PAY_RESET })
                history.push(`/orderStatus/${orderId}`)
                window.location.reload(true)
            }
            setOrderData(order)
            setOrderItems(order.orderItems)
            setServiceAddress(order.serviceAddress)
        }
    }, [dispatch, orderId, order,]);


    const addPayTmScript = async (orderId, txnToken, amount) => {
        const { data } = await axios.get('/api/orders/config/paytm', {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        const src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${data}.js`
        console.log(src)
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = ''
        script.src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${data}.js`
        script.async = true;
        script.onload = () => {
            var config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": orderId,
                    "token": txnToken,
                    "tokenType": "TXN_TOKEN",
                    "amount": amount
                },
                "merchant": {
                    "redirect": false
                },
                "payMode": {
                    "order": ['UPI', 'CARD', 'NB', 'BALANCE']
                },
                "handler": {
                    "transactionStatus": function (data) {
                        console.log("payment status ", data);
                        dispatch(payOrder(order, data));
                    },
                    "notifyMerchant": function (eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            };

            if (window.Paytm && window.Paytm.CheckoutJS) {
                window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                    // initialze configuration using init method 
                    console.log(config)
                    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                        // after successfully update configuration invoke checkoutjs
                        window.Paytm.CheckoutJS.invoke();
                    }).catch(function onError(error) {
                        console.log("error => ", error);
                    });
                });
            }
        }
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (initiationResponse && initiationResponse.body) {
            console.log(initiationResponse.body.resultInfo.resultStatus)
            if (initiationResponse.body.resultInfo.resultStatus == "S") {
                setTxnToken(initiationResponse.body.txnToken)
                console.log(initiationResponse)
            }
        }
    }, [dispatch, initiationResponse]);
    useEffect(() => {
        if (txnToken) {
            if (!window.Paytm) {
                addPayTmScript(orderId, txnToken, order.totalPrice);
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, sdkReady, txnToken]);

    return (
        <div className="min-vh-100" style={{ background: "var(--primary-2)", }}>
            {/* <div className="container-md " >
                <h2 className="text-white p-3 text-center">
                    Order Payment Status:
                    {orderDetails.loading ? (
                        <Loading></Loading>
                    ) : orderDetails.error ? (
                        <AuthError>{orderDetails.error}</AuthError>
                    ) : (
                        order.isPaid ? "Successful" : "Unsuccessful"
                    )}
                </h2>
                {
                    initiateTransactionState.loading ? (
                        <Loading />
                    ) : initiateTransactionState.error ? (
                        <AuthError> {initiateTransactionState.error}</AuthError>
                    ) : initiationResponse && initiationResponse.body.resultInfo.resultStatus == "S" ? (
                        <button
                        // onClick={() => addPayTmScript(orderId, txnToken, order.totalPrice)}
                        > Pay now </button>
                    ) : (
                        <AuthError> {initiationResponse.body.resultInfo.resultMsg}</AuthError>
                    )
                }
            </div> */}
            <div className="container-md">
                <div className="row  justify-content-center">
                    <div className="col-12 g-0 px-4 col-sm-10 col-md-8 m-4 bg-white">
                        <div className="col-12 my-2 p-2 bg-light">
                            <strong className=" fs-3">Confirm Order</strong>
                        </div>
                        <div className="col-12 mb-2 p-2 bg-light">
                            <h5>Order Services</h5>
                            <div className="col-12  bg-white my-2">
                                {
                                    orderItems.map((data, index) => {
                                        return (
                                            <CheckoutItemCard {...data} key={index} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="row p-2 gx-2">

                            <div className="col-12 col-md-6  p-2 ">
                                <h5>Service Address</h5>
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
                            {/* <h5>Service Address</h5> */}
                            <div className="col-12 col-md-6 position-relative border rounded p-2">
                                {/* <strong class="text-uppercase invisible">Order summary </strong> */}
                                <ul class="list-unstyled mb-1 my-3 my-md-0">
                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Order Subtotal </strong><span>₹{orderData.servicesPrice}</span></li>
                                    {/* <li class="d-flex justify-content-between py-1 border-bottom">
                                                                        <strong class="text-muted">Shipping and handling</strong><span>₹{shipping}</span>
                                                                    </li> */}
                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Tax</strong><span>₹{orderData.taxPrice}</span></li>
                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="">Total</strong>
                                        <strong class="font-weight-bold">₹{orderData.totalPrice}</strong>
                                    </li>
                                </ul>
                                <div className="col-12 ">
                                    <button type="button" class="btn btn-white  col-12 col-md-6"  >Cancel Order</button>
                                    <button type="button" class="btn btn-dark col-12 col-md-6" style={{ background: "var(--primary-2)" }} onClick={initiateTransactionHandler} >Checkout</button>
                                </div>
                            </div>
                            {/* <div className="col-12 col-md-6 mb-2 p-2 bg-light"> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


















export default OrderCheckOut
