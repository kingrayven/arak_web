# Supabase Database Setup for Liquor Store

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Note your project URL and anon key (you'll need these for your application)

### 2. Set Up Environment Variables

Create a `.env` file in your project root with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the SQL Scripts

1. Navigate to the SQL Editor in your Supabase dashboard
2. Create a new query
3. Copy and paste the contents of `src/sql/schema.sql` into the editor
4. Run the query to create all tables and relationships
5. Create another new query
6. Copy and paste the contents of `src/sql/seed.sql` into the editor
7. Run the query to populate your database with sample data

### 4. Set Up Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Make sure Email auth is enabled
3. You may want to disable email confirmations for development

### 5. Set Up Storage (Optional)

If you want to allow image uploads:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called "product-images"
3. Set the bucket to public or configure appropriate access policies

## Local Development

To run the database locally for development:

1. Install [Docker](https://www.docker.com/)
2. Install [Supabase CLI](https://supabase.com/docs/guides/cli)
3. Initialize Supabase locally:
   ```
   supabase init
   ```
4. Start the local Supabase instance:
   ```
   supabase start
   ```
5. This will output local URLs and keys - update your `.env` file with these values
6. Run the SQL scripts against your local instance using the Supabase CLI or the local dashboard

## Database Schema

The database includes the following main tables:

- `users` - Store managers and customers
- `products` - Liquor products with details
- `categories` - Product categories (Whiskey, Beer, etc.)
- `brands` - Product brands
- `inventory_transactions` - Track stock changes
- `orders` and `order_items` - Customer orders
- `cart_items` - Shopping cart
- `cocktail_recipes` - Recipes that use products

See the schema.sql file for complete details on all tables and relationships.

## API Functions

The `src/lib/db.ts` file contains helper functions for interacting with the database, including:

- Product listing and filtering
- Inventory management
- Authentication
- Shopping cart operations

Use these functions in your components rather than writing raw Supabase queries.

## Admin Access

For admin/manager access, use these credentials:

- Email: admin@liquorstore.com or manager@liquorstore.com
- Password: admin123
