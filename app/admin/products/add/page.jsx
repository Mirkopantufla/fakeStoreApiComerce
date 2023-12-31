import React from 'react'

const adminProductsAdd = () => {

    const addProduct = () => {

    }

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
                    <input className="file-input file-input-bordered file-input-primary w-full max-w-xs" type="file" multiple="multiple" />
                </div>

            </form>
        </div>
    )
}

export default adminProductsAdd