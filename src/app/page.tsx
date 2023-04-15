import ProductSearchForm from '@/components/ProductSearchForm'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
      <ProductSearchForm />
      <p>PRODUCTS LIST</p>
    </main>
  )
}
