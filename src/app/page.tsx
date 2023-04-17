'use client';
import ProductSearchForm from '@/components/ProductSearchForm';
import { UrlParams } from '@/services/crawler';
import { Inter } from 'next/font/google';

import { useFetchStore, useStore } from '@/store';
import { shallow } from 'zustand/shallow';

const inter = Inter({ subsets: ['latin'] });

async function fetchProducts(
  source: UrlParams['source'],
  category: UrlParams['category'],
  query: UrlParams['query']
) {
  const url = new URL('http://localhost:3000/api/products');
  url.searchParams.append('source', source);
  url.searchParams.append('category', category.toLowerCase());
  if (query !== '') {
    url.searchParams.append('query', query);
  }

  const response = await fetch(url.href);
  const products = await response.json();

  return products;
}

export default function Home() {
  let productsList = [];

  const { source, category, query } = useStore(
    (state) => ({
      source: state.source,
      category: state.category,
      query: state.query,
    }),
    shallow
  );

  const toggleShouldFetch = useFetchStore((state) => state.toggleShouldFetch);

  const unsub = useFetchStore.subscribe(async (state) => {
    
    if (state) {
      productsList = await fetchProducts(
        source as UrlParams['source'],
        category as UrlParams['category'],
        query as UrlParams['query']
      );
      toggleShouldFetch();
    }
  });

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <ProductSearchForm />
      {/* <p>{prod}</p> */}
    </main>
  );
}
