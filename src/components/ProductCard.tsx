import { Product } from "@/services/crawler";
import Image from "next/image";
// import Link from "next/link";

function ProductCard({ product }:{ product: Product}) {
  return ( 
    <div className="border bg-white py-3 px-2 rounded-lg border-slate-200 shadow-sm">
      <div className="flex">
        <div className="w-[160px] h-[160px] flex justify-center mr-5">
          <Image src={product.image} alt={product.title} width={160} height={160} style={{objectFit: "contain"}}/>
        </div>
        <div className="py-3 flex flex-col justify-evenly">
          <h2 className="truncate text-ellipsis text-xl font-medium">{product.title}</h2>
          <h3 className="text-xl">R$ {product.price}</h3>
          <div>
          <a href={product.link} target="_blank">
            <button className="border border-slate-300 rounded-md px-2 py-1">Ir a web</button>
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;