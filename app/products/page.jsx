"use client"
import React, { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import Carrousel from '../components/Products/Carrousel'

//Pagina de Productos
export const metadata = {
    title: "Productos"
}

const Products = async () => {

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

    // const CategoryFilter = async (valor) => {
    //     setCategory(valor)

    //     const responseCategoryFilter = await fetch(`https://fakestoreapi.com/products${valor}`)
    //     const filteredProducts = await responseCategoryFilter.json();

    //     setShowProducts([...filteredProducts])
    // }

    return (
        <main>
            <div className='col-span-12 text-center my-2'>
                {/* <h1 className='text-6xl'>Todos los productos a buen precio!</h1> */}
            </div>
            <div className='col-span-12 flex flex-col justify-center items-center border-y-2 border-primary my-4'>
                <h1 className='font-bold text-3xl'>Filtrar por Categorias</h1>
                <ul className='flex flex-wrap justify-center'>
                    <li className='mx-4 my-2'>
                        <button onClick={() => setSelected("")} className='btn btn-primary h-9'>Todo</button>
                    </li>
                    {
                        categories.map((cat) => {
                            return (
                                <li className='mx-4 my-2'>
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