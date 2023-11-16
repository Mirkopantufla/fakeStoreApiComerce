import Link from 'next/link'
import React from 'react'
import ThemeClientButton from './ThemeClientButton'

const Navbar = () => {
    return (
        <nav className="navbar bg-base-100 border-4 border-primary">
            <div className="navbar-start">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">FakeStore</Link>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className='border border-primary rounded-3xl'><Link className='text-xl' href="/products">Productos</Link></li>
            </ul>
            <div className="navbar-end">
                <Link href={'/admin/products'} className='btn btn-accent me-2'>ADMIN</Link>
                <ThemeClientButton />
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">10</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">10 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <Link href={'/cart'} className="btn btn-primary btn-block">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Link href={'/login'} className='btn btn-primary mx-2'>Login</Link>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar