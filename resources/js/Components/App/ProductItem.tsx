import { Link } from "@inertiajs/react";

import { Product } from "@/types";
import CurrencyFormatter from "../Core/CurrencyFormatter";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="shadow-xl card bg-base-100">
      <Link href={route("product.show", product.slug)}>
        <figure>
          <img
            src={product.image}
            alt={product.title}
            className="object-cover aspect-square"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p>
          by{" "}
          <Link href="/" className="hover:underline">
            {product.user.name}
          </Link>
          &nbsp; in{" "}
          <Link href="/" className="hover:underline">
            {product.department.name}
          </Link>
        </p>
        <div className="items-center justify-between mt-3 card-actions">
          <button className="btn btn-primary">Add to Cart</button>
          <span className="text-2xl">
            <CurrencyFormatter amount={product.price} />
          </span>
        </div>
      </div>
    </div>
  );
}
