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

    const searchIdProduct = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {

            if (validateSearchFilters(searchFilter, searchParam) === true) {
                return;
            }

            const responseJson = await fetch(`${baseURL}/products/${searchParam}`)
            const data = await responseJson.json();
            return data;

        } catch (error) {
            toast.error('error ' + error)
        } finally {
            setIsLoading(false)
        }
        // console.log(searchFilter)
        // console.log(searchParam)
    };

    const validateSearchFilters = (filter, param) => {

        let hasError = false;

        if (filter === "") {

            return hasError = true;

        } else if (filter === 'id') {

            if (param === "" || param === undefined) {
                hasError = true;
                toast.warning('No puedes buscar si el campo esta vacio!')
                return hasError;
            } else if (!regexSoloNumeros.test(param)) {
                hasError = true;
                toast.warning('Si buscas por id, deben ser solo numeros!')
                return hasError;
            } else {
                hasError = false;
                return hasError;
            }

        } else if (filter === 'title') {

            if (param === "" || param === undefined) {
                hasError = true;
                toast.warning('No puedes buscar si el campo esta vacio!')
                return hasError;
            } else if (!regexSoloLetras.test(param)) {
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
        <form onSubmit={searchIdProduct} className='flex flex-col items-center py-2 min-h-[60vh] gap-5'>

            <h1 className='text-4xl' htmlFor="">Buscar por:</h1>
            <div className="flex w-1/4">

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
                <input onChange={(e) => setSearchParam(e.target.value)} type="text" placeholder="Busqueda..." className="text-center input input-bordered input-primary w-full max-w-xs" />
                <button className='btn btn-primary'>
                    {
                        !isLoading ? <FaMagnifyingGlass /> : <span className="loading loading-spinner text-secondary"></span>
                    }

                </button>
            </div>

        </form>
    )
}

export default adminProductsSeatch