import React from 'react'

const DataError = (props) => {
    return (<div>

        <div class="alert alert-danger" role="alert">
            <div>Error: {props.children}</div>
            Error while loading page content. <a href="/" onClick={() => window.location.reload()} class="alert-link">Click here</a> to reload page.
        </div>
    </div>
    )
}

export default DataError
