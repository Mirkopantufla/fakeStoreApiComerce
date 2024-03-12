import Link from 'next/link'
import React from 'react'
import ThemeClientButton from './ThemeClientButton'
import CartItemsIndicator from './CartItemsIndicator'
import LoginLogout from './LoginLogout'
import AdminLink from './AdminLink'

const Navbar = () => {

    return (
        <nav className="navbar bg-base-100 border-primary min-h-[6vh] p-0">
            <div className="navbar-start">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">FakeStore</Link>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className='border border-primary rounded-3xl'><Link className='text-xl' href="/products">Products</Link></li>
            </ul>
            <div className="navbar-end">
                <ThemeClientButton />
                <CartItemsIndicator />
                <div>

                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <LoginLogout />
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <AdminLink />
                        <li><Link href={'/admin'}>Settings</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar