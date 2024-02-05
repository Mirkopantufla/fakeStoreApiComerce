"use client"
import React from 'react'

const ImageModal = ({ file }) => {

    return (
        <dialog id={`my_image_viewer_modal`} className="modal">
            <div className="modal-box min-w-[80vw] min-h-[70vh] flex justify-center items-center">
                <img className='object-contain object-center max-w-[70vw] max-h-[60vh]' src={file !== undefined ? URL.createObjectURL(file) : ""} alt="" />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='cursor-default'>close</button>
            </form>
        </dialog>
    )
}

export default ImageModal