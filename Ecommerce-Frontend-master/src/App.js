import React from 'react'
import './main.css'
import Navbartop from './Components/Header/Navbartop'
import Home from './Pages/Home/home'
import Footer from './Components/Footer/footer'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './Pages/error'
import Service from './Pages/Services/Service'
import Cart from './Pages/Cart/cart'
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
        <Route path="/Cart/:group?/:subgroup?/:service?/:timeSlot?/:comment?">
          <Cart />
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