"use client"
import { themeChange } from 'theme-change'
import { FaMoon } from 'react-icons/fa'


const ClientButton = () => {
    return (
        <button
            data-toggle-theme="forest,lofi"
            data-act-class="ACTIVECLASS"
            onClick={() => themeChange(false)}>
            {<FaMoon />}
        </button>
    )
}

export default ClientButton