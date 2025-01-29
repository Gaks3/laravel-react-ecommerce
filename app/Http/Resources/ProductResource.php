<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstMediaUrl('images'),
            'images' => $this->getMedia('images')->map(fn($image) => [
                'id' => $image->id,
                'thumb' => $image->getUrl('thumb'),
                'small' => $image->getUrl('small'),
                'large' => $image->getUrl('large'),
            ]),
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'department' => [
                'id' => $this->department->id,
                'name' => $this->department->name,
            ],
            'variationTypes' => $this->variationTypes->map(fn($variationType) => [
                'id' => $variationType->id,
                'name' => $variationType->name,
                'type' => $variationType->type,
                'options' => $variationType->options->map(fn($option) => [
                    'id' => $option->id,
                    'name' => $option->name,
                    'images' => $option->getMedia('images')->map(fn($image) => [
                        'id' => $image->id,
                        'thumb' => $image->getUrl('thumb'),
                        'small' => $image->getUrl('small'),
                        'large' => $image->getUrl('large'),
                    ])
                ])
            ]),
            'variations' => $this->variations->map(fn($variation) => [
                'id' => $variation->id,
                'variation_type_option_ids' => $variation->variation_type_option_ids,
                'quantity' => $variation->quantity,
                'price' => $variation->price
            ])
        ];
    }
}
