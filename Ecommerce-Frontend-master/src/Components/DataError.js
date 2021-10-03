import React from 'react'
import { Link } from 'react-router-dom'

const DataError = (props) => {
    return (<div>

        <div class="alert alert-danger" role="alert">
            <div>Error: {props.children}</div>
            Error while loading page content. <a href="/" onClick={() => window.location.reload()} class="alert-link">Click here</a> to reload page.
        </div>
    </div>
    )
}
export const NoItemInCart = () => {

    return (
        <div className="card">
            <div className="card-body">
                <h3>Your cart is empty.
                </h3>
                <Link to="/#service-section">Go to Services</Link>
            </div>
        </div>
    )
}
export default DataError
