import { Product } from "@/services/crawler";
import Image from "next/image";
import Link from "next/link";

function ProductsList({ products }: { products: Product[]}) {
  return (
    <ul>
      {products.map((product: Product) => (
        <li key={product.title}>
          <Link href={product.link}>
            <Image src={product.link} alt={product.title} width={160} height={160} style={{objectFit: "contain"}}/>
            <h3>{product.title}</h3>
            <h4>{product.price}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;