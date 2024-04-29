'use client'
import { GlobalContext } from '@/context/GlobalContext'
import { baseURL } from '@/utils/paths';
import React, { useContext, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const page = () => {

    const { store } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null)

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true)

            const options = {
                method: 'DELETE'
            }

            const promiseResponse = await fetch(`${baseURL}/products/delete/${id}`, options)
            const jsonResponse = await promiseResponse.json()

            if (jsonResponse.success) {
                toast.success('Deleted successfully')
                setProductToDelete(null)
            } else {
                toast.warning('Something bad happened')
            }
        } catch (error) {
            toast.error(`Something happened: ${error}`)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="overflow-x-auto p-6">
                <table className='table'>
                    <thead>
                        <tr className='text-xl'>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Rating</th>
                            <th>Images</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.products.map((producto) => {
                                return (
                                    <tr key={producto.product_id} className=''>
                                        <td>{producto.product_id}</td>
                                        <td>{producto.title}</td>
                                        <td>{producto.price}</td>
                                        <td>{producto.category}</td>
                                        <td>{producto.rating}</td>
                                        <td className='flex'>
                                            {
                                                producto.images.map((image) => <img key={image.id} src={image.image_src} className='w-[40px] h-[40px]'></img>)
                                            }
                                        </td>
                                        <td>
                                            <button
                                                className='bg-primary border-2 text-black p-2 cursor-pointer hover:bg-opacity-80'
                                                onClick={() => (
                                                    setProductToDelete(producto.product_id),
                                                    document.getElementById('confirmation_modal').showModal()
                                                )}>
                                                <MdDelete className='text-3xl' />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <dialog id="confirmation_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">WARNING</h3>
                    <p className="py-4">This action delete permanently the product!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                disabled={store.isLoading}
                                className='btn btn-error disabled:opacity-75'
                                onClick={() => deleteProduct(productToDelete)}
                            >
                                {isLoading ?
                                    <span className="loading loading-spinner loading-lg text-neutral"></span>
                                    :
                                    'Delete'}
                            </button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default page