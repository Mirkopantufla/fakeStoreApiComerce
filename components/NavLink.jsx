'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"

const NavLink = ({ href, text, classes }) => {
    const path = usePathname()
    const activeClasses = 'bg-primary text-neutral hover:bg-neutral hover:text-primary';
    const inactiveClasses = 'bg-neutral text-primary hover:bg-primary hover:text-neutral';
    // De las rutas, separar por / y saltar los primeros dos que son "" y admin
    let auxPathArray = path.split("/")
    auxPathArray = auxPathArray.splice(2)

    //Toma la ultima posición del href definido en el link, y lo almacena en lastPosition
    let lastPosition = href.split("/")
    lastPosition = lastPosition[lastPosition.length - 1]

    // Comparo ambos dos arrays que contienen las rutas 
    // Si existe en el array path alguno la ultima posicion almacenada en lastPosition, significa que estamos dentro de este enlace.
    let isActive = auxPathArray.includes(lastPosition);

    return (
        <Link className={`${classes} ${isActive ? activeClasses : inactiveClasses}`} href={href}>{text}</Link>
    )
}

export default NavLink