import { NextRequest, NextResponse } from "next/server";
import { getProductsFromCategory } from "@/services/crawler"

export async function GET(request: NextRequest) {
  const { category, query } = Object.fromEntries(request.nextUrl.searchParams.entries());
  // const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  // const categories = await response.json();
  const products = await getProductsFromCategory("mercadoLivre", "geladeira", "");
  // const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${query}`);

  // return NextResponse.json({ ...categories });
  return NextResponse.json({ ...products });
}
