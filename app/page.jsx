import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='grid-cols-12'>
      <div className='col-span-3'>
        <h1 className='text-white'>Hola</h1>
      </div>
      <div className='col-span-3'>
        <Link href="/products">Productos</Link>
      </div>
    </main>
  )
}
