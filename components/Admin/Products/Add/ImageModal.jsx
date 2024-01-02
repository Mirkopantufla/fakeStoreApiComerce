"use client"
import React from 'react'

const ImageModal = ({ file }) => {

    return (
        <dialog id="my_image_viewer_modal" className="modal">
            <div className="modal-box">
                <img src={URL.createObjectURL(file)} alt="" />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ImageModal