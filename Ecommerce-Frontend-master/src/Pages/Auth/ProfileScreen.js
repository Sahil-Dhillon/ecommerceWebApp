import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AuthError, FormValidateError, MessageBox } from '../../Components/DataError';
import Loading from '../../Components/Loading';
import { getUser, updateUserProfile } from '../../Redux/Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../Redux/Constants/userConstants';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validateError, setValidateError] = useState();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, currentUser } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!currentUser) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(getUser(userInfo._id));
        } else {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setPassword("");
            setConfirmPassword("");
        }
    }, [dispatch, userInfo._id, currentUser]);

    useEffect(() => {
        if (password.length > 0 && password.length < 8) {
            setValidateError("* Passwords must not be less than 8 letters")
        } else if (confirmPassword.length > 0 && confirmPassword !== password) {
            setValidateError("* Confirm password doesn't match")
        } else {
            setValidateError("")
        }
    }, [password, confirmPassword])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(updateUserProfile({ userId: currentUser._id, name, email, password }));
        }
    };
    return (
        <div className="container-sm vh-100">

            <div className="row h-100 justify-content-center align-items-center">
                <form autocomplete="off" className="col-10 col-md-8 col-lg-4" onSubmit={submitHandler}>
                    <h2 className="text-center m-4">User Profile</h2>
                    {loading ? <Loading /> : error ? <AuthError>{error}</AuthError> :
                        <>
                            {loadingUpdate && <Loading></Loading>}
                            {errorUpdate && (
                                <MessageBox variant="danger">{errorUpdate}</MessageBox>
                            )}
                            {successUpdate && (
                                <MessageBox variant="success">
                                    Profile Updated Successfully
                                </MessageBox>
                            )}
                            <div class="form-floating mb-2">
                                <input type="name" class="form-control rounded-pill" id="floatingNameInput" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <label for="floatingNameInput">Full Name</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="email" class="form-control rounded-pill" id="floatingEmailInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label for="floatingEmailInput">Email address</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input autocomplete="off" type="password" class="form-control rounded-pill" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label for="floatingPassword">Password</label>

                            </div>
                            <div class="form-floating ">
                                <input type="password" class="form-control rounded-pill" id="floatingConfirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label for="floatingConfirmPassword">Confirm Password</label>
                                {
                                    <FormValidateError>{validateError}</FormValidateError>

                                }
                            </div>
                            {/* <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div> */}
                            <div className="row justify-content-center">
                                <button type="submit" class="btn btn-dark rounded-pill m-3 col-4">Update <FaArrowRight /></button>
                                {/* <span className="col-10 text-center"><Link to={`/signin?redirect=${redirect}`}> Sign In Instead</Link></span> */}
                            </div>
                        </>
                    }
                </form>
            </div>
        </div>
    )
}

export default ProfileScreen
