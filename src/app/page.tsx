import Dropdown from '@/components/Dropdown'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
      <Dropdown inputName='Fonte' options={['Mercado Livre', 'Buscapé']}/>
      <Dropdown inputName='Categorias' options={['Geladeira', 'TV', 'Celular']}/>
      <p>PRODUCTS LIST</p>
    </main>
  )
}
