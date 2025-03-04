-- Seed data for the liquor store database

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-generate-v4";

-- Insert admin user
INSERT INTO users (email, password, first_name, last_name, role)
VALUES 
('admin@liquorstore.com', '$2a$10$rM7gOyOGgC9ky7UT2jxVAOtw9R.4BgJHIlAP1Z8Z3YV3jVMSDlPiK', 'Admin', 'User', 'admin'), -- password: admin123
('manager@liquorstore.com', '$2a$10$rM7gOyOGgC9ky7UT2jxVAOtw9R.4BgJHIlAP1Z8Z3YV3jVMSDlPiK', 'Store', 'Manager', 'manager'); -- password: admin123

-- Insert categories
INSERT INTO categories (name, description, image_url)
VALUES
('Whiskey', 'Fine whiskeys from around the world including bourbon, scotch, and rye', 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'),
('Beer', 'Craft beers, IPAs, stouts, and lagers from local and international breweries', 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'),
('Wine', 'Red, white, and sparkling wines from top vineyards worldwide', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'),
('Vodka', 'Premium vodkas made from various ingredients and distillation methods', 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'),
('Gin', 'Traditional and contemporary gins with unique botanical profiles', 'https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'),
('Rum', 'Dark, spiced, and white rums from the Caribbean and beyond', 'https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'),
('Tequila', 'Premium tequilas including blanco, reposado, and añejo varieties', 'https://images.unsplash.com/photo-1656149481839-8f5cc4895b3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80');

-- Insert brands
INSERT INTO brands (name, description, country_of_origin, logo_url)
VALUES
('Highland Reserve', 'Premium Scottish whiskey distillery with centuries of tradition', 'Scotland', 'https://api.dicebear.com/7.x/initials/svg?seed=HR'),
('Hoppy Brews', 'Craft brewery specializing in innovative IPAs and seasonal beers', 'United States', 'https://api.dicebear.com/7.x/initials/svg?seed=HB'),
('Vineyard Estates', 'Family-owned winery producing award-winning wines', 'France', 'https://api.dicebear.com/7.x/initials/svg?seed=VE'),
('Crystal Clear', 'Luxury vodka brand known for its smooth finish and purity', 'Russia', 'https://api.dicebear.com/7.x/initials/svg?seed=CC'),
('Botanical Spirits', 'Artisanal gin distillery using hand-selected botanicals', 'United Kingdom', 'https://api.dicebear.com/7.x/initials/svg?seed=BS'),
('Bubbly Elegance', 'Prestigious champagne house with a heritage of excellence', 'France', 'https://api.dicebear.com/7.x/initials/svg?seed=BE'),
('Caribbean Gold', 'Authentic rum producer with traditional distilling methods', 'Jamaica', 'https://api.dicebear.com/7.x/initials/svg?seed=CG'),
('Agave Azul', 'Family-owned tequila distillery using traditional methods', 'Mexico', 'https://api.dicebear.com/7.x/initials/svg?seed=AA');

-- Get UUIDs for categories and brands
DO $$
DECLARE
    whiskey_id UUID;
    beer_id UUID;
    wine_id UUID;
    vodka_id UUID;
    gin_id UUID;
    rum_id UUID;
    tequila_id UUID;
    
    highland_id UUID;
    hoppy_id UUID;
    vineyard_id UUID;
    crystal_id UUID;
    botanical_id UUID;
    bubbly_id UUID;
    caribbean_id UUID;
    agave_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO whiskey_id FROM categories WHERE name = 'Whiskey';
    SELECT id INTO beer_id FROM categories WHERE name = 'Beer';
    SELECT id INTO wine_id FROM categories WHERE name = 'Wine';
    SELECT id INTO vodka_id FROM categories WHERE name = 'Vodka';
    SELECT id INTO gin_id FROM categories WHERE name = 'Gin';
    SELECT id INTO rum_id FROM categories WHERE name = 'Rum';
    SELECT id INTO tequila_id FROM categories WHERE name = 'Tequila';
    
    -- Get brand IDs
    SELECT id INTO highland_id FROM brands WHERE name = 'Highland Reserve';
    SELECT id INTO hoppy_id FROM brands WHERE name = 'Hoppy Brews';
    SELECT id INTO vineyard_id FROM brands WHERE name = 'Vineyard Estates';
    SELECT id INTO crystal_id FROM brands WHERE name = 'Crystal Clear';
    SELECT id INTO botanical_id FROM brands WHERE name = 'Botanical Spirits';
    SELECT id INTO bubbly_id FROM brands WHERE name = 'Bubbly Elegance';
    SELECT id INTO caribbean_id FROM brands WHERE name = 'Caribbean Gold';
    SELECT id INTO agave_id FROM brands WHERE name = 'Agave Azul';
    
    -- Insert products
    INSERT INTO products (name, description, price, alcohol_content, volume, stock, category_id, brand_id, image_url, is_featured)
    VALUES
    ('Premium Aged Whiskey', 'A premium aged whiskey with rich notes of oak, vanilla, and caramel. This exceptional spirit has been aged for 12 years in charred oak barrels.', 59.99, 40, '750ml', 24, whiskey_id, highland_id, 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', TRUE),
    
    ('Craft IPA Beer', 'A hoppy IPA with citrus notes and a refreshing finish. Brewed with a blend of premium hops for a complex flavor profile.', 12.99, 6.5, '355ml', 48, beer_id, hoppy_id, 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', TRUE),
    
    ('Cabernet Sauvignon', 'A full-bodied red wine with notes of blackberry and cedar. Aged in French oak barrels for 18 months.', 24.99, 13.5, '750ml', 36, wine_id, vineyard_id, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', TRUE),
    
    ('Premium Vodka', 'A smooth, triple-distilled vodka with a clean finish. Made from the finest grains and filtered through charcoal for exceptional purity.', 32.99, 40, '750ml', 18, vodka_id, crystal_id, 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', FALSE),
    
    ('London Dry Gin', 'A classic London dry gin with botanical notes and juniper. Crafted using traditional methods with a blend of 10 botanicals.', 29.99, 47, '750ml', 12, gin_id, botanical_id, 'https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', FALSE),
    
    ('Champagne Brut', 'A crisp, elegant champagne with fine bubbles and citrus notes. Perfect for celebrations and special occasions.', 49.99, 12, '750ml', 8, wine_id, bubbly_id, 'https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', TRUE),
    
    ('Dark Rum', 'A rich, aged rum with notes of caramel, vanilla, and tropical fruits. Aged for 7 years in oak barrels.', 27.99, 40, '750ml', 15, rum_id, caribbean_id, 'https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', FALSE),
    
    ('Reposado Tequila', 'A smooth, golden tequila aged in oak barrels for 6 months. Features notes of agave, oak, and subtle spices.', 38.99, 40, '750ml', 10, tequila_id, agave_id, 'https://images.unsplash.com/photo-1656149481839-8f5cc4895b3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', FALSE),
    
    ('Single Malt Scotch', 'An exceptional single malt scotch with complex flavors of honey, heather, and peat. Aged for 18 years.', 89.99, 43, '750ml', 6, whiskey_id, highland_id, 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', FALSE),
    
    ('Chardonnay', 'A buttery, oak-aged chardonnay with notes of vanilla, apple, and tropical fruits. Pairs well with seafood and poultry.', 19.99, 13, '750ml', 24, wine_id, vineyard_id, 'https://images.unsplash.com/photo-1598306442928-4d90f32c6866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', FALSE);

    -- Insert cocktail recipes
    INSERT INTO cocktail_recipes (name, description, instructions, image_url, difficulty, prep_time)
    VALUES
    ('Old Fashioned', 'A classic whiskey cocktail that has stood the test of time', 'Muddle sugar cube with bitters in a rocks glass. Add whiskey and ice, stir well. Garnish with orange peel.', 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', 'easy', 5),
    
    ('Whiskey Sour', 'A perfectly balanced cocktail with sweet, sour, and whiskey notes', 'Shake all ingredients with ice. Strain into a rocks glass over fresh ice. Garnish with a lemon twist.', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', 'medium', 8),
    
    ('Manhattan', 'A sophisticated cocktail with whiskey, vermouth, and bitters', 'Stir all ingredients with ice. Strain into a chilled cocktail glass. Garnish with a maraschino cherry.', 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', 'medium', 7),
    
    ('Gin and Tonic', 'A refreshing, classic highball cocktail', 'Fill a highball glass with ice. Pour gin over ice and top with tonic water. Garnish with lime wedge.', 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', 'easy', 3),
    
    ('Mojito', 'A refreshing rum cocktail with mint and lime', 'Muddle mint leaves with sugar and lime juice. Add rum and ice, top with soda water. Garnish with mint sprig.', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80', 'medium', 10);

END $$;

-- Add recipe ingredients (using subqueries to get IDs)
DO $$
DECLARE
    old_fashioned_id UUID;
    whiskey_sour_id UUID;
    manhattan_id UUID;
    gin_tonic_id UUID;
    mojito_id UUID;
    
    whiskey_id UUID;
    gin_id UUID;
    rum_id UUID;
BEGIN
    -- Get recipe IDs
    SELECT id INTO old_fashioned_id FROM cocktail_recipes WHERE name = 'Old Fashioned';
    SELECT id INTO whiskey_sour_id FROM cocktail_recipes WHERE name = 'Whiskey Sour';
    SELECT id INTO manhattan_id FROM cocktail_recipes WHERE name = 'Manhattan';
    SELECT id INTO gin_tonic_id FROM cocktail_recipes WHERE name = 'Gin and Tonic';
    SELECT id INTO mojito_id FROM cocktail_recipes WHERE name = 'Mojito';
    
    -- Get product IDs
    SELECT id INTO whiskey_id FROM products WHERE name = 'Premium Aged Whiskey';
    SELECT id INTO gin_id FROM products WHERE name = 'London Dry Gin';
    SELECT id INTO rum_id FROM products WHERE name = 'Dark Rum';
    
    -- Insert recipe ingredients
    INSERT INTO recipe_ingredients (recipe_id, product_id, name, quantity, display_order)
    VALUES
    -- Old Fashioned
    (old_fashioned_id, whiskey_id, 'Whiskey', '2 oz', 1),
    (old_fashioned_id, NULL, 'Sugar Cube', '1', 2),
    (old_fashioned_id, NULL, 'Angostura Bitters', '2-3 dashes', 3),
    (old_fashioned_id, NULL, 'Orange Peel', '1', 4),
    
    -- Whiskey Sour
    (whiskey_sour_id, whiskey_id, 'Whiskey', '2 oz', 1),
    (whiskey_sour_id, NULL, 'Fresh Lemon Juice', '3/4 oz', 2),
    (whiskey_sour_id, NULL, 'Simple Syrup', '1/2 oz', 3),
    (whiskey_sour_id, NULL, 'Egg White', '1 (optional)', 4),
    (whiskey_sour_id, NULL, 'Lemon Twist', '1', 5),
    
    -- Manhattan
    (manhattan_id, whiskey_id, 'Whiskey', '2 oz', 1),
    (manhattan_id, NULL, 'Sweet Vermouth', '1 oz', 2),
    (manhattan_id, NULL, 'Angostura Bitters', '2 dashes', 3),
    (manhattan_id, NULL, 'Maraschino Cherry', '1', 4),
    
    -- Gin and Tonic
    (gin_tonic_id, gin_id, 'Gin', '2 oz', 1),
    (gin_tonic_id, NULL, 'Tonic Water', '4 oz', 2),
    (gin_tonic_id, NULL, 'Lime Wedge', '1', 3),
    
    -- Mojito
    (mojito_id, rum_id, 'Dark Rum', '2 oz', 1),
    (mojito_id, NULL, 'Fresh Mint Leaves', '8-10', 2),
    (mojito_id, NULL, 'Sugar', '2 tsp', 3),
    (mojito_id, NULL, 'Lime Juice', '1 oz', 4),
    (mojito_id, NULL, 'Soda Water', '2 oz', 5),
    (mojito_id, NULL, 'Mint Sprig', '1', 6);

END $$;
