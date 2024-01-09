"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Carro = () => {

    const [currentPosition, setCurrentPosition] = useState(1);
    const sources = [
        { id: 1, src: "/oferta1.jpg", alt: "Banner Oferta 1" },
        { id: 2, src: "/oferta2.jpg", alt: "Banner Oferta 2" },
        { id: 3, src: "/oferta3.png", alt: "Banner Oferta 3" }
    ];

    const previousPosition = () => {
        if (currentPosition === 0) {
            setCurrentPosition(sources.length - 1)
        } else {
            setCurrentPosition(currentPosition - 1)
        }
    };

    const nextPosition = () => {
        if (currentPosition === sources.length - 1) {
            setCurrentPosition(0)
        } else {
            setCurrentPosition(currentPosition + 1)
        }
    };

    return (
        <section id="custom-carousel" className='p-4'>
            <div className='relative overflow-hidden'>
                <div
                    className='flex w-full max-h-80 transition ease-out duration-[800ms]'
                    style={{ transform: `translateX(-${currentPosition * 100}%)` }}
                >
                    {
                        sources ?
                            sources.map((image) => {
                                return (
                                    <Image
                                        src={`${image.src}`}
                                        id={`offer-banner-${image.id}`}
                                        className="flex-[1_0_100%] rounded-lg snap-start object-fill"
                                        width={1400}
                                        height={300}
                                        alt={`${image.alt}`}
                                    />
                                )
                            })
                            :
                            <Image
                                src="/oferta1.jpg"
                                className="max-w rounded-lg shadow-2xl"
                                width={1000}
                                height={200}
                                alt="Banner Oferta 1"
                            />
                    }

                </div>
                <div className='flex absolute bottom-1 left-1/2 gap-4 z-10 translate-x-[-50%]' id='slider-nav'>
                    {
                        sources ?
                            sources.map((image, index) => {
                                return (
                                    <button
                                        onClick={() => setCurrentPosition(index)}
                                        className={`text-sm btn btn-sm btn-primary ${index === currentPosition ? "opacity-100" : "opacity-60"}`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            })
                            :
                            null
                    }
                </div>
                <div className='absolute h-full w-full top-0 flex items-center justify-between px-6'>
                    <button
                        onClick={() => previousPosition()}
                        className='text-sm btn btn-sm btn-primary opacity-60 hover:opacity-100 sm:text-2xl sm:btn-md'>
                        <GrFormPrevious />
                    </button>
                    <button
                        onClick={() => nextPosition()}
                        className='text-sm btn btn-sm btn-primary opacity-60 hover:opacity-100 sm:text-2xl sm:btn-md'>
                        <GrFormNext />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Carro