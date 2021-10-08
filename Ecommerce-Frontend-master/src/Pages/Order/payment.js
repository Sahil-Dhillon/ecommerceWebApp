import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { savePaymentMethod } from '../../Redux/Actions/cartActions';

const Payment = () => {
    const history = useHistory()
    const cart = useSelector((state) => state.cart);
    const { serviceAddress } = cart;
    if (!serviceAddress.address) {
        history.push('/checkout/address');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/checkout/placeorder');
    };
    return (
        <div className="container-md">
            <form className="row" onSubmit={submitHandler}>
                <h2>Choose Payment Method</h2>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="paymentRadio1" value="option1" checked onChange={(e) => setPaymentMethod(e.target.value)} />
                    <label class="form-check-label" for="paymentRadio1">
                        PayPal
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="paymentRadio2" value="option2" onChange={(e) => setPaymentMethod(e.target.value)} />
                    <label class="form-check-label" for="paymentRadio2">
                        Stripe
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="paymentRadio3" value="option3" disabled onChange={(e) => setPaymentMethod(e.target.value)} />
                    <label class="form-check-label" for="paymentRadio3">
                        Credit/Debit Card
                    </label>
                </div>
                <div>
                    <button className="btn btn-warning">Continue to Pay</button>
                </div>
            </form>
        </div>
    )
}

export default Payment
