import Image from 'next/image'

// Pagina de Inicio
export default function Home() {
  return (
    <main className='grid-cols-12'>
      <div className="hero min-h-[76vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="/disco-duro-western-no-bg.png"
            className="max-w-sm rounded-lg"
            width={500}
            height={500}
            alt="HardDrive"
            priority={true} />
          <div>
            <h1 className="text-5xl font-bold">Fake Store!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">View Products!</button>
          </div>
        </div>
      </div>
    </main>
  )
}
