"use client"
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";

//   /products/add
const adminProductsAdd = () => {

    const [photos, setPhotos] = useState([]);

    const deletePhoto = (position) => {

        let newArray = []

        photos.map((photo, index) => index !== position ? newArray.push(photo) : null)

        setPhotos(newArray)
    }


    return (
        <div className='flex flex-col'>
            <form className='form-control py-10 gap-6'>
                <h3 className='text-center text-3xl font-bold py-2'>Agregar Producto</h3>

                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Product Title</label>
                    <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" />
                </div>
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Price</label>
                    <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" />
                </div>
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Description</label>
                    <textarea className="textarea text-center input-bordered textarea-primary w-full max-w-lg mt-1" type="text" rows={3} />
                </div>
                <div className='flex flex-col gap-2 items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Category</label>
                    <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" />
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
                <div className={`flex ${photos.length > 0 ? "border border-neutral gap-6 px-5 py-10 overflow-x-auto" : ""}`}>
                    {
                        photos ?
                            photos.map((photo, index) => {
                                return (
                                    <>
                                        <div className='w-auto h-auto relative'>
                                            <img
                                                key={`prev-image-viewer-${index}`}
                                                id={`prev-image-viewer-${index}`}
                                                onClick={() => document.getElementById(`my_image_viewer_modal_${index}`).showModal()}
                                                className='min-w-[400px] min-h-[250px] cursor-pointer'
                                                src={URL.createObjectURL(photo)}
                                                alt=""
                                            />
                                            <MdDelete
                                                className='absolute text-neutral text-4xl bg-primary hover:bg-secondary hover:scale-95 cursor-pointer top-0 right-0'
                                                onClick={(e) => deletePhoto(index)}
                                            />
                                        </div>
                                        {/* Se genera un dialogo para cada imagen, y asi llamarlos por su id  */}
                                        <dialog id={`my_image_viewer_modal_${index}`} className="modal">
                                            <div className="modal-box" style={{ maxWidth: "1000px" }}>
                                                <img src={URL.createObjectURL(photo)} alt="" />
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button className='cursor-default'>close</button>
                                            </form>
                                        </dialog>
                                    </>
                                )
                            })
                            :
                            null
                    }
                </div>

                <button className='btn btn-primary w-1/3 self-center'>Add Product</button>
            </form>



        </div>
    )
}

export default adminProductsAdd