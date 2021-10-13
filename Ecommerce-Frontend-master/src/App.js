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
import OrderPlacing from './Pages/Order/order'
import ScrollToTop from './scrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Redux/Actions/userActions'

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
            <Cart />
          </Route>
          <Route path='/checkout'>
            <OrderPlacing />
          </Route>

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