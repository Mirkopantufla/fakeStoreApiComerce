"use client"
import { GlobalContext } from '@/context/GlobalContext';
import { baseURL } from '@/utils/paths';
import React, { useContext, useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

//   /products/add
const adminProductsAdd = () => {

    const [photos, setPhotos] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState(undefined);
    const { store } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const [productTitle, setProductTitle] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const inputClassName = 'input text-center input-bordered input-primary w-full max-w-xl';

    useEffect(() => {

        getCategories()

    }, [])

    const getCategories = async () => {

        setIsLoading(true)

        try {

            const respJson = await fetch(`${baseURL}/products/find/categories`);
            const data = await respJson.json();

            setCategories([...data]);

        } catch (error) {
            toast.error(`Ha ocurrido un error... ${error}`, { autoClose: 2000 })
        } finally {
            setIsLoading(false)
        }
    }

    const deletePhoto = (position) => {

        let newArray = []

        if (photos.length > 1) {
            photos.map((photo, index) => index !== position ? newArray.push(photo) : null)
        } else {
            newArray = []
        }


        setPhotos(newArray)
    }

    const validateForm = () => {

    }

    const addProductOnSubmit = async () => {

        try {

            const respJson = await fetch(`${baseURL}/products/add`);
            const data = await respJson.json();

        } catch (error) {
            toast.error(`Ha ocurrido un error... ${error}`);
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className='flex flex-col p-10'>
            <form className='form-control py-10 gap-6'>
                <h3 className='text-center text-3xl font-bold py-2'>Add Product</h3>

                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Product Title</label>
                    <input
                        className={inputClassName}
                        placeholder='Golden Neclace'
                        type="text"
                        onChange={(e) => setProductTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Price</label>
                    <input
                        className={inputClassName}
                        placeholder='123.32'
                        type="text"
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Description</label>
                    <textarea
                        className="textarea text-center input-bordered textarea-primary w-full max-w-xl mt-1"
                        placeholder='Duis maximus augue purus, nec interdum sem ultrices vel.'
                        type="text"
                        rows={3}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Category</label>
                    <select defaultValue={'Select an existing category'} className="text-center select select-primary w-full max-w-xl">
                        <option value={'Select an existing category'} disabled>Select an existing category</option>
                        {
                            categories ?
                                categories.map((category) => {
                                    return (
                                        <option key={`add-product-${category}`} value={category}>{category}</option>
                                    )
                                })
                                :
                                null
                        }

                    </select>
                </div>
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Images</label>
                    <input
                        onChange={(e) => {
                            setPhotos(Array.prototype.slice.call(e.target.files))
                        }}
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        type="file"
                        multiple />
                </div>
                {/* Seccion contenedora de previsualizacion de imagenes */}
                <div className={`flex ${photos.length > 0 ? "border border-neutral gap-6 px-5 py-10 overflow-x-auto custom-scrollbar" : ""}`}>
                    {
                        photos ?
                            photos.map((photo, index) => {
                                return (

                                    <div key={`prev-image-viewer-${index}`} className='w-auto h-auto relative'>
                                        <img
                                            id={`prev-image-viewer-${index}`}
                                            onClick={() => {
                                                setCurrentPhoto(photo)
                                                document.getElementById(`my_image_viewer_modal`).showModal()
                                            }}
                                            className='min-w-[400px] min-h-[250px] max-h-[250px] cursor-pointer'
                                            src={URL.createObjectURL(photo)}
                                            alt=""
                                        />
                                        <MdDelete
                                            className='absolute text-neutral text-4xl bg-primary hover:bg-secondary hover:scale-95 cursor-pointer top-0 right-0'
                                            onClick={(e) => deletePhoto(index)}
                                        />
                                    </div>

                                )
                            })
                            :
                            null
                    }
                </div>

                {/* <------------------------- REGISTER BUTTON ---------------------------> */}
                <button disabled={store.isLoading} className='btn btn-primary w-1/3 disabled:opacity-75 self-center'>
                    {store?.isLoading ?
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        :
                        'Registrate!'}
                </button>
            </form>

            {/* Se genera un dialogo, el cual despues es llamado por el id y se va modificando dinamicamente la imagen a mostrar*/}
            <dialog id={`my_image_viewer_modal`} className="modal">
                <div className="modal-box" style={{ maxWidth: "1000px" }}>
                    <img src={currentPhoto !== undefined ? URL.createObjectURL(currentPhoto) : ""} alt="" />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className='cursor-default'>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default adminProductsAdd