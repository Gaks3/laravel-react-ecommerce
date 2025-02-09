import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { GroupedCartItems, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import CartItem from "@/Components/App/CartItem";
import { CreditCardIcon } from "@heroicons/react/24/outline";

export default function CartPage({
  csrf_token,
  cartItems,
  totalPrice,
  totalQuantity,
}: PageProps<{ cartItems: Record<number, GroupedCartItems> }>) {
  return (
    <AuthenticatedLayout>
      <Head title="Your Cart" />

      <div className="container flex flex-col gap-4 p-8 mx-auto lg:flex-row">
        <div className="flex-1 order-2 bg-white card dark:bg-gray-800 lg:order-1">
          <div className="card-body">
            <h2 className="text-lg font-bold">Shopping Cart</h2>

            <div className="my-4">
              {Object.keys(cartItems).length === 0 ? (
                <div className="py-2 text-center text-gray-500">
                  You don't have any items yet.
                </div>
              ) : (
                <>
                  {Object.values(cartItems).map((cartItem, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300">
                        <Link href="/" className="underline">
                          {cartItem.user.name}
                        </Link>
                        <div>
                          <form action={route("cart.checkout")} method="post">
                            <input
                              type="hidden"
                              name="_token"
                              value={csrf_token}
                            />
                            <input
                              type="hidden"
                              name="vendor_id"
                              value={cartItem.user.id}
                            />
                            <button className="btn btn-sm btn-ghost">
                              <CreditCardIcon className="size-6" />
                              Pay Only for this seller
                            </button>
                          </form>
                        </div>
                      </div>
                      {cartItem.items.map((item) => (
                        <CartItem item={item} key={item.id} />
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="card bg-white dark:bg-gray-800 lg:min-w-[260px] order-1 lg:order-2">
          <div className="card-body">
            Subtotal ({totalQuantity} items): &nbsp;
            <CurrencyFormatter amount={totalPrice} />
            <form action={route("cart.checkout")} method="post">
              <input type="hidden" name="_token" value={csrf_token} />
              <PrimaryButton className="rounded-full">
                <CreditCardIcon className="size-6" />
                Proceed to checkout
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
