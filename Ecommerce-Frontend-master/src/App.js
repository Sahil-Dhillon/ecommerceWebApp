import React, { useEffect } from 'react'
import './main.css'
import Navbartop from './Components/Header/Navbartop'
import Home from './Pages/Home/home'
import Footer from './Components/Footer/footer'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './Pages/error'
import Service from './Pages/Services/Service'
import Cart from './Pages/Cart/cart'
import SignIn from './Pages/Auth/signin'
import SignUp from './Pages/Auth/signup'
import Address from './Pages/Order/address'
import CheckoutSteps from './Pages/Order/Components/checkoutsteps'
import ScrollToTop from './scrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Redux/Actions/userActions'
import OrderHistory from './Pages/Auth/orderHistory'
import OrderCheckOut from './Pages/Order/orderCheckout'
import OrderStatus from './Pages/Order/orderStatus'
import PrivateRoute from './Components/PrivateRoute'
import ProfileScreen from './Pages/Auth/ProfileScreen'
import AdminRoute from './Components/AdminRoute'
import ServicesList from './Pages/Admin/ServicesList'

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) {
      dispatch(getUser())
    }
  }, [userInfo, dispatch])
  return (
    <Router>
      <Navbartop />
      <ScrollToTop>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/Services/:group/:subgroup">
            <Service />
          </Route>
          <Route path="/Cart">
            <CheckoutSteps step1 />
            <Cart />
          </Route>
          {/* <Route path='/order'>
            <OrderPlacing />
          </Route> */}
          <Route path='/order/:id'>
            <CheckoutSteps step2 />
            <OrderCheckOut />
          </Route>
          <Route path='/orderStatus/:id'>
            <CheckoutSteps step4 />
            <OrderStatus />
          </Route>

          <Route path='/user/orderHistory'>
            <OrderHistory />
          </Route>
          <PrivateRoute
            path="/user/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/ServicesList"
            component={ServicesList}
          ></AdminRoute>
          <Route path='/user/addAddress'>
            <Address />
          </Route>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </ScrollToTop>
      <Footer />
    </Router>
  )

}

export default App;