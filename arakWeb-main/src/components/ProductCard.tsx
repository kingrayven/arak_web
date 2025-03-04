import React from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { ShoppingCart, Info } from "lucide-react";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  alcoholContent?: number;
  category?: string;
  description?: string;
  onAddToCart?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Premium Whiskey",
  price = 49.99,
  image = "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  alcoholContent = 40,
  category = "Whiskey",
  description = "A smooth, aged whiskey with notes of oak, vanilla, and caramel.",
  onAddToCart = () => {},
}: ProductCardProps) => {
  return (
    <Card className="w-full max-w-[280px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800">
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge
          className="absolute top-2 right-2 bg-amber-600 hover:bg-amber-700"
          title="Alcohol Content"
        >
          {alcoholContent}% ABV
        </Badge>
        <Badge className="absolute top-2 left-2 bg-slate-700 hover:bg-slate-800">
          {category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">{name}</h3>
          <span className="text-lg font-bold text-amber-600">
            ${price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
          {description}
        </p>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[200px]">{description}</p>
              <p className="font-semibold mt-1">{alcoholContent}% ABV</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          onClick={() => onAddToCart(id)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
