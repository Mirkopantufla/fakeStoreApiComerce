import React from 'react'

//Search page
// admin/products/add
const adminProductsSeatch = () => {
    return (
        <div className='flex justify-center py-2 min-h-screen'>
            <form action="">
                <label htmlFor="">Buscar por:</label>
                <div className="flex justify-evenly">
                    <label className="label cursor-pointer flex-col">
                        <span className="label-text">ID</span>
                        <input type="radio" value="id" name="radio-10" className="radio checked:bg-blue-500" checked />
                    </label>
                    <label className="label cursor-pointer flex-col">
                        <span className="label-text">Tittle</span>
                        <input type="radio" value="tittle" name="radio-10" className="radio checked:bg-red-500" />
                    </label>
                    <label className="label cursor-pointer flex-col">
                        <span className="label-text">Category</span>
                        <input type="radio" value="category" name="radio-10" className="radio checked:bg-yellow-400" />
                    </label>
                </div>
                <input type="text" placeholder="Busqueda..." className="input input-bordered input-primary w-full max-w-xs" />
            </form>
        </div>
    )
}

export default adminProductsSeatch