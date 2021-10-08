import React from 'react'

const Loading = () => {
    return (
        <div className="loading-banner ">
            <span className="p-4 fs-1">Loading...</span>
            <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
