import { Product } from '@/services/crawler';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from './ProductCard';

function ProductsList({ products }: { products: Product[] }) {
  return (
    <ul className='w-3/5 flex flex-col gap-5'>
      {products.map((product: Product) => (
        <li key={product.title}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
