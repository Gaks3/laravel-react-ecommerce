import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

import type { Product, VariationTypeOption } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Carousel from "@/Components/Core/Carousel";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { arraysAreEqual } from "@/lib/utils";

type ShowProps = {
  product: Product;
  variationOptions: number[];
};

type Form = {
  option_ids: Record<string, number>;
  quantity: number;
  price: number | null;
};

export default function Show({ product, variationOptions }: ShowProps) {
  const form = useForm<Form>({
    option_ids: {},
    quantity: 1,
    price: null,
  });

  const { url } = usePage();

  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, VariationTypeOption>
  >([]);

  const images = useMemo(() => {
    for (let typeId in selectedOptions) {
      const option = selectedOptions[typeId];
      if (option.images.length > 0) return option.images;
    }

    return product.images;
  }, [product, selectedOptions]);

  const computedProduct = useMemo(() => {
    const selectedOptionIds = Object.values(selectedOptions)
      .map((option) => option.id)
      .sort();

    for (let variation of product.variations) {
      const optionIds = variation.variation_type_option_ids.sort();
      if (arraysAreEqual(selectedOptionIds, optionIds))
        return {
          price: variation.price,
          quantity:
            variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
        };
    }

    return {
      price: product.price,
      quantity: product.quantity,
    };
  }, [product, selectedOptions]);

  useEffect(() => {
    for (let type of product.variationTypes) {
      const selectedOptionId: number = variationOptions[type.id];

      chooseOption(
        type.id,
        type.options.find((option) => option.id == selectedOptionId) ||
          type.options[0],
        false
      );
    }
  }, []);

  const getOptionIdsMap = (newOptions: object) =>
    Object.fromEntries(Object.entries(newOptions).map(([a, b]) => [a, b.id]));

  const chooseOption = (
    typeId: number,
    option: VariationTypeOption,
    updateRouter: boolean = true
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = {
        ...prevSelectedOptions,
        [typeId]: option,
      };

      if (updateRouter)
        router.get(
          url,
          {
            options: getOptionIdsMap(newOptions),
          },
          {
            preserveScroll: true,
            preserveState: true,
          }
        );

      return newOptions;
    });
  };

  const onQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    form.setData("quantity", parseInt(event.target.value));

  const addToCart = () =>
    form.post(route("cart.store", product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => console.log(err),
    });

  const renderProductVariationTypes = () =>
    product.variationTypes.map((type, i) => (
      <div key={type.id}>
        <b>{type.name}</b>
        {type.type === "Image" && (
          <div className="flex gap-2 mb-4">
            {type.options.map((option) => (
              <div
                key={option.id}
                onClick={() => chooseOption(type.id, option)}
              >
                {option.images && (
                  <img
                    src={option.images[0].thumb}
                    alt="Product Thumb Image"
                    className={`w-[50px] ${
                      selectedOptions[type.id]?.id === option.id
                        ? "outline outline-4 outline-primary"
                        : ""
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {type.type === "Radio" && (
          <div className="flex mb-4 join">
            {type.options.map((option) => (
              <input
                key={option.id}
                onChange={() => chooseOption(type.id, option)}
                className="join-item btn"
                type="radio"
                value={option.id}
                checked={selectedOptions[type.id]?.id === option.id}
                name={`variation_type_${type.id}`}
                aria-label={option.name}
              />
            ))}
          </div>
        )}
      </div>
    ));

  const renderAddToCartButton = () => (
    <div className="flex gap-4 mb-8">
      <select
        className="w-full select select-bordered"
        value={form.data.quantity}
        onChange={onQuantityChange}
      >
        {Array.from({ length: Math.min(10, computedProduct.quantity) }).map(
          (_, i) => (
            <option key={i + 1} value={i + 1}>
              Quantity: {i + 1}
            </option>
          )
        )}
      </select>
      <button onClick={addToCart} className="btn btn-primary">
        Add to Cart
      </button>
    </div>
  );

  useEffect(() => {
    const idsMap = Object.fromEntries(
      Object.entries(selectedOptions).map(
        ([typeId, option]: [string, VariationTypeOption]) => [typeId, option.id]
      )
    );

    form.setData("option_ids", idsMap);
  }, [selectedOptions]);

  return (
    <AuthenticatedLayout>
      <Head title={product.title} />

      <div className="container p-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="col-span-7">
            <Carousel images={images} />
          </div>
          <div className="col-span-5">
            <h1 className="mb-8 text-2xl">{product.title}</h1>

            <div>
              <div className="text-3xl font-semibold">
                <CurrencyFormatter amount={computedProduct.price} />
              </div>
            </div>

            {renderProductVariationTypes()}

            {computedProduct.quantity != undefined &&
              computedProduct.quantity < 10 && (
                <div className="my-4 text-error">
                  <span>Only {computedProduct.quantity} left</span>
                </div>
              )}

            {renderAddToCartButton()}

            <b className="text-xl">About the Item</b>
            <div
              className="wysiwyg-output"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
