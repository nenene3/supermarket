"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AddDataFireBase } from "@/services/FireBaseApi"

// Define the product type based on the provided props
export type ProductType = {
  
  title: string
  description: string
  price: number
  image: string
  category?: string
  discount?: number
  rating?: number
  inStock?: boolean
}

// Sample categories
const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Toys", "Sports", "Beauty", "Health"]

export default function ProductForm({ defaultValues }: { defaultValues?: ProductType }) {
  // Initialize form state with default values or empty values
  const [product, setProduct] = useState<ProductType>({
    
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    price: defaultValues?.price || 0,
    image: defaultValues?.image || "",
    category: defaultValues?.category || "",
    discount: defaultValues?.discount || 0,
    rating: defaultValues?.rating || 0,
    inStock: defaultValues?.inStock !== undefined ? defaultValues.inStock : true,
  })

  // State for form errors
  const [errors, setErrors] = useState<Partial<Record<keyof ProductType, string>>>({})

  // State for image preview
  const [imagePreview, setImagePreview] = useState(defaultValues?.image || "/placeholder.svg?height=200&width=200")

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "number") {
      setProduct({
        ...product,
        [name]: Number.parseFloat(value) || 0,
      })
    } else {
      setProduct({
        ...product,
        [name]: value,
      })
    }

    // Clear error when field is edited
    if (errors[name as keyof ProductType]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }

    // Update image preview if image URL changes
    if (name === "image" && value && value.startsWith("http")) {
      setImagePreview(value)
    } else if (name === "image" && (!value || !value.startsWith("http"))) {
      setImagePreview("/placeholder.svg?height=200&width=200")
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setProduct({
      ...product,
      inStock: checked,
    })
  }

  // Handle select change
  const handleSelectChange = (value: string) => {
    setProduct({
      ...product,
      category: value,
    })
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductType, string>> = {}

    if (!product.title || product.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters."
    }

    if (!product.description || product.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters."
    }

    if (!product.price || product.price <= 0) {
      newErrors.price = "Price must be a positive number."
    }

    if (!product.image || !product.image.startsWith("http")) {
      newErrors.image = "Please enter a valid image URL."
    }

    if (product.discount !== undefined && (product.discount < 0 || product.discount > 100)) {
      newErrors.discount = "Discount must be between 0 and 100."
    }

    if (product.rating !== undefined && (product.rating < 0 || product.rating > 5)) {
      newErrors.rating = "Rating must be between 0 and 5."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const  handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log(product)
      try{
        const productRef = await AddDataFireBase('products',product)
        alert("Product saved successfully!")
      }catch(e){
        console.error(e)
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Enter the details for your product.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* ID field */}
              

              {/* Title field */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Product title"
                  value={product.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              {/* Price field */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={product.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
              </div>

              {/* Category field */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={handleSelectChange} defaultValue={product.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
              </div>

              {/* Discount field */}
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={product.discount}
                  onChange={handleChange}
                />
                {errors.discount && <p className="text-sm text-destructive">{errors.discount}</p>}
              </div>

              {/* Rating field */}
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={product.rating}
                  onChange={handleChange}
                />
                {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
              </div>

              {/* In Stock field */}
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <Checkbox id="inStock" checked={product.inStock} onCheckedChange={handleCheckboxChange} />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="inStock">In Stock</Label>
                  <p className="text-sm text-muted-foreground">Is this product currently available?</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Image URL field */}
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={product.image}
                  onChange={handleChange}
                />
                {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
              </div>

              {/* Image preview */}
              <div className="border rounded-md p-2">
                <p className="text-sm text-muted-foreground mb-2">Image Preview</p>
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Product preview"
                    
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Description field */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product"
                  className="min-h-[120px]"
                  value={product.description}
                  onChange={handleChange}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

