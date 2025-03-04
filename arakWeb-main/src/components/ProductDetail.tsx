import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  ShoppingCart,
  Heart,
  Share2,
  Plus,
  Minus,
  AlertTriangle,
  Wine,
  GlassWater,
  ArrowLeft,
  Martini,
} from "lucide-react";

interface ProductDetailProps {
  id?: string;
  name?: string;
  price?: number;
  images?: string[];
  alcoholContent?: number;
  category?: string;
  description?: string;
  volume?: string;
  origin?: string;
  brand?: string;
  inStock?: boolean;
  relatedProducts?: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
  }>;
  cocktailRecipes?: Array<{
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    image: string;
  }>;
  onAddToCart?: (id: string, quantity: number) => void;
  onGoBack?: () => void;
}

const ProductDetail = ({
  id = "1",
  name = "Premium Aged Whiskey",
  price = 59.99,
  images = [
    "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    "https://images.unsplash.com/photo-1582819509237-d5b75f20ff7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  ],
  alcoholContent = 40,
  category = "Whiskey",
  description = "A premium aged whiskey with rich notes of oak, vanilla, and caramel. This exceptional spirit has been aged for 12 years in charred oak barrels, resulting in a smooth, complex flavor profile with hints of spice and a warm, lingering finish. Perfect for sipping neat or as the foundation for classic cocktails.",
  volume = "750ml",
  origin = "Scotland",
  brand = "Highland Reserve",
  inStock = true,
  relatedProducts = [
    {
      id: "2",
      name: "Single Malt Scotch",
      image:
        "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      price: 79.99,
    },
    {
      id: "3",
      name: "Bourbon Whiskey",
      image:
        "https://images.unsplash.com/photo-1582819509237-d5b75f20ff7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      price: 49.99,
    },
    {
      id: "4",
      name: "Irish Whiskey",
      image:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      price: 54.99,
    },
  ],
  cocktailRecipes = [
    {
      id: "c1",
      name: "Old Fashioned",
      ingredients: [
        "2 oz Whiskey",
        "1 Sugar Cube",
        "2-3 dashes Angostura Bitters",
        "Orange Peel",
      ],
      instructions:
        "Muddle sugar cube with bitters in a rocks glass. Add whiskey and ice, stir well. Garnish with orange peel.",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
    {
      id: "c2",
      name: "Whiskey Sour",
      ingredients: [
        "2 oz Whiskey",
        "3/4 oz Fresh Lemon Juice",
        "1/2 oz Simple Syrup",
        "Egg White (optional)",
        "Lemon Twist",
      ],
      instructions:
        "Shake all ingredients with ice. Strain into a rocks glass over fresh ice. Garnish with a lemon twist.",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
    {
      id: "c3",
      name: "Manhattan",
      ingredients: [
        "2 oz Whiskey",
        "1 oz Sweet Vermouth",
        "2 dashes Angostura Bitters",
        "Maraschino Cherry",
      ],
      instructions:
        "Stir all ingredients with ice. Strain into a chilled cocktail glass. Garnish with a maraschino cherry.",
      image:
        "https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
  ],
  onAddToCart = () => {},
  onGoBack = () => {},
}: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getAlcoholStrengthLabel = (content: number) => {
    if (content < 5) return "Low";
    if (content < 15) return "Medium";
    return "High";
  };

  const getAlcoholStrengthColor = (content: number) => {
    if (content < 5) return "bg-green-500";
    if (content < 15) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 bg-white dark:bg-gray-900">
      <Button
        variant="ghost"
        className="mb-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        onClick={onGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[400px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <img
              src={images[selectedImage]}
              alt={name}
              className="w-full h-full object-cover"
            />
            <Badge
              className="absolute top-4 right-4 bg-amber-600 hover:bg-amber-700"
              title="Alcohol Content"
            >
              {alcoholContent}% ABV
            </Badge>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`h-20 w-20 rounded-md overflow-hidden border-2 cursor-pointer ${selectedImage === index ? "border-amber-600" : "border-gray-200 dark:border-gray-700"}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-slate-700 hover:bg-slate-800">
                {category}
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700">{volume}</Badge>
              {inStock ? (
                <Badge className="bg-green-600 hover:bg-green-700">
                  In Stock
                </Badge>
              ) : (
                <Badge className="bg-red-600 hover:bg-red-700">
                  Out of Stock
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {name}
            </h1>

            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-amber-600">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                / {volume}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Brand
                </p>
                <p className="font-medium">{brand}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Origin
                </p>
                <p className="font-medium">{origin}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Volume
                </p>
                <p className="font-medium">{volume}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Alcohol Strength
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-3 w-3 rounded-full ${getAlcoholStrengthColor(alcoholContent)}`}
                  ></div>
                  <p className="font-medium">
                    {getAlcoholStrengthLabel(alcoholContent)} ({alcoholContent}%
                    ABV)
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quantity Selector and Add to Cart */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none border-r border-gray-300 dark:border-gray-600"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-10 w-10 rounded-none border-l border-gray-300 dark:border-gray-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                  size="lg"
                  onClick={() => onAddToCart(id, quantity)}
                  disabled={!inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-11 w-11"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to Wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-11 w-11"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share Product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Age Warning */}
            <div className="mt-6 flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                This product contains alcohol. You must be 21 years or older to
                purchase. Please drink responsibly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Additional Information */}
      <div className="mt-12">
        <Tabs defaultValue="recipes">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="recipes" className="flex items-center">
              <Martini className="mr-2 h-4 w-4" />
              Cocktail Recipes
            </TabsTrigger>
            <TabsTrigger value="related" className="flex items-center">
              <Wine className="mr-2 h-4 w-4" />
              Related Products
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center">
              <GlassWater className="mr-2 h-4 w-4" />
              Product Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Cocktail Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cocktailRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                    <div className="mb-4">
                      <h4 className="font-medium mb-1">Ingredients:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Instructions:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {recipe.instructions}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="related" className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <span className="font-bold text-amber-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-2"
                      onClick={() => onAddToCart(product.id, 1)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {description}
                </p>

                <h3 className="text-lg font-semibold mb-2">Tasting Notes</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Rich and complex with notes of vanilla, caramel, and oak.
                  Smooth finish with hints of spice and dried fruits.
                </p>

                <h3 className="text-lg font-semibold mb-2">
                  Serving Suggestion
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Best enjoyed neat or with a splash of water to release the
                  complex flavors. Also excellent in classic cocktails like an
                  Old Fashioned or Manhattan.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Brand
                    </span>
                    <span className="font-medium">{brand}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Category
                    </span>
                    <span className="font-medium">{category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Origin
                    </span>
                    <span className="font-medium">{origin}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Volume
                    </span>
                    <span className="font-medium">{volume}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Alcohol Content
                    </span>
                    <span className="font-medium">{alcoholContent}% ABV</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Age Statement
                    </span>
                    <span className="font-medium">12 Years</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Barrel Type
                    </span>
                    <span className="font-medium">Charred Oak</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
