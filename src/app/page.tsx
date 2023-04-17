'use client';
import { useAtomValue } from 'jotai';
import useSWR from 'swr';
import { Inter } from 'next/font/google';
import { formAtom, shouldFetchAtom } from '@/store';
import { Product, UrlParams } from '@/services/crawler';
import ProductSearchForm from '@/components/ProductSearchForm';
import ProductsList from '@/components/ProductsList';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const shouldFetch = useAtomValue(shouldFetchAtom);
  const { source, category, query } = useAtomValue(formAtom);
  const { data: products, error, isLoading } = useSWR(
    shouldFetch ? ['/api/products', source, category, query] : null,
    ([slug, source, category, query]) => (
      fetchProducts(slug, source as UrlParams['source'], category as UrlParams['category'], query as UrlParams['query'])
  ));
  console.log(source, category, query);
  console.log(products);

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-10 gap-10`}
    >
      <ProductSearchForm />
      {
        !isLoading && products && products.length > 0 ? (
          <ProductsList products={products as Product[]} />
        ) : null
      }
    </main>
  );
}

async function fetchProducts(
  slug: string,
  source: UrlParams['source'],
  category: UrlParams['category'],
  query: UrlParams['query']
) {
  const url = new URL(`http://localhost:3000${slug}`);
  url.searchParams.append('source', source);
  url.searchParams.append('category', category.toLowerCase());
  if (query !== '') {
    url.searchParams.append('query', query);
  }
  console.log(url.href);
  
  const response = await fetch(url.href);
  const products = await response.json();
  return Object.values(products) as Product[];
}
