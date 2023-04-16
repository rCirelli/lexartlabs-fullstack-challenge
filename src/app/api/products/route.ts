import { NextRequest, NextResponse } from "next/server";
import { UrlParams, getProductsFromCategory } from "@/services/crawler"

export async function GET(request: NextRequest) {
  const { source, category, query } = Object.fromEntries(request.nextUrl.searchParams.entries()) as UrlParams;
  const products = await getProductsFromCategory(source, category, query);

  return NextResponse.json({ ...products });
}
