import Link from 'next/link'
import React from 'react'
import ProductCardButton from './ProductCardButton'
import AddToCartButton from './AddToCartButton'
import NoImage from '../../public/no-image-available.jpg'
import Image from 'next/image'

export const ProductCard = ({ product }) => {

    return (
        <div className="card xl:w-96 lg:w-80 w-96 border-2 border-primary shadow-md shadow-primary pb-4">
            <Link className='flex flex-col' href={`/products/${product ? product.product_id : null}`}>
                <figure className='bg-white flex justify-center rounded-t-[14px]'>
                    {
                        product.images[0] ?
                            <img
                                className='h-48'
                                src={product.images[0].image_src}
                                alt='no image'
                            />
                            :
                            <Image
                                className='h-48 object-contain'
                                src={NoImage}
                                alt="no-image"
                            />
                    }
                </figure>
                <div className="flex flex-col p-5 gap-4 h-56">
                    <h3 className="text-2xl font-bold truncate text-center">{product ? product.title : null}</h3>
                    <p className='line-clamp-5 whitespace-pre-line'>{product ? product.description : null}</p>
                </div>
            </Link>
            <div className="flex items-center justify-between px-7 pt-3">
                <div className="block border border-primary rounded-lg p-2 text-sm truncate">{product ? product.category : null}</div>
                <AddToCartButton product={product ? product : null} />
                <ProductCardButton />
            </div>
        </div>
    )
}
