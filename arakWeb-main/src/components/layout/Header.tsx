import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Sun,
  Moon,
  Menu,
  UserCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onThemeToggle?: (theme: "light" | "dark") => void;
}

const Header = ({
  cartItemCount = 0,
  onSearch = () => {},
  onCartClick = () => {},
  onThemeToggle = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    onThemeToggle(newTheme);
  };

  return (
    <header className="w-full h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a
                  href="/"
                  className="text-lg font-medium hover:text-amber-600 transition-colors"
                >
                  Home
                </a>
                <a
                  href="/wine"
                  className="text-lg font-medium hover:text-amber-600 transition-colors"
                >
                  Wine
                </a>
                <a
                  href="/beer"
                  className="text-lg font-medium hover:text-amber-600 transition-colors"
                >
                  Beer
                </a>
                <a
                  href="/spirits"
                  className="text-lg font-medium hover:text-amber-600 transition-colors"
                >
                  Spirits
                </a>
                <a
                  href="/offers"
                  className="text-lg font-medium hover:text-amber-600 transition-colors"
                >
                  Special Offers
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          <a href="/" className="text-2xl font-bold text-amber-600">
            Drizzle!
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-8 space-x-6">
            <a
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              Home
            </a>
            <a
              href="/wine"
              className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              Wine
            </a>
            <a
              href="/beer"
              className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              Beer
            </a>
            <a
              href="/spirits"
              className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              Spirits
            </a>
            <a
              href="/offers"
              className="text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              Special Offers
            </a>
          </nav>
        </div>

        {/* Search, Theme Toggle, and Cart */}
        <div className="flex items-center space-x-4">
          {/* Search Bar - Hidden on mobile */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative"
          >
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Mobile Search Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <form onSubmit={handleSearchSubmit} className="p-2">
                <div className="flex">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Admin Link */}
          <Link to="/admin/login">
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
