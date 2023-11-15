import Link from 'next/link'
import React from 'react'

const CartClientButton = () => {
    return (
        <Link href={'/cart'} className="btn btn-primary btn-block">View cart</Link>
    )
}

export default CartClientButton