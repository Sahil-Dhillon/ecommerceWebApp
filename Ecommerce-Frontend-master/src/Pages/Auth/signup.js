import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { signup } from '../../Redux/Actions/userActions'
import Loading from '../../Components/Loading'
import { AuthError, FormValidateError } from '../../Components/DataError'
const SignUp = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validateError, setValidateError] = useState()
    const dispatch = useDispatch()
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
        e.preventDefault()
        if (validateError) {
            return
        } else {
            dispatch(signup(name, email, password))
        }
    }

    const history = useHistory()
    const userSignup = useSelector((state) => state.userSignup)
    const { userInfo, loading, error } = userSignup
    const redirect = window.location.search ? window.location.search.split("=")[1] : '/'
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])
    return (
        <div className="container-sm vh-100">

            <div className="row h-100 justify-content-center align-items-center">
                <form className="col-10 col-md-8 col-lg-4" onSubmit={submitHandler}>
                    <h2 className="text-center m-4">Sign Up </h2>
                    {loading && <Loading />}
                    {error && <AuthError>{error}</AuthError>}
                    <div class="form-floating mb-2">
                        <input type="name" class="form-control rounded-pill" id="floatingNameInput" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label for="floatingNameInput">Full Name</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="email" class="form-control rounded-pill" id="floatingEmailInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label for="floatingEmailInput">Email address</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="password" class="form-control rounded-pill" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label for="floatingPassword">Password</label>

                    </div>
                    <div class="form-floating ">
                        <input type="password" class="form-control rounded-pill" id="floatingConfirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
                        <button type="submit" class="btn btn-dark rounded-pill m-3 col-4">Continue <FaArrowRight /></button>
                        <span className="col-10 text-center"><Link to={`/signin?redirect=${redirect}`}> Sign In Instead</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
