"use client"
import React, { useEffect, useState } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx'
import Carrousel from '../../components/Products/Carrousel.jsx'

//Pagina de Productos
export const metadata = {
    title: "Productos"
}

const Products = () => {

    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("");
    const [showProducts, setShowProducts] = useState([])

    useEffect(() => {

        cargarDatos()
        cargarCategorias()

    }, [])

    useEffect(() => {

        chargeCategoryProducts()

    }, [selected])


    const chargeCategoryProducts = async () => {

        const responseJson = await fetch(`https://fakestoreapi.com/products${selected}`)
        const responseCategoriesData = await responseJson.json()

        setShowProducts([...responseCategoriesData])
    }

    const cargarDatos = async () => {
        const responseProducts = await fetch(`https://fakestoreapi.com/products`)
        const products = await responseProducts.json()

        setShowProducts([...products])
    }

    const cargarCategorias = async () => {
        const responseCategories = await fetch(`https://fakestoreapi.com/products/categories`)
        const categories = await responseCategories.json()

        setCategories([...categories])
    }

    return (
        <main>
            <div className='col-span-12 flex flex-col justify-center items-center border-y-2 border-primary mb-3 p-3'>
                <h1 className='font-bold text-3xl'>Filter by Category</h1>
                <ul className='flex flex-wrap justify-center'>
                    <li className='mx-4 my-2'>
                        <button onClick={() => setSelected("")} className='btn btn-primary h-9'>All</button>
                    </li>
                    {
                        categories.map((cat) => {
                            return (
                                <li key={cat} className='mx-4 my-2'>
                                    <button onClick={() => setSelected(`/category/${cat}`)} className='btn btn-primary h-9'>{cat}</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Carrousel />
            <div className='flex flex-wrap justify-center p-7 gap-4'>
                {
                    showProducts.map((producto) => {
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