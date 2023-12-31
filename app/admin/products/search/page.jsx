'use client'
import { baseURL } from '@/utils/paths';
import { regexSoloLetras, regexSoloNumeros } from '@/utils/regexStore';
import React, { useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toast } from 'react-toastify';

//Search page
// admin/products/add
const adminProductsSeatch = () => {

    const [searchParam, setSearchParam] = useState("");
    const [searchFilter, setSearchFilter] = useState("id")
    const [isLoading, setIsLoading] = useState(false);
    const [foundedProduct, setFoundedProduct] = useState(null);


    const searchIdProduct = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {

            if (validateSearchFilters(searchFilter, searchParam)) {
                return;
            }

            const responseJson = await fetch(`${baseURL}/products/${searchParam}`)
            const data = await responseJson.json();

            if (data.warning) {
                toast.warning('Producto Inexistente')
                setFoundedProduct(null)
            } else {
                console.log(data)
                setFoundedProduct(data.product)
                return data;
            }


        } catch (error) {
            toast.error('error ' + error)
        } finally {
            setIsLoading(false)
        }

    };

    const validateSearchFilters = (filter, value) => {

        let hasError = false;

        if (filter === "") {

            return hasError = true;

        } else if (filter === 'id') {

            if (value === "" || value === undefined) {
                hasError = true;
                toast.warning('No puedes buscar si el campo esta vacio!')
                return hasError;
            } else if (!regexSoloNumeros.test(value)) {
                hasError = true;
                toast.warning('Si buscas por id, deben ser solo numeros!')
                return hasError;
            } else {
                hasError = false;
                return hasError;
            }

        } else if (filter === 'title') {

            if (value === "" || value === undefined) {
                hasError = true;
                toast.warning('No puedes buscar si el campo esta vacio!')
                return hasError;
            } else if (!regexSoloLetras.test(value)) {
                hasError = true;
                toast.warning('Si buscas por nombre, deben ser solo letras!')
                return hasError;
            } else {
                hasError = false;
                return hasError;
            }
        }

        return hasError;

    }

    return (
        <div className='flex flex-col items-center'>
            <form onSubmit={searchIdProduct} className='flex flex-col items-stretch py-2 min-h-[25vh] gap-5'>

                <h1 className='text-4xl text-center' htmlFor="">Buscar por:</h1>
                <div className='flex'>

                    <div className='flex flex-col items-center w-1/3'>
                        <label className="label-text">ID</label>
                        <input onClick={(e) => setSearchFilter(e.target.value)} value="id" type="radio" name="radio-2" className="radio radio-primary" />
                    </div>

                    <div className='flex flex-col items-center w-1/3'>
                        <label className="label-text">Nombre</label>
                        <input onClick={(e) => setSearchFilter(e.target.value)} value="title" type="radio" name="radio-2" className="radio radio-primary" />
                    </div>

                    <div className='flex flex-col items-center w-1/3'>
                        <label className="label-text">Categoria</label>
                        <input onClick={(e) => setSearchFilter(e.target.value)} value="category" type="radio" name="radio-2" className="radio radio-primary" />
                    </div>

                </div>
                <div className='flex'>
                    <input onChange={(e) => setSearchParam(e.target.value)} type="text" placeholder="Busqueda..." className="text-center input input-bordered input-primary w-full max-w-xs me-3" />
                    <button className='btn btn-primary'>
                        {
                            !isLoading ? <FaMagnifyingGlass /> : <span className="loading loading-spinner text-secondary"></span>
                        }

                    </button>
                </div>
            </form>
            {
                foundedProduct ?
                    <form className='form-control justify-center items-center border border-neutral w-[80vw] sm:w-[70vw] px-5 py-10 mb-10 gap-5'>
                        <h3 className='text-3xl font-bold'>Producto Encontrado</h3>

                        <div className='flex flex-col items-center w-full'>
                            <label className='text-lg font-bold' htmlFor="">Nombre del producto</label>
                            <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.title} />
                        </div>
                        <div className='flex flex-col items-center w-full'>
                            <label className='text-lg font-bold' htmlFor="">Precio</label>
                            <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.price} />
                        </div>
                        <div className='flex flex-col items-center w-full'>
                            <label className='text-lg font-bold' htmlFor="">Descripción</label>
                            <textarea className="textarea text-center input-bordered textarea-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.description} rows={6} />
                        </div>
                        <div className='flex flex-col items-center w-full'>
                            <label className='text-lg font-bold' htmlFor="">Categoria</label>
                            <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.category} />
                        </div>
                        <div className='flex flex-col items-center w-full'>
                            <label className='text-lg font-bold' htmlFor="">Imagenes</label>
                            {
                                foundedProduct?.images.map((image) => {
                                    return (
                                        <img src={image.src_imagen} alt="" />
                                    )
                                })
                            }
                        </div>

                    </form>
                    :
                    null
            }</div>

    )
}

export default adminProductsSeatch