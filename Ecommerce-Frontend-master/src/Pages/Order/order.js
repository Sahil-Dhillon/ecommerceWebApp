import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import Address from './address'
import CheckoutSteps from './Components/checkoutsteps'
import Payment from './payment'
const OrderPlacing = () => {
    return (
        <div className="">
            <Switch>
                <Route path='/checkout/address'>
                    <CheckoutSteps step2 />
                    <Address />
                </Route>
                <Route path='/checkout/payment'>
                    <CheckoutSteps step3 />
                    <Payment />
                </Route>
            </Switch>
        </div>
    )
}

export default OrderPlacing
