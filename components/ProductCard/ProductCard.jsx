import Link from 'next/link'
import React from 'react'
import ProductCardButton from './ProductCardButton'
import AddToCartButton from './AddToCartButton'

export const ProductCard = ({ product }) => {

    return (
        <div className="card xl:w-96 lg:w-80 w-96 border border-primary shadow-md shadow-primary pb-4">
            <Link className='flex flex-col' href={`/products/${product.product_id}`}>
                <figure className='bg-white flex justify-center rounded-t-xl'><img className='h-48' src={product.images[0].src_imagen} alt="Shoes" /></figure>
                <div className="flex flex-col p-5 gap-4 h-56">
                    <h3 className="text-2xl font-bold truncate">{product.title}</h3>
                    <p className='line-clamp-5'>{product.description}</p>
                </div>
            </Link>
            <div className="flex items-center justify-between px-7 pt-3">
                <div className="block border border-primary rounded-lg p-2 text-sm truncate">{product.category}</div>
                <AddToCartButton product={product} />
                <ProductCardButton />
            </div>
        </div>
    )
}
