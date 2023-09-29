import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar.jsx'
import './globals.css'
import { Inter } from 'next/font/google'

//Layout Global

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fake Store NextJS',
  description: 'Fake store with nextJS, data from fakeStoreAPI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lofi">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
