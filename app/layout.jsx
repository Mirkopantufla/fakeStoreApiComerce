import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar.jsx'
import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext.jsx';

//Layout Global

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fake Store NextJS',
  description: 'Fake store with nextJS, data from fakeStoreAPI',
}

function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <GlobalProvider>
          {children}
        </GlobalProvider>
        <Footer />
        <ToastContainer
          className='font-bold'
          position='top-center'
          autoClose={3000}
          theme='dark'
          style={{ width: "50%" }}
        />
      </body>
    </html>
  )
}

export default RootLayout;
