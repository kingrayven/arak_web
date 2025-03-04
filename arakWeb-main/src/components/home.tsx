import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import AgeVerificationModal from "./AgeVerificationModal";
import ProductCatalog from "./ProductCatalog";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import CartPreview from "./cart/CartPreview";
import { Button } from "./ui/button";
import { Wine, Beer, GlassWater, Sparkles } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  alcoholContent: number;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Home = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Aged Whiskey",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      alcoholContent: 40,
      category: "Whiskey",
      description:
        "A premium aged whiskey with rich notes of oak, vanilla, and caramel.",
    },
    {
      id: "2",
      name: "Craft IPA Beer",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alcoholContent: 6.5,
      category: "Beer",
      description: "A hoppy IPA with citrus notes and a refreshing finish.",
    },
    {
      id: "3",
      name: "Cabernet Sauvignon",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alcoholContent: 13.5,
      category: "Wine",
      description: "A full-bodied red wine with notes of blackberry and cedar.",
    },
    {
      id: "4",
      name: "Premium Vodka",
      price: 32.99,
      image:
        "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      alcoholContent: 40,
      category: "Vodka",
      description: "A smooth, triple-distilled vodka with a clean finish.",
    },
    {
      id: "5",
      name: "London Dry Gin",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      alcoholContent: 47,
      category: "Gin",
      description: "A classic London dry gin with botanical notes and juniper.",
    },
    {
      id: "6",
      name: "Champagne Brut",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      alcoholContent: 12,
      category: "Wine",
      description:
        "A crisp, elegant champagne with fine bubbles and citrus notes.",
    },
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Filter products based on search query and active category
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (activeCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, activeCategory]);

  const handleAgeVerification = () => {
    setShowAgeVerification(false);
  };

  const handleAgeRejection = () => {
    // In a real app, you might redirect to a different page
    alert("You must be 21 or older to access this site.");
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        // Increment quantity if item already in cart
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Open cart preview when adding item
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    // In a real app, this would apply more complex filtering
    // For now, we'll just filter by category if it's selected
    if (filters.categories.length > 0) {
      setActiveCategory(filters.categories[0]);
    } else {
      setActiveCategory(null);
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeVerification}
        onVerify={handleAgeVerification}
        onReject={handleAgeRejection}
      />

      {/* Header */}
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onSearch={handleSearch}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
          alt="Premium Liquor Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Liquor Collection
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Discover our curated selection of fine spirits, wines, and craft
            beers
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg">
            Shop Now
          </Button>
        </div>
      </div>

      {/* Category Quick Links */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant={activeCategory === "wine" ? "default" : "outline"}
            className="flex flex-col items-center justify-center h-32 gap-2"
            onClick={() => handleCategoryClick("wine")}
          >
            <Wine className="h-8 w-8 text-red-500" />
            <span>Wine</span>
          </Button>
          <Button
            variant={activeCategory === "beer" ? "default" : "outline"}
            className="flex flex-col items-center justify-center h-32 gap-2"
            onClick={() => handleCategoryClick("beer")}
          >
            <Beer className="h-8 w-8 text-amber-500" />
            <span>Beer</span>
          </Button>
          <Button
            variant={activeCategory === "whiskey" ? "default" : "outline"}
            className="flex flex-col items-center justify-center h-32 gap-2"
            onClick={() => handleCategoryClick("whiskey")}
          >
            <GlassWater className="h-8 w-8 text-amber-700" />
            <span>Whiskey</span>
          </Button>
          <Button
            variant={
              activeCategory === "special offers" ? "default" : "outline"
            }
            className="flex flex-col items-center justify-center h-32 gap-2"
            onClick={() => handleCategoryClick("special offers")}
          >
            <Sparkles className="h-8 w-8 text-yellow-500" />
            <span>Special Offers</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex-1 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {activeCategory
                  ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`
                  : "All Products"}
              </h2>
              <p className="text-gray-500">
                {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    alcoholContent={product.alcoholContent}
                    category={product.category}
                    description={product.description}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-amber-50 dark:bg-amber-900/20 py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={`featured-${product.id}`}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                alcoholContent={product.alcoholContent}
                category={product.category}
                description={product.description}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Preview */}
      <CartPreview
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => alert("Proceeding to checkout...")}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
