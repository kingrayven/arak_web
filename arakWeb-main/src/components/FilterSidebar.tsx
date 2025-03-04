import React, { useState } from "react";
import { Wine, Beer, GlassWater, Filter } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  alcoholContent: string;
  sortBy: string;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps = {}) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 200],
    alcoholContent: "all",
    sortBy: "popularity",
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    const updatedFilters = {
      ...filters,
      categories: updatedCategories,
    };

    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const updatedFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    };

    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleAlcoholContentChange = (value: string) => {
    const updatedFilters = {
      ...filters,
      alcoholContent: value,
    };

    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleSortChange = (value: string) => {
    const updatedFilters = {
      ...filters,
      sortBy: value,
    };

    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  return (
    <div className="w-full h-full max-w-[280px] bg-white dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        {/* Categories Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-3">Categories</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="wine"
                checked={filters.categories.includes("wine")}
                onChange={(e) => handleCategoryChange("wine", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <div className="flex items-center gap-2">
                <Wine className="h-4 w-4 text-red-500" />
                <label htmlFor="wine" className="text-sm">
                  Wine
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="beer"
                checked={filters.categories.includes("beer")}
                onChange={(e) => handleCategoryChange("beer", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <div className="flex items-center gap-2">
                <Beer className="h-4 w-4 text-amber-500" />
                <label htmlFor="beer" className="text-sm">
                  Beer
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="whiskey"
                checked={filters.categories.includes("whiskey")}
                onChange={(e) =>
                  handleCategoryChange("whiskey", e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <div className="flex items-center gap-2">
                <GlassWater className="h-4 w-4 text-amber-700" />
                <label htmlFor="whiskey" className="text-sm">
                  Whiskey
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="vodka"
                checked={filters.categories.includes("vodka")}
                onChange={(e) =>
                  handleCategoryChange("vodka", e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="vodka" className="text-sm">
                Vodka
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="gin"
                checked={filters.categories.includes("gin")}
                onChange={(e) => handleCategoryChange("gin", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="gin" className="text-sm">
                Gin
              </label>
            </div>
          </div>
        </div>

        {/* Price Range Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-3">Price Range</h3>
          <div className="space-y-4">
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange([
                    filters.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full"
              />
            </div>
            <div className="flex justify-between">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Alcohol Content Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-3">Alcohol Content</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="all"
                name="alcoholContent"
                value="all"
                checked={filters.alcoholContent === "all"}
                onChange={(e) => handleAlcoholContentChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="low"
                name="alcoholContent"
                value="low"
                checked={filters.alcoholContent === "low"}
                onChange={(e) => handleAlcoholContentChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="low" className="text-sm">
                Low (0-5%)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="medium"
                name="alcoholContent"
                value="medium"
                checked={filters.alcoholContent === "medium"}
                onChange={(e) => handleAlcoholContentChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="medium" className="text-sm">
                Medium (5-15%)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="high"
                name="alcoholContent"
                value="high"
                checked={filters.alcoholContent === "high"}
                onChange={(e) => handleAlcoholContentChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="high" className="text-sm">
                High (15%+)
              </label>
            </div>
          </div>
        </div>

        {/* Sort By Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-3">Sort By</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="popularity"
                name="sortBy"
                value="popularity"
                checked={filters.sortBy === "popularity"}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="popularity" className="text-sm">
                Popularity
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="price-low"
                name="sortBy"
                value="price-low"
                checked={filters.sortBy === "price-low"}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="price-low" className="text-sm">
                Price: Low to High
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="price-high"
                name="sortBy"
                value="price-high"
                checked={filters.sortBy === "price-high"}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="price-high" className="text-sm">
                Price: High to Low
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="newest"
                name="sortBy"
                value="newest"
                checked={filters.sortBy === "newest"}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-4 w-4"
              />
              <label htmlFor="newest" className="text-sm">
                Newest
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-6" />

      <button
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        onClick={() => {
          const resetFilters = {
            categories: [],
            priceRange: [0, 200],
            alcoholContent: "all",
            sortBy: "popularity",
          };
          setFilters(resetFilters);
          onFilterChange?.(resetFilters);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
