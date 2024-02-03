"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard.jsx'
import { baseURL, fakeURL } from '@/utils/paths.js'
import Carrousel from '@/components/Products/Carrousel.jsx'
import { GlobalContext } from '@/context/GlobalContext.jsx'

//Products page
//   /products
export const metadata = {
    title: "Productos"
}

const Products = () => {

    const { store } = useContext(GlobalContext)
    const [selectedProducts, setSelectedProducts] = useState(store.products)
    const categoriesClasses = 'flex items-center justify-center font-bold text-lg bg-primary text-black h-9 cursor-pointer hover:scale-95 hover:underline hover:decoration-2';

    useEffect(() => {

        setSelectedProducts(store.products)

    }, [store.products])


    const changeDisplayedProducts = (selected) => {

        let productFilteredCategory = [];

        //En caso de buscar todos los productos, setea el estado con todos los productos originales
        if (selected === "All") {
            setSelectedProducts(store.products)
        } else {
            //De lo contrario, filtra por categoria
            productFilteredCategory = store.products.filter((product) => product.category === selected)
            setSelectedProducts([...productFilteredCategory])
        }

    }

    return (
        <main>
            <div className='col-span-12 flex flex-col justify-center items-center border-y-2 border-primary mb-3 p-3'>
                <h1 className='font-bold text-3xl'>Categorias</h1>
                <ul className='flex justify-between w-full'>
                    <li className='flex-1 p-2 '>
                        <div onClick={() => changeDisplayedProducts("All")} className={categoriesClasses}>All</div>
                    </li>
                    {
                        store.categories ?
                            store.categories.map((category) => {
                                return (
                                    <li key={category} className='flex-1 p-2'>
                                        <div onClick={() => changeDisplayedProducts(category)} className={categoriesClasses}>{category}</div>
                                    </li>
                                )
                            })
                            :
                            null
                    }
                </ul>
            </div>
            <Carrousel />
            <div className='flex flex-wrap justify-center p-7 gap-4'>
                {
                    selectedProducts ?
                        selectedProducts.map((product) => {
                            return (
                                <div key={product.product_id} className='lg:col-span-4 md:col-span-6 col-start-3 col-span-8 flex justify-center'>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })
                        :
                        null

                }
            </div>
        </main>
    )
}

export default Products