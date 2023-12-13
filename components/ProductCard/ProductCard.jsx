import Link from 'next/link'
import React from 'react'
import ProductCardButton from './ProductCardButton'
import AddToCartButton from './AddToCartButton'

export const ProductCard = ({ product }) => {
    return (
        <div className="card xl:w-96 lg:w-80 w-96 bg-base-100 border border-primary p-1 shadow-xl pb-5">
            <figure className='bg-white flex justify-center'><img className='h-48' src={product.image} alt="Shoes" /></figure>
            <div className="card-body">
                <Link className="card-title truncate" href={`/products/${product.id}`}>{product.title}</Link>
                <p className='text-ellipsis h-[7.5rem] overflow-y-auto overflow-x-hidden'>{product.description}</p>
            </div>
            <div className="card-actions items-center justify-between px-7">
                <div className="badge badge-outline">{product.category}</div>
                <AddToCartButton product={product} />
                <ProductCardButton />
            </div>
        </div>
    )
}
