"use client"
import React, { useEffect, useState } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx'
import Carrousel from '../../components/Products/Carrousel.jsx'
import { fakeURL } from '@/utils/paths.js'

//Products page
//   /products
export const metadata = {
    title: "Productos"
}

const Products = () => {

    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("");
    const [foundedProducts, setFoundedProducts] = useState([])
    const categoriesClasses = 'flex items-center justify-center font-bold text-lg bg-primary text-black h-9 cursor-pointer hover:scale-95 hover:underline hover:decoration-2';

    useEffect(() => {

        cargarDatos()
        cargarCategorias()

    }, [])

    useEffect(() => {

        chargeCategoryProducts()

    }, [selected])


    const chargeCategoryProducts = async () => {

        const responseJson = await fetch(`${fakeURL}/products${selected}`)
        const responseCategoriesData = await responseJson.json()

        setFoundedProducts([...responseCategoriesData])
    }

    const cargarDatos = async () => {
        const responseProducts = await fetch(`${fakeURL}/products`)
        const products = await responseProducts.json()

        setFoundedProducts([...products])
    }

    const cargarCategorias = async () => {
        const responseCategories = await fetch(`${fakeURL}/products/categories`)
        const categories = await responseCategories.json()

        setCategories([...categories])
    }

    return (
        <main>
            <div className='col-span-12 flex flex-col justify-center items-center border-y-2 border-primary mb-3 p-3'>
                <h1 className='font-bold text-3xl'>Categorias</h1>
                <ul className='flex justify-between w-screen'>
                    <li className='flex-1 items-center mx-4 my-2 '>
                        <div onClick={() => setSelected("")} className={categoriesClasses}>All</div>
                    </li>
                    {

                        categories.map((cat) => {
                            return (
                                <li key={cat} className='flex-1 mx-4 my-2'>
                                    <div onClick={() => setSelected(`/category/${cat}`)} className={categoriesClasses}>{cat}</div>
                                </li>
                            )
                        })

                    }
                </ul>
            </div>
            <Carrousel />
            <div className='flex flex-wrap justify-center p-7 gap-4'>
                {

                    foundedProducts.map((producto) => {
                        return (
                            <div key={producto.id} className='lg:col-span-4 md:col-span-6 col-start-3 col-span-8 flex justify-center'>
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