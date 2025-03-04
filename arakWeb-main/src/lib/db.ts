import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Product related functions
export async function getProducts(options: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  alcoholContent?: string;
  sortBy?: string;
  limit?: number;
  featured?: boolean;
}) {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      categories:category_id(name),
      brands:brand_id(name)
    `,
    )
    .eq("is_active", true);

  // Apply filters
  if (options.category) {
    query = query.eq("categories.name", options.category);
  }

  if (options.search) {
    query = query.or(
      `name.ilike.%${options.search}%,description.ilike.%${options.search}%`,
    );
  }

  if (options.minPrice !== undefined) {
    query = query.gte("price", options.minPrice);
  }

  if (options.maxPrice !== undefined) {
    query = query.lte("price", options.maxPrice);
  }

  if (options.alcoholContent) {
    switch (options.alcoholContent) {
      case "low":
        query = query.lt("alcohol_content", 5);
        break;
      case "medium":
        query = query.gte("alcohol_content", 5).lt("alcohol_content", 15);
        break;
      case "high":
        query = query.gte("alcohol_content", 15);
        break;
    }
  }

  if (options.featured) {
    query = query.eq("is_featured", true);
  }

  // Apply sorting
  if (options.sortBy) {
    switch (options.sortBy) {
      case "price-low":
        query = query.order("price", { ascending: true });
        break;
      case "price-high":
        query = query.order("price", { ascending: false });
        break;
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      default: // popularity or default
        query = query.order("is_featured", { ascending: false }).order("name");
    }
  } else {
    query = query.order("is_featured", { ascending: false }).order("name");
  }

  // Apply limit
  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
}

// Get a single product by ID
export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories:category_id(name),
      brands:brand_id(name),
      product_images(*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

// Get cocktail recipes related to a product
export async function getRelatedCocktailRecipes(productId: string) {
  const { data, error } = await supabase
    .from("recipe_ingredients")
    .select(
      `
      cocktail_recipes:recipe_id(*)
    `,
    )
    .eq("product_id", productId);

  if (error) {
    console.error("Error fetching related cocktail recipes:", error);
    return [];
  }

  // Extract unique recipes
  const recipes = data.map((item) => item.cocktail_recipes);
  return recipes;
}

// Get related products (same category)
export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 3,
) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", productId)
    .eq("is_active", true)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }

  return data;
}

// Inventory management functions
export async function updateProductStock(
  productId: string,
  quantity: number,
  notes: string = "",
) {
  // Start a transaction
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .single();

  if (productError) {
    console.error("Error fetching product for stock update:", productError);
    return { success: false, error: productError };
  }

  const newStock = product.stock + quantity;

  // Update product stock
  const { error: updateError } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", productId);

  if (updateError) {
    console.error("Error updating product stock:", updateError);
    return { success: false, error: updateError };
  }

  // Record the transaction
  const { error: transactionError } = await supabase
    .from("inventory_transactions")
    .insert({
      product_id: productId,
      quantity: quantity,
      transaction_type: quantity > 0 ? "restock" : "adjustment",
      notes: notes,
    });

  if (transactionError) {
    console.error("Error recording inventory transaction:", transactionError);
    return { success: false, error: transactionError };
  }

  return { success: true, newStock };
}

// Authentication functions
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error logging in:", error);
    return { success: false, error };
  }

  // Get user role
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("email", email)
    .single();

  if (userError) {
    console.error("Error fetching user role:", userError);
    return { success: true, user: data.user, role: "customer" };
  }

  return { success: true, user: data.user, role: userData.role };
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error);
    return { success: false, error };
  }

  return { success: true };
}

// Cart functions
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1,
) {
  // Check if item already exists in cart
  const { data: existingItem, error: checkError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 means no rows returned
    console.error("Error checking cart:", checkError);
    return { success: false, error: checkError };
  }

  if (existingItem) {
    // Update quantity if item exists
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);

    if (updateError) {
      console.error("Error updating cart item:", updateError);
      return { success: false, error: updateError };
    }
  } else {
    // Add new item if it doesn't exist
    const { error: insertError } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: productId,
      quantity: quantity,
    });

    if (insertError) {
      console.error("Error adding item to cart:", insertError);
      return { success: false, error: insertError };
    }
  }

  return { success: true };
}

export async function getCartItems(userId: string) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products:product_id(*)
    `,
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }

  return data;
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
) {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId);

  if (error) {
    console.error("Error updating cart item quantity:", error);
    return { success: false, error };
  }

  return { success: true };
}

export async function removeCartItem(cartItemId: string) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) {
    console.error("Error removing cart item:", error);
    return { success: false, error };
  }

  return { success: true };
}
