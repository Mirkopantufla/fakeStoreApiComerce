import React from 'react'
import Image from 'next/image'

const Carrousel = () => {
    return (
        <div className="carousel w-full h-64">
            <div id="slide1" className="carousel-item flex justify-center relative w-full">
                <Image
                    src="/oferta1.jpg"
                    className="max-w rounded-lg shadow-2xl"
                    width={1000}
                    height={200}
                    alt="Banner Oferta 1"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item flex justify-center relative w-full">
                <Image
                    src="/oferta2.jpg"
                    className="max-w rounded-lg shadow-2xl"
                    width={1000}
                    height={200}
                    alt="Banner Oferta 1"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item flex justify-center relative w-full">
                <Image
                    src="/oferta3.png"
                    className="max-w rounded-lg shadow-2xl"
                    width={1000}
                    height={200}
                    alt="Banner Oferta 1"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    )
}

export default Carrousel