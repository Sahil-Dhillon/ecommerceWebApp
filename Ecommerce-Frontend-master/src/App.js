import React from 'react'
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
function App() {
  return (
    <Router>
      <Navbartop />
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
      <Footer />
    </Router>
  )

}

export default App;