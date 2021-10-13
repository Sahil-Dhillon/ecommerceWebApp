import React, { useState } from 'react'
import { FaMapPin } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser, saveAddress } from '../../Redux/Actions/userActions';

const Address = () => {
    const history = useHistory()
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    // const cart = useSelector((state) => state.cart);
    // const { savedAddress } = cart;
    if (!userInfo) {
        history.push('/signin');
    }
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("Hisar");
    // const [postalCode, setPostalCode] = useState(serviceAddress.postalCode);
    const [state, setState] = useState("Haryana");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveAddress({ fullName, phone, address, address2, city, state })
        );
        // dispatch(getUser())
        history.push('/cart');
    };
    return (
        <div className="container-md mt-5 py-4 ">
            <div className="row justify-content-center">

                <form class="row g-3 col-6" onSubmit={submitHandler}>
                    <div class="col-md-6">
                        <label for="addressnameinput" class="form-label">Full Name</label>
                        <input type="name" class="form-control" id="addressnameinput" placeholder="Enter full name" value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required />
                    </div>
                    <div class="col-md-6">
                        <label for="addressPhoneInput" class="form-label">Phone No.</label>
                        <input type="tel" class="form-control" id="addressPhoneInput" placeholder="XXXXXXXXXX" name="phone" pattern="[0-9]{10}" value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required />
                    </div>
                    <div class="col-12">
                        <label for="addressInputAddress" class="form-label">Address</label>
                        <input type="text" name="address" class="form-control" id="addressInputAddress" placeholder="1234 Main Street" value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required />
                    </div>
                    <div class="col-12">
                        <label for="addressInputAddress2" class="form-label">Address 2 <span className="text-muted">{`(Optional)`}</span></label>
                        <input type="text" class="form-control" id="addressInputAddress2" placeholder="Apartment, studio, or floor" value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>

                    <div class="col-md-6">
                        <label for="addressInputCity" class="form-label">City</label>
                        <input type="text" name="city" class="form-control" id="addressInputCity" value={city} disabled
                            onChange={(e) => setCity(e.target.value)}
                            required />
                    </div>
                    <div class="col-md-4">
                        <label for="addressInputState" class="form-label">State</label>
                        <select id="addressInputState" class="form-select" disabled value={state}
                            onChange={(e) => setState(e.target.value)}
                            required>
                            <option selected>Haryana</option>
                            <option>...</option>
                        </select>
                    </div>
                    {/* <div class="col-md-2">
                    <label for="inputZip" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="inputZip" />
                </div> */}
                    {/* <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck" />
                        <label class="form-check-label" for="gridCheck">
                            Check me out
                            </label>
                            </div>
                        </div> */}

                    <div class="col-12">
                        <button type="button" class="btn btn-outline-dark">Auto detect Location <FaMapPin /></button>
                    </div>
                    <div className="col-12">
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Continue to Payment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Address
