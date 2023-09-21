import React from 'react'

export const ProductCard = ({ product }) => {
    return (
        <div className="card xl:w-96 lg:w-80 w-96 bg-base-100 border border-white shadow-xl pb-5">
            <figure className='bg-white flex justify-center'><img className='h-48' src={product.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title truncate">{product.title}</h2>
                <p className='text-ellipsis h-32 overflow-y-auto overflow-x-hidden'>{product.description}</p>
            </div>
            <div className="card-actions items-center justify-between px-7">
                <div className="badge badge-outline">{product.category}</div>
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    )
}
