import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { signin } from '../../Redux/Actions/userActions'
import Loading from '../../Components/Loading'
import { AuthError } from '../../Components/DataError'
const SignIn = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }
    const history = useHistory()
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo, loading, error } = userSignin
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
                    <h2 className="text-center m-4">Sign In</h2>
                    {loading && <Loading />}
                    {error && <AuthError>{error}</AuthError>}
                    <div class="form-floating mb-2">
                        <input type="email" class="form-control rounded-pill" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating ">
                        <input type="password" class="form-control rounded-pill" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label for="floatingPassword">Password</label>
                    </div>
                    {/* <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div> */}
                    <div className="row justify-content-center">
                        <button type="submit" class="btn btn-dark rounded-pill m-3 col-4">Continue <FaArrowRight /></button>
                        <span className="col-10 text-center">New User?<Link to={`/signup?redirect=${redirect}`}> Sign Up</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
