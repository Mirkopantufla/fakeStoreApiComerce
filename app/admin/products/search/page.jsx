"use client"
import { GlobalContext } from "@/context/GlobalContext";
import { baseURL } from "@/utils/paths";
import { regexTextSpecialCharacters, regexSoloNumeros } from "@/utils/regexStore";
import React, { useContext, useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toast } from "react-toastify";

//Search page
//   /admin/products/add
const adminProductsSearch = () => {

    const [searchValue, setSearchValue] = useState("");
    const [searchFilter, setSearchFilter] = useState("") // id / title / category
    const [isLoading, setIsLoading] = useState(false);
    const [foundedProduct, setFoundedProduct] = useState(null);
    const { store } = useContext(GlobalContext);


    const searchIdProduct = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {

            // Si no se cumplen los requisitos del campo a buscar, no se ejecutará
            if (validateSearchFilters(searchFilter, searchValue, store.categories)) {
                setFoundedProduct(null)
                return;
            }

            const responseJson = await fetch(`${baseURL}/products/${searchValue}`)
            const data = await responseJson.json();

            if (data.warning) {
                toast.warning("Producto Inexistente")
                setFoundedProduct(null)
            } else {
                console.log(data)
                setFoundedProduct(data.product)
                return data;
            }


        } catch (error) {
            toast.error("error " + error)
        } finally {
            setIsLoading(false)
        }

    };

    const validateSearchFilters = (filter, inputValue, categories) => {

        let hasError = false;
        const emptyMessage = "No puedes buscar si el campo esta vacio!";

        if (filter === "") {
            // Si no se filtra nada, mostrara una advertencia 
            toast.warning("No puedes buscar sin definir un filtro!")
            return hasError = true;

        } else if (filter === "id") {
            // inputValue, regex, messageEmpty, messageRegex
            return hasError = validateField(inputValue, regexSoloNumeros, emptyMessage, "Id search allow numbers only")
        } else if (filter === "title") {
            return hasError = validateField(inputValue, regexTextSpecialCharacters, emptyMessage, "You are using prohibited characters")
        } else if (filter === "category") {

            // De esta manera, limito las busquedas por categoria a solo las ya existentes
            // De ser otro valor o vacio, retornara error
            if (categories.includes(inputValue)) {
                return hasError = false;
            } else {
                toast.warning("You cannot search without an option selected")
                return hasError = true;
            }


        }

        return hasError;

    }

    const validateField = (inputValue, regex, messageEmpty, messageRegex) => {

        if (inputValue === "" || inputValue === undefined) {
            toast.warning(messageEmpty)
            return true;
        } else if (!regex.test(inputValue)) {
            toast.warning(messageRegex)
            return true;
        } else {
            return false;
        }

    }



    return (
        <div className="flex flex-col items-center min-h-[58vh]">
            <form onSubmit={searchIdProduct} className="flex flex-col items-stretch gap-5 p-10">

                <h1 className="text-4xl mt-4 font-bold text-center" htmlFor="">Filter by:</h1>
                <div className="divider divider-neutral m-0"></div>
                <div className="flex">

                    <div className="flex flex-col items-center w-1/3">
                        <label className="label-text">ID</label>
                        <input onClick={(e) => setSearchFilter(e.target.value)} value="id" type="radio" name="radio-2" className="radio radio-primary" />
                    </div>

                    <div className="flex flex-col items-center w-1/3">
                        <label className="label-text">Title</label>
                        <input onClick={(e) => setSearchFilter(e.target.value)} value="title" type="radio" name="radio-2" className="radio radio-primary" />
                    </div>

                    <div className="flex flex-col items-center w-1/3">
                        <label className="label-text">Category</label>
                        <input onClick={(e) => setSearchFilter(e.target.value)} value="category" type="radio" name="radio-2" className="radio radio-primary" />
                    </div>

                </div>
                <div className="flex">
                    {
                        searchFilter === "category" ?
                            // Si el filtro es categoria, 
                            <select
                                defaultValue={""}
                                className="text-center select select-primary w-full me-3"
                                onChange={(e) => setSearchValue(e.target.value)}
                            >
                                <option className="" value="" disabled>Select category</option>
                                {
                                    store?.categories.map((category) => <option key={`search-filter-${category}`} value={category}>{category}</option>)
                                }
                            </select>
                            :
                            <input onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Busqueda..."
                                className="text-center input input-bordered input-primary w-full max-w-xs me-3"
                            />
                    }
                    <button className="btn btn-primary">
                        {
                            !isLoading ? <FaMagnifyingGlass /> : <span className="loading loading-spinner text-neutral"></span>
                        }

                    </button>
                </div>
            </form>
            {
                foundedProduct ?
                    <form className="form-control justify-center items-center border border-neutral w-[80vw] sm:w-[70vw] px-5 py-10 mb-10 gap-5">
                        <h3 className="text-3xl font-bold">Founded Product</h3>

                        <div className="flex flex-col items-center w-full">
                            <label className="text-lg font-bold" htmlFor="">Product Title</label>
                            <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.title} />
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <label className="text-lg font-bold" htmlFor="">Price</label>
                            <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.price} />
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <label className="text-lg font-bold" htmlFor="">Description</label>
                            <textarea className="textarea text-center input-bordered textarea-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.description} rows={6} />
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <label className="text-lg font-bold" htmlFor="">Category</label>
                            <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" defaultValue={foundedProduct?.category} />
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <label className="text-lg font-bold" htmlFor="">Images</label>
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

export default adminProductsSearch