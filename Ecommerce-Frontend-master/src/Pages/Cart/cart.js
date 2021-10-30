import React, { useEffect, useState } from 'react'
import { FaGift, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AuthError, NoItemInCart } from '../../Components/DataError'
import Loading from '../../Components/Loading'
import { emptyCart, removeFromCart } from '../../Redux/Actions/cartActions'
import { createOrder } from '../../Redux/Actions/orderActions'
import { getUser, removeSavedAddress } from '../../Redux/Actions/userActions'
import { ORDER_CREATE_RESET } from '../../Redux/Constants/orderConstants'

const CheckoutItemCard = (props) => {
    const { _id, subgroup, name, details, timeSlot, comment, price } = props
    return (
        <div className="py-1 px-2 border-bottom border-1">
            <h4 className="card-title m-0 text-wrap">{subgroup}/{name}</h4>
            <p className=" my-0 text-wrap">{comment}</p>
            <strong className="fs-5 float-end">₹{price}</strong>
            <p className="m-0 text-wrap">{timeSlot}</p>
        </div>
    )
}
const CartItemCard = (props) => {
    const dispatch = useDispatch();
    const { _id, subgroup, name, details, timeSlot, comment, price } = props
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    return (
        <div class="card mb-2">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://source.unsplash.com/800x400/nature" class="img-fluid rounded-start" alt="..." />
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
                            <button className="btn btn-outline-danger m-2" onClick={() => removeFromCartHandler(_id)}>Remove</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


const Cart = () => {
    const [serviceAddress, setServiceAddress] = useState()
    const [addressChecked, setAddressChecked] = useState()
    const SavedAddress = (props) => {
        const { _id, fullName, phone, address, address2, city, state } = props
        const selectAddressHandler = (e, i) => {
            setServiceAddress(savedAddress.find((x) => x._id == e.target.value))
            // console.log()

        }
        const removeAddresshandler = (id) => {
            dispatch(removeSavedAddress(id))
        }

        return (
            <div class="form-check w-100">
                <input class="form-check-input" type="radio" name="addressRadios" id={`radioAddress${_id}`} value={`${_id}`} onChange={(e) => selectAddressHandler(e)} />
                <label class="form-check-label w-100" for={`radioAddress${_id}`}>
                    <div className="card m-1">
                        <div className="card-body">
                            <h4 className="text-capitalize ">{fullName}</h4>
                            <p className="mb-0 ">{phone}</p>
                            <p className="mb-0">{address}</p>
                            <p className="mb-0">{address2}</p>
                            <p className="mb-0 text-capitalize">{city + ", " + state}</p>
                            <span className="" role="button" onClick={() => removeAddresshandler(_id)}>
                                <FaTrash className="text-danger" /><span className="text-danger">Remove</span>
                            </span>
                        </div>
                    </div>
                </label>
            </div>
        )
    }
    const dispatch = useDispatch();
    const history = useHistory()
    const userSignin = useSelector((state) => state.userSignin);
    const userDetails = useSelector((state) => state.userDetails)
    const orderCreate = useSelector((state) => state.orderCreate)
    const { userInfo } = userSignin
    const { currentUser } = userDetails;
    const { loading: orderCreateLoading, success: orderCreateSuccess, error: orderCreateError, order } = orderCreate;
    const [savedAddress, setSavedAddress] = useState()
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin?redirect=/Cart')
        }
        if (currentUser) {
            setSavedAddress(currentUser.savedAddress)
            setCartItems(currentUser.cartItems)

        }
    }, [currentUser, userInfo])

    var subTotal = cartItems.reduce((a, c) => a + c.price, 0)
    var tax = subTotal / 10
    // var shipping = cartItems.length > 0 ? 50 : 0
    var shipping = 0
    var grandTotal = subTotal + tax + shipping
    const emptyCartHandler = () => {
        dispatch(emptyCart())
    }

    const placeOrderHandler = () => {

        dispatch(createOrder({ orderItems: cartItems, paymentMethod: "payTm", serviceAddress: serviceAddress, servicesPrice: subTotal, taxPrice: tax, totalPrice: grandTotal }))
    }
    useEffect(() => {
        if (orderCreateSuccess) {
            history.push(`/order/${order._id}`);
            // dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, history, orderCreateSuccess]);
    return (
        <div style={{
            background: "var(--primary-2)",
            minHeight: "100vh"
        }}>
            <div class="px-4 px-lg-0 py-4">
                <div class="py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                <h2>Cart</h2>
                                {cartItems.length > 0 ?
                                    <div className="d-flex justify-content-between align-items center m-2">
                                        <p> You have {cartItems.length} item in your cart</p>
                                        <button className="btn btn-danger" onClick={() => emptyCartHandler()}>Remove All</button>
                                    </div>
                                    : <NoItemInCart />}
                                {/* <!-- Shopping cart table --> */}
                                {
                                    cartItems.map((data, index) => {
                                        return (
                                            <CartItemCard {...data} key={index} />
                                        )
                                    })
                                }
                                {/* <!-- End of table --> */}
                            </div>
                        </div>
                        {cartItems.length > 0 &&
                            <div class="row py-5 p-4 bg-white rounded shadow-sm">
                                <div class="col-lg-6">
                                    <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Address</div>
                                    <div class="p-4">
                                        {
                                            savedAddress ?
                                                savedAddress.map((data, index) => {
                                                    return (
                                                        <SavedAddress {...data} key={index} />
                                                    )
                                                }) :
                                                <p class="font-italic mb-4">No Address saved.</p>
                                        }
                                        <Link type="button" class="btn btn-dark px-4 my-2 rounded-pill" to="/user/addAddress">Add Address</Link>
                                    </div>
                                    <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                                    <div class="p-4">
                                        <p class="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                                        <div class="input-group mb-4 border rounded-pill p-2">
                                            <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" class="form-control border-0" />
                                            <div class="input-group-append border-0">
                                                <button id="button-addon3" type="button" class="btn btn-light px-4 rounded-pill">
                                                    <FaGift />
                                                    Apply coupon</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                                    <div class="p-4">
                                        <p class="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                                        <textarea name="" cols="30" rows="2" class="form-control"></textarea>
                                    </div> */}
                                </div>
                                <div class="col-lg-6">
                                    <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                                    <div class="p-4">
                                        <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                                        <ul class="list-unstyled mb-4">
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>₹{subTotal}</strong></li>
                                            {/* <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>₹{shipping}</strong></li> */}
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>₹{tax}</strong></li>
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                                                <h5 class="font-weight-bold">₹{grandTotal}</h5>
                                            </li>
                                        </ul>
                                        {/* <button class="btn btn-dark rounded-pill py-2 btn-block"
                                            // data-bs-target="#checkOutModal" data-bs-toggle="modal"
                                            onClick={placeOrderHandler}>Procceed to checkout</button> */}
                                        {
                                            serviceAddress ?
                                                <button type="button" class="btn btn-dark rounded-pill px-4 py-2 btn-block" onClick={placeOrderHandler} >Continue to Place Order</button>
                                                :
                                                <button type="button" class="btn btn-secondary rounded-pill px-4 py-2 btn-block" disabled  >Continue to Place Order</button>

                                        }
                                        {orderCreateLoading && <Loading />}
                                        {orderCreateError && <AuthError>{orderCreateError}</AuthError>}
                                        <div class="modal fade" id="checkOutModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="checkOutModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content  rounded-6 shadow bg-light">
                                                    <div className="modal-header text-white" style={{ background: "var(--primary-2)" }}>
                                                        <strong className="fs-4">Order Details</strong>
                                                    </div>
                                                    <div class="modal-body container-md">
                                                        <div className="m-1 ">
                                                            {
                                                                cartItems.map((data, index) => {
                                                                    return (
                                                                        <CheckoutItemCard {...data} key={index} />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className="row m-1 my-3">
                                                            <div className="col-12 col-md-6">

                                                                {
                                                                    serviceAddress ?
                                                                        <div >
                                                                            <strong className="fs-5">Service Address</strong>
                                                                            <p className="m-0">{serviceAddress.fullName}</p>
                                                                            <p className="m-0">{serviceAddress.address}</p>
                                                                            <p className="m-0">{serviceAddress.address2}</p>
                                                                            <p className="m-0">{serviceAddress.city + ", " + serviceAddress.state}</p>
                                                                            <p className="m-0">{serviceAddress.phone}</p>
                                                                        </div> : <div className="text-danger text-wrap">Select service address to continue.</div>

                                                                }
                                                            </div>
                                                            <div className="col-12 col-md-6 position-relative">
                                                                {/* <strong class="text-uppercase invisible">Order summary </strong> */}
                                                                <ul class="list-unstyled mb-1 my-3 my-md-0">
                                                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Order Subtotal </strong><span>₹{subTotal}</span></li>
                                                                    {/* <li class="d-flex justify-content-between py-1 border-bottom">
                                                                        <strong class="text-muted">Shipping and handling</strong><span>₹{shipping}</span>
                                                                        </li> */}
                                                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Tax</strong><span>₹{tax}</span></li>
                                                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Total</strong>
                                                                        <h6 class="font-weight-bold">₹{grandTotal}</h6>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="row ">
                                                            <button type="button" class="btn btn-white  col-12 col-md-6" data-bs-dismiss="modal" >Close</button>
                                                            {
                                                                serviceAddress ?
                                                                    <button type="button" class="btn btn-dark col-12 col-md-6" data-bs-dismiss="modal" onClick={placeOrderHandler} >Continue to Pay</button>
                                                                    :
                                                                    <button type="button" class="btn btn-secondary col-12 col-md-6" disabled  >Continue to Pay</button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
