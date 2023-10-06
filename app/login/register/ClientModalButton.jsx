"use client"
import React from 'react'

const ClientModalButton = () => {
    return (
        <button type='button' className="link link-accent" onClick={() => document.getElementById('my_modal_2').showModal()}>Terminos y condiciones</button>
    )
}

export default ClientModalButton