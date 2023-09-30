import React from 'react'
import { ProductCard } from '../components/ProductCard'
import Carrousel from '../components/Products/Carrousel'


//Pagina de Productos
export const metadata = {
    title: "Productos"
}

const Products = async () => {

    const responseProducts = await fetch('https://fakestoreapi.com/products')
    const products = await responseProducts.json()

    const responseCategories = await fetch('https://fakestoreapi.com/products/categories')
    const categories = await responseCategories.json()

    return (
        <main>
            <div className='col-span-12 text-center my-2'>
                <h1 className='text-6xl'>Products Page</h1>
            </div>
            <div className='col-span-12 flex flex-col justify-center items-center border-2 border-primary my-4'>
                <h1 className='font-bold text-3xl'>Categorias</h1>
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
            <Carrousel />
            <div className='flex flex-wrap justify-center p-7 gap-4'>
                {
                    products.map((producto) => {
                        return (
                            <div className='lg:col-span-4 md:col-span-6 col-start-3 col-span-8 flex justify-center'>
                                <ProductCard product={producto} />
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Products