import React, { useState } from "react";
import { ShoppingCart, X, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Badge } from "../../components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../../components/ui/sheet";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  alcoholContent?: number;
}

interface CartPreviewProps {
  items?: CartItem[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onCheckout?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CartItemComponent = ({
  item,
  onRemove = () => {},
  onUpdateQuantity = () => {},
}: {
  item: CartItem;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}) => {
  return (
    <div className="flex items-center gap-4 py-4 bg-white dark:bg-gray-800">
      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
        <div className="flex items-center mt-1">
          <span className="text-sm font-semibold text-amber-600">
            ${item.price.toFixed(2)}
          </span>
          {item.alcoholContent && (
            <Badge className="ml-2 bg-amber-600 text-xs" variant="secondary">
              {item.alcoholContent}% ABV
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() =>
            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          disabled={item.quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-6 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-500 hover:text-red-500"
        onClick={() => onRemove(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

const CartPreview = ({
  items = [
    {
      id: "1",
      name: "Premium Whiskey",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80",
      quantity: 1,
      alcoholContent: 40,
    },
    {
      id: "2",
      name: "Craft Beer Selection",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      quantity: 2,
      alcoholContent: 5.5,
    },
    {
      id: "3",
      name: "Red Wine Cabernet",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      quantity: 1,
      alcoholContent: 13.5,
    },
  ],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  onCheckout = () => {},
  isOpen = true,
  onOpenChange = () => {},
}: CartPreviewProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    onRemoveItem(id);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCartItems(updatedItems);
    onUpdateQuantity(id, quantity);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // Assuming 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 px-2 py-1 bg-amber-600 text-white">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white dark:bg-gray-900">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({itemCount} items)
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] p-6">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-500">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-400 mt-2 text-center">
              Looks like you haven't added any products to your cart yet.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6 h-[300px]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-medium">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tax (8%)</span>
                  <span className="text-sm font-medium">
                    ${calculateTax().toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-base font-bold text-amber-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <SheetFooter className="mt-6">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={onCheckout}
                >
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPreview;
