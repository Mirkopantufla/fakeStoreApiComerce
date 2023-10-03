import React from 'react'

const LoadingPage = () => {
    return (
        <div className='min-h-screen min-w-full flex justify-center items-center'>
            <h1 className='font-bold text-6xl'>Loading <span className="loading loading-spinner loading-lg"></span></h1>
        </div>
    )
}

export default LoadingPage