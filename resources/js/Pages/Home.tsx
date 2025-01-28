import { Head } from "@inertiajs/react";

import type { PageProps, PaginationProps, Product } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProductItem from "@/Components/App/ProductItem";

export default function Home({
  products,
}: PageProps<{
  products: PaginationProps<Product>;
}>) {
  return (
    <AuthenticatedLayout>
      <Head title="Welcome" />
      <div className="h-[calc(100vh_-_70px)] hero bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3 lg:grid-cols-4">
        {products.data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
