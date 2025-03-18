import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComponentProps } from "react"
import { ProductType } from "@/features/Products/productForm"

export type ProductCardProps = {
  id: string
  title: string
  description: string
  price: number
  image: string
  category?: string
  discount?: number
  rating?: number
  inStock?: boolean
  onAddToCart:()=>void
} &ComponentProps<'div'>

export function ProductCard({
  id,
  title,
  description,
  price,
  image,
  category,
  discount,
  rating,
  inStock = true,
  onAddToCart,
  ...props
}: ProductCardProps) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price

  return (
    <div key={id} className={`group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md max-w-full ${props.className ? props.className :''}`} >
      {/* Product image with smaller aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image || "https://join.travelmanagers.com.au/wp-content/uploads/2017/09/default-placeholder-300x300.png"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount && (
          <Badge variant="destructive" className="absolute right-2 top-2 px-1.5 py-0.5 text-xs">
            {discount}% OFF
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-lg font-semibold text-white">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product details with reduced padding */}
      <div className="flex flex-col p-3">
        {category && <span className="mb-0.5 text-xs font-medium uppercase text-muted-foreground">{category}</span>}
        <h3 className="mb-1 line-clamp-1 text-base font-semibold">{title}</h3>
        <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{description}</p>

        {/* Price and rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {discount ? (
              <>
                <span className="text-base font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-base font-bold">${price.toFixed(2)}</span>
            )}
          </div>
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium">{rating}</span>
              <svg className="h-3.5 w-3.5 fill-current text-yellow-500" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          )}
        </div>

        {/* Add to cart button with reduced margin */}
        <Button variant="default" size="sm" className="mt-2 w-full h-8 text-xs px-2" disabled={!inStock} onClick={onAddToCart}>
          <ShoppingCart className="mr-1.5 h-3 w-3" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  )
}

