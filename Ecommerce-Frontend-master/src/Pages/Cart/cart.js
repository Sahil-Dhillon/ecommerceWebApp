import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { NoItemInCart } from '../../Components/DataError'
import { addToCart, removeAllFromCart, removeFromCart, removeSavedAddress, selectAddress } from '../../Redux/Actions/cartActions'
const CartItemCard = (props) => {
    const dispatch = useDispatch();
    const { id, subgroup, name, details, timeSlot, comment, price } = props
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    return (
        <div class="card mb-2">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://source.unsplash.com/nature" class="img-fluid rounded-start" alt="..." />
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
                            <button className="btn btn-outline-danger m-2" onClick={() => removeFromCartHandler(id)}>Remove</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


const Cart = () => {


    const SavedAddress = (props) => {
        const { id, fullName, phone, address, address2, city, state } = props
        const selectAddressHandler = (e) => {
            console.log(e.target.value)
            // dispatch(selectAddress(e.target.value))
        }
        const removeAddresshandler = (id) => {
            dispatch(removeSavedAddress(id))
        }

        return (
            <div class="form-check">
                <input class="form-check-input" type="radio" name="addressRadios" id={`radioAddress${id}`} value={`${id}`} onChange={(e) => selectAddressHandler(e)} />
                <label class="form-check-label" for={`radioAddress${id}`}>
                    <div className="card m-1">
                        <div className="card-body">
                            <h4 className="text-capitalize">{fullName}</h4>
                            <p className="mb-0 ">{phone}</p>
                            <p className="mb-0">{address}</p>
                            <p className="mb-0">{address2}</p>
                            <p className="mb-0 text-capitalize">{city + ", " + state}</p>
                            <span className="" role="button" onClick={() => removeAddresshandler(id)}>
                                <FaTrash className="text-danger" /><span className="text-danger"> Remove</span>
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
    const { userInfo } = userSignin;
    // if (!userInfo) {
    //     history.push('/signin')
    // }
    // const serviceUserComment = window.location.search ? String(window.location.search.split('=')[1]) : "No extra comments added by user"
    // const { group, subgroup, service, timeSlot, comment } = useParams()
    // useEffect(() => {
    //     if (service, timeSlot) {
    //         dispatch(addToCart(group, subgroup, service, timeSlot, comment))
    //     }
    // }, [dispatch, group, subgroup, service, timeSlot, comment])
    const cart = useSelector((state) => state.cart)
    const { cartItems, savedAddress } = cart
    console.log(cartItems)
    var subTotal = cartItems.reduce((a, c) => a + c.price, 0)
    var tax = subTotal / 10
    var shipping = cartItems.length > 0 ? 50 : 0
    var grandTotal = subTotal + tax + shipping
    const removeAllFromCartHandler = () => {
        dispatch(removeAllFromCart())
    }

    return (
        <div style={{
            background: "-webkit-linear-gradient(to right, #eecda3, #ef629f)",
            background: "linear-gradient(to right, #005e7cff, #001242ff)",
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
                                        <button className="btn btn-danger" onClick={() => removeAllFromCartHandler()}>Remove All</button>
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
                                        <p class="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                                        {
                                            savedAddress.map((data, index) => {
                                                return (
                                                    <SavedAddress {...data} key={index} />
                                                )
                                            })
                                        }
                                        <Link type="button" class="btn btn-dark px-4 rounded-pill" to="/user/addAddress">Add Address</Link>
                                    </div>
                                    <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                                    <div class="p-4">
                                        <p class="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                                        <div class="input-group mb-4 border rounded-pill p-2">
                                            <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" class="form-control border-0" />
                                            <div class="input-group-append border-0">
                                                <button id="button-addon3" type="button" class="btn btn-dark px-4 rounded-pill"><i class="fa fa-gift mr-2"></i>Apply coupon</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                                    <div class="p-4">
                                        <p class="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                                        <textarea name="" cols="30" rows="2" class="form-control"></textarea>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                                    <div class="p-4">
                                        <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                                        <ul class="list-unstyled mb-4">
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>₹{subTotal}</strong></li>
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>₹{shipping}</strong></li>
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>₹{tax}</strong></li>
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                                                <h5 class="font-weight-bold">₹{grandTotal}</h5>
                                            </li>
                                        </ul><Link to="signIn?redirect=checkout/address" class="btn btn-dark rounded-pill py-2 btn-block" disabled={cartItems.length === 0}>Procceed to checkout</Link>
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
