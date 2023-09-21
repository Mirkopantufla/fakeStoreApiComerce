import React from 'react'
import { ProductCard } from '../components/ProductCard'

const Products = async () => {

    const responseProducts = await fetch('https://fakestoreapi.com/products')
    const products = await responseProducts.json()

    const responseCategories = await fetch('https://fakestoreapi.com/products/categories')
    const categories = await responseCategories.json()

    return (
        <main className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 text-center mt-2'>
                <h1 className='text-6xl'>Products Page</h1>
            </div>
            <div className='col-span-12 flex flex-col justify-center items-center'>
                <h1>Categories</h1>
                <ul className='flex flex-wrap justify-center'>
                    {
                        categories.map((cat) => {
                            return (
                                <li className='mx-4 my-2'>
                                    <button className='btn btn-primary h-9'>{cat}</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                products.map((producto) => {
                    return (
                        <div className='lg:col-span-4 md:col-span-6 col-start-3 col-span-8 flex justify-center'>
                            <ProductCard product={producto} />
                        </div>
                    )
                })
            }
        </main>
    )
}

export default Products