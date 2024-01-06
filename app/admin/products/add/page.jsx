"use client"
import React, { useState } from 'react'

const adminProductsAdd = () => {

    const [photos, setPhotos] = useState([]);

    return (
        <div className='form-control items-center'>
            <form className='form-control justify-center items-center border border-neutral w-[80vw] sm:w-[70vw] px-5 py-10 mb-10 gap-5'>
                <h3 className='text-3xl font-bold'>Agregar Producto</h3>

                <div className='flex flex-col items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Nombre del producto</label>
                    <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" />
                </div>
                <div className='flex flex-col items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Precio</label>
                    <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" />
                </div>
                <div className='flex flex-col items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Descripción</label>
                    <textarea className="textarea text-center input-bordered textarea-primary w-full max-w-lg mt-1" type="text" rows={3} />
                </div>
                <div className='flex flex-col items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Categoria</label>
                    <input className="text-center input input-bordered input-primary w-full max-w-lg mt-1" type="text" />
                </div>
                <div className='flex flex-col items-center w-full'>
                    <label className='text-lg font-bold' htmlFor="">Imagenes</label>
                    <input
                        onChange={(e) => {
                            setPhotos(Array.prototype.slice.call(e.target.files))
                        }}
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        type="file"
                        multiple />
                </div>

                {/* Seccion contenedora de previsualizacion de imagenes */}
                <div className={`flex gap-6 overflow-x-auto ${photos.length > 0 ? "border border-neutral p-5" : ""}`}>
                    {
                        photos ?
                            photos.map((photo, index) => {
                                return (
                                    <>
                                        <img
                                            key={`prev-image-viewer-${index}`}
                                            id={`prev-image-viewer-${index}`}
                                            onClick={() => document.getElementById(`my_image_viewer_modal_${index}`).showModal()}
                                            className='w-[30%] m-auto border border-3 rounded-3 border-dark cursor-pointer'
                                            src={URL.createObjectURL(photo)}
                                            alt=""
                                        />
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

            </form>


        </div>
    )
}

export default adminProductsAdd