import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  RefreshCw,
  Package,
  AlertTriangle,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  alcoholContent: number;
  category: string;
  description: string;
  stock: number;
  volume: string;
  brand: string;
}

const InventoryManagement = () => {
  const navigate = useNavigate();
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
      stock: 24,
      volume: "750ml",
      brand: "Highland Reserve",
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
      stock: 48,
      volume: "355ml",
      brand: "Hoppy Brews",
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
      stock: 36,
      volume: "750ml",
      brand: "Vineyard Estates",
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
      stock: 18,
      volume: "750ml",
      brand: "Crystal Clear",
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
      stock: 12,
      volume: "750ml",
      brand: "Botanical Spirits",
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
      stock: 8,
      volume: "750ml",
      brand: "Bubbly Elegance",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    alcoholContent: 0,
    category: "",
    description: "",
    stock: 0,
    volume: "",
    brand: "",
    image:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80",
  });
  const [restockAmount, setRestockAmount] = useState(0);

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/admin/login");
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill in all required fields");
      return;
    }

    const newId = (products.length + 1).toString();
    const productToAdd = {
      id: newId,
      name: newProduct.name || "",
      price: newProduct.price || 0,
      image: newProduct.image || "",
      alcoholContent: newProduct.alcoholContent || 0,
      category: newProduct.category || "",
      description: newProduct.description || "",
      stock: newProduct.stock || 0,
      volume: newProduct.volume || "",
      brand: newProduct.brand || "",
    };

    setProducts([...products, productToAdd]);
    setIsAddProductOpen(false);
    setNewProduct({
      name: "",
      price: 0,
      alcoholContent: 0,
      category: "",
      description: "",
      stock: 0,
      volume: "",
      brand: "",
      image:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80",
    });
  };

  const handleRestock = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? { ...product, stock: product.stock + restockAmount }
        : product,
    );

    setProducts(updatedProducts);
    setIsRestockOpen(false);
    setRestockAmount(0);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  const openRestockDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsRestockOpen(true);
  };

  const getStockStatusBadge = (stock: number) => {
    if (stock <= 0) {
      return (
        <Badge variant="destructive" className="whitespace-nowrap">
          Out of Stock
        </Badge>
      );
    } else if (stock < 10) {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 border-yellow-300 whitespace-nowrap"
        >
          Low Stock: {stock}
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300 whitespace-nowrap"
        >
          In Stock: {stock}
        </Badge>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-amber-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Inventory Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {localStorage.getItem("userEmail")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-4 w-full md:w-auto">
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new product to your inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name*</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price*</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: parseFloat(e.target.value),
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category*</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) =>
                          setNewProduct({ ...newProduct, category: value })
                        }
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Whiskey">Whiskey</SelectItem>
                          <SelectItem value="Beer">Beer</SelectItem>
                          <SelectItem value="Wine">Wine</SelectItem>
                          <SelectItem value="Vodka">Vodka</SelectItem>
                          <SelectItem value="Gin">Gin</SelectItem>
                          <SelectItem value="Rum">Rum</SelectItem>
                          <SelectItem value="Tequila">Tequila</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={newProduct.brand}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            brand: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alcoholContent">
                        Alcohol Content (%)
                      </Label>
                      <Input
                        id="alcoholContent"
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={newProduct.alcoholContent}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            alcoholContent: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume</Label>
                      <Select
                        value={newProduct.volume}
                        onValueChange={(value) =>
                          setNewProduct({ ...newProduct, volume: value })
                        }
                      >
                        <SelectTrigger id="volume">
                          <SelectValue placeholder="Select volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50ml">50ml</SelectItem>
                          <SelectItem value="200ml">200ml</SelectItem>
                          <SelectItem value="355ml">355ml</SelectItem>
                          <SelectItem value="500ml">500ml</SelectItem>
                          <SelectItem value="750ml">750ml</SelectItem>
                          <SelectItem value="1L">1L</SelectItem>
                          <SelectItem value="1.75L">1.75L</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Initial Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stock: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddProductOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isRestockOpen} onOpenChange={setIsRestockOpen}>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Restock Product</DialogTitle>
                  <DialogDescription>
                    Add inventory to {selectedProduct?.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <span>Current Stock:</span>
                    <Badge variant="outline">
                      {selectedProduct?.stock || 0} units
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restockAmount">Amount to Add</Label>
                    <Input
                      id="restockAmount"
                      type="number"
                      min="1"
                      value={restockAmount}
                      onChange={(e) =>
                        setRestockAmount(parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRestockOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={handleRestock}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restock
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Low Stock Alert */}
        {products.some((product) => product.stock < 10) && (
          <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 rounded-md flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                Low Stock Alert
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Some products are running low on inventory. Consider restocking
                soon.
              </p>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No products found matching your search.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {product.alcoholContent}% ABV | {product.volume}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStockStatusBadge(product.stock)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openRestockDialog(product)}
                          className="h-8 px-2"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default InventoryManagement;
